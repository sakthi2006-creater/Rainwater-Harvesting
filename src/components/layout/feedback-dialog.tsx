
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/language-context';
import { useToast } from '@/hooks/use-toast';

const feedbackSchema = z.object({
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FeedbackDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FeedbackDialog({ open, onOpenChange }: FeedbackDialogProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { subject: '', message: '' },
  });

  const onSubmit = (values: z.infer<typeof feedbackSchema>) => {
    setIsSubmitting(true);
    // Simulate API call and save to sessionStorage
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const feedbackSubmissions = JSON.parse(sessionStorage.getItem('feedbackSubmissions') || '[]');
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        feedbackSubmissions.unshift({ 
            ...values, 
            date: new Date().toISOString(),
            user: currentUser.email || 'Anonymous'
        });
        sessionStorage.setItem('feedbackSubmissions', JSON.stringify(feedbackSubmissions));
      }

      toast({
        title: t('feedback_success_title'),
        description: t('feedback_success_description'),
      });
      setIsSubmitting(false);
      onOpenChange(false);
      form.reset();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('feedback_dialog_title')}</DialogTitle>
          <DialogDescription>{t('feedback_dialog_description')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('feedback_subject_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('feedback_subject_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('feedback_message_label')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('feedback_message_placeholder')} className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('feedback_submitting_button') : t('feedback_submit_button')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
