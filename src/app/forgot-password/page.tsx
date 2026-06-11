
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';

const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

const passwordSchema = z.object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onVerifyEmail = (values: z.infer<typeof emailSchema>) => {
    if (typeof window !== 'undefined') {
      const storedUsers = JSON.parse(sessionStorage.getItem('users') || '{}');
      if (storedUsers[values.email]) {
        setUserEmail(values.email);
        setStep(2);
      } else {
        toast({
            variant: 'destructive',
            title: t('forgot_password_user_not_found_title'),
            description: t('forgot_password_user_not_found_description'),
        });
      }
    }
  };

  const onResetPassword = (values: z.infer<typeof passwordSchema>) => {
      if (typeof window !== 'undefined') {
        const storedUsers = JSON.parse(sessionStorage.getItem('users') || '{}');
        storedUsers[userEmail].password = values.password;
        sessionStorage.setItem('users', JSON.stringify(storedUsers));
        toast({
            title: t('forgot_password_success_title'),
            description: t('forgot_password_success_description'),
        });
        router.push('/login');
      }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="absolute top-4 left-4">
            <Link href="/" className="flex items-center gap-2 text-primary">
                <Logo className="h-8 w-8" />
                <span className="font-bold text-xl font-headline">Rain2ground</span>
            </Link>
        </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <KeyRound className="h-6 w-6" />
            <span>{t('forgot_password_title')}</span>
          </CardTitle>
          <CardDescription>
            {step === 1 ? t('forgot_password_step1_description') : t('forgot_password_step2_description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onVerifyEmail)} className="space-y-6">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4" />{t('form_label_email')}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t('form_placeholder_email')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                  {t('forgot_password_verify_button')}
                </Button>
              </form>
            </Form>
          )}

          {step === 2 && (
             <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onResetPassword)} className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Lock className="h-4 w-4" />{t('forgot_password_new_password_label')}</FormLabel>
                      <div className="relative">
                        <FormControl>
                            <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                        </FormControl>
                         <Button 
                          type="button"
                          variant="ghost" 
                          size="icon" 
                          className="absolute inset-y-0 right-0 h-full px-3"
                          onClick={() => setShowPassword(prev => !prev)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Lock className="h-4 w-4" />{t('forgot_password_confirm_password_label')}</FormLabel>
                       <div className="relative">
                          <FormControl>
                            <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                          </FormControl>
                           <Button 
                              type="button"
                              variant="ghost" 
                              size="icon" 
                              className="absolute inset-y-0 right-0 h-full px-3"
                              onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                       </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                  {t('forgot_password_reset_button')}
                </Button>
              </form>
            </Form>
          )}

           <div className="mt-6 text-center text-sm">
            <Link href="/login" className="font-medium text-primary hover:underline">
              {t('forgot_password_back_to_login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
