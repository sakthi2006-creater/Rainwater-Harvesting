
'use client';

import { Logo } from '@/components/layout/logo';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn, LogOut, User as UserIcon, Settings, Home, HelpCircle, MessageSquare } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { FeedbackDialog } from './feedback-dialog';

type User = {
  name: string;
  email: string;
  avatar?: string;
}

const Header: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const updateUserState = () => {
    if (typeof window !== 'undefined') {
        const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
        if (loggedIn) {
            try {
              const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
              setUser(currentUser);
            } catch (e) {
              console.error('Failed to parse user data from sessionStorage', e);
              setUser(null);
            }
        } else {
            setUser(null);
        }
    }
  };

  useEffect(() => {
    updateUserState();

    const handleStorageChange = () => {
      updateUserState();
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    }
  }, []);


  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('currentUser');
    }
    setIsLoggedIn(false);
    setUser(null);
    router.push('/login');
  };
  
  const defaultAvatar = user ? `https://i.pravatar.cc/150?u=${user.email}` : '';

  return (
    <>
    <header className="bg-card/50 backdrop-blur-lg sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <Link href="/" className="flex gap-2 items-center">
          <Logo className="h-8 w-8" />
          <h1 className="text-2xl font-bold text-primary font-headline">Rain2ground</h1>
        </Link>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground hidden md:block">
            {t('header_subtitle')}
          </p>

          {pathname !== '/' && (
            <Button asChild variant="ghost" size="icon">
                <Link href="/">
                  <Home />
                  <span className="sr-only">Home</span>
                </Link>
            </Button>
          )}

          {isLoggedIn && user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || defaultAvatar} alt={t('header_user_avatar_alt')} />
                    <AvatarFallback>
                      <UserIcon/>
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t('header_settings')}</span>
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setIsFeedbackDialogOpen(true)}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>{t('header_help_feedback')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/feedback">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>{t('header_view_feedback')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('header_switch_account')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">
                <LogIn />
                <span>{t('login_button')}</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
    <FeedbackDialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen} />
    </>
  );
};

export default Header;
