
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
import { LogIn, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (typeof window !== 'undefined') {
      const storedUsers = JSON.parse(sessionStorage.getItem('users') || '{}');
      if (storedUsers[values.email] && storedUsers[values.email].password === values.password) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify({ email: values.email, name: storedUsers[values.email].name }));
        router.push('/');
      } else {
        toast({
            variant: 'destructive',
            title: t('login_invalid_credentials_title'),
            description: t('login_invalid_credentials_description'),
        });
      }
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
            <LogIn className="h-6 w-6" />
            <span>{t('login_welcome_back')}</span>
          </CardTitle>
          <CardDescription>{t('login_enter_credentials')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <div className="flex items-center justify-between">
                        <FormLabel>{t('form_label_password')}</FormLabel>
                        <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                            {t('login_forgot_password')}
                        </Link>
                    </div>
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
                {t('login_button')}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            {t('login_no_account')}{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              {t('signup_button')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
