
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
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (typeof window !== 'undefined') {
        const users = JSON.parse(sessionStorage.getItem('users') || '{}');
        if (users[values.email]) {
            toast({
                variant: 'destructive',
                title: t('signup_user_exists_title'),
                description: t('signup_user_exists_description'),
            });
            return;
        }
        
        users[values.email] = { name: values.name, password: values.password };
        sessionStorage.setItem('users', JSON.stringify(users));
        
        toast({
            title: t('signup_success_title'),
            description: t('signup_success_description'),
        });
        router.push('/login');
    }
  };

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
            <UserPlus className="h-6 w-6" />
            <span>{t('signup_create_account')}</span>
          </CardTitle>
          <CardDescription>{t('signup_enter_details')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form_label_name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('form_placeholder_name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form_label_email')}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t('form_placeholder_email')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form_label_password')}</FormLabel>
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
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                {t('signup_button')}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            {t('signup_already_account')}{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              {t('login_button')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
