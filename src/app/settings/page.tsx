
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, Mail, Info, Palette, Languages, Users as UsersIcon, Edit2, History, FileDown, Home, Trash2, Wifi } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from "next-themes";
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { CalculationResults } from '@/lib/types';
import { useThemeBuilder } from '@/contexts/theme-builder-context';
import { generateThemeFromImage } from '@/lib/image-theme';
import { useToast } from '@/hooks/use-toast';
import { LoadingAnimation } from '@/components/layout/loading-animation';

type User = {
  name: string;
  email: string;
  avatar?: string;
}

type CalculationHistoryItem = CalculationResults & {
    date: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const themeFileInputRef = useRef<HTMLInputElement>(null);
  const { setCustomThemeCss } = useThemeBuilder();
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      if (!loggedIn) {
        router.push('/login');
      } else {
        setIsLoggedIn(true);
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        setUser(currentUser);
        const storedHistory = JSON.parse(sessionStorage.getItem('calculationHistory') || '[]');
        setHistory(storedHistory);
      }
    }
  }, [router]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && user) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result as string;
        const updatedUser = { ...user, avatar: newAvatar };
        setUser(updatedUser);
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('storage'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThemeImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const css = await generateThemeFromImage(file);
      setCustomThemeCss(css);
      setTheme('custom-image');
    } catch (error) {
      console.error("Failed to generate theme from image:", error);
      toast({
        variant: 'destructive',
        title: 'Theme Generation Failed',
        description: 'Could not generate a theme from the selected image. Please try another one.',
      });
    }
  };

  const handleThemeChange = (value: string) => {
    if (value === 'custom-image') {
      themeFileInputRef.current?.click();
    } else {
      setTheme(value);
    }
  };

  const handleDeleteHistoryItem = (indexToDelete: number) => {
    const updatedHistory = history.filter((_, index) => index !== indexToDelete);
    setHistory(updatedHistory);
    sessionStorage.setItem('calculationHistory', JSON.stringify(updatedHistory));
    toast({
        title: t('toast_history_deleted_title'),
        description: t('toast_history_deleted_description'),
    });
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <LoadingAnimation />
      </div>
    );
  }
  
  const defaultAvatar = `https://i.pravatar.cc/150?u=${user.email}`;

  return (
    <>
      <Header />
      <main className="container py-8 space-y-8">
        <div className="grid gap-8 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <UserIcon className="h-8 w-8" />
                  <span>{t('settings_my_profile')}</span>
                </CardTitle>
                <CardDescription>
                  {t('settings_profile_description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="relative group">
                    <Avatar className="h-24 w-24 border-4 border-primary/20">
                      <AvatarImage src={user.avatar || defaultAvatar} alt="User Avatar" />
                      <AvatarFallback>
                        <UserIcon className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                     <Button 
                        variant="outline"
                        size="icon"
                        className="absolute inset-0 m-auto h-10 w-10 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => fileInputRef.current?.click()}
                      >
                       <Edit2 className="h-5 w-5"/>
                     </Button>
                     <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                     />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{user.name}</p>
                    <div className="flex items-center gap-2 text-muted-foreground justify-center">
                        <Mail className="h-4 w-4"/>
                        <p className="text-sm">{user.email}</p>
                    </div>
                  </div>
                </div>
                 <Button className="w-full" asChild>
                    <Link href="/iot-connect">
                        <Wifi className="mr-2 h-4 w-4"/>
                        {t('iot_connect_link')}
                    </Link>
                 </Button>
              </CardContent>
            </Card>

             <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <History className="h-8 w-8" />
                        <span>{t('settings_history_title')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('settings_history_description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {history.length > 0 ? (
                         <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                            {history.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                                    <div>
                                        <p className="font-semibold">{item.inputs.location}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(item.date).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/report?data=${encodeURIComponent(JSON.stringify(item))}`} target="_blank">
                                                <FileDown className="mr-2 h-4 w-4" />
                                                {t('settings_view_report')}
                                            </Link>
                                        </Button>
                                         <Button variant="destructive" size="icon" onClick={() => handleDeleteHistoryItem(index)}>
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">{t('settings_delete_history')}</span>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground italic">{t('settings_history_none')}</p>
                    )}
                </CardContent>
            </Card>

            <Card className="md:col-span-3">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Info className="h-8 w-8" />
                        <span>{t('settings_app_info')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('settings_app_info_description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 font-semibold"><Palette className="h-5 w-5"/> {t('settings_theme')}</h3>
                        <RadioGroup value={theme} onValueChange={handleThemeChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="light" id="theme-light" />
                            <Label htmlFor="theme-light">{t('theme_light')}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dark" id="theme-dark" />
                            <Label htmlFor="theme-dark">{t('theme_dark')}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dandmaly" id="theme-dandmaly" />
                            <Label htmlFor="theme-dandmaly">{t('theme_dandmaly')}</Label>
                          </div>
                           <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="theme-custom" />
                            <Label htmlFor="theme-custom">{t('theme_custom')}</Label>
                          </div>
                           <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom-image" id="theme-custom-image" />
                            <Label htmlFor="theme-custom-image">From Image</Label>
                          </div>
                        </RadioGroup>
                        <input
                          type="file"
                          ref={themeFileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleThemeImageChange}
                        />
                    </div>
                     <div className="space-y-4">
                        <h3 className="flex items-center gap-2 font-semibold"><Languages className="h-5 w-5"/> {t('settings_language')}</h3>
                        <RadioGroup value={language} onValueChange={(value) => setLanguage(value as 'en' | 'hi' | 'ta')}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="en" id="lang-en" />
                            <Label htmlFor="lang-en">{t('lang_en')}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="hi" id="lang-hi" />
                            <Label htmlFor="lang-hi">{t('lang_hi')}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ta" id="lang-ta" />
                            <Label htmlFor="lang-ta">{t('lang_ta')}</Label>
                          </div>
                        </RadioGroup>
                    </div>
                     <div className="space-y-4 col-span-full md:col-span-1">
                        <h3 className="flex items-center gap-2 font-semibold"><Info className="h-5 w-5"/> {t('settings_about_app_title')}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t('settings_about_app_description')}
                        </p>
                    </div>
                    <div className="space-y-4 col-span-full md:col-span-3">
                        <h3 className="flex items-center gap-2 font-semibold"><UsersIcon className="h-5 w-5"/> {t('settings_our_team')}</h3>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/firebase-studio-bots.appspot.com/o/imagereader%2FGiA1sHhC27A1tY0n5wWv%2Fuser_1_ghibli_boy.png?alt=media&token=e937d2f9-715b-4355-8356-91e8460d62c9" alt="Sakthivel" />
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{t('team_member1_name')}</p>
                                    <p className="text-xs text-muted-foreground">{t('team_member1_role')}</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/firebase-studio-bots.appspot.com/o/imagereader%2FGiA1sHhC27A1tY0n5wWv%2Fuser_2_ghibli_boy.png?alt=media&token=c19ac73d-9d47-4d1a-8cde-8386a6d655f4" alt="Mohanraj" />
                                    <AvatarFallback>M</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{t('team_member2_name')}</p>
                                    <p className="text-xs text-muted-foreground">{t('team_member2_role')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/firebase-studio-bots.appspot.com/o/imagereader%2FGiA1sHhC27A1tY0n5wWv%2Fuser_3_ghibli_boy.png?alt=media&token=5b29f03a-3c7d-474c-a111-ff729f276228" alt="Sanjay" />
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{t('team_member3_name')}</p>
                                    <p className="text-xs text-muted-foreground">{t('team_member3_role')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/firebase-studio-bots.appspot.com/o/imagereader%2FGiA1sHhC27A1tY0n5wWv%2Fuser_4_ghibli_boy.png?alt=media&token=3b3c58d2-4e6f-45e3-979a-14300486c738" alt="Nishal Ahamed" />
                                    <AvatarFallback>NA</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{t('team_member4_name')}</p>
                                    <p className="text-xs text-muted-foreground">{t('team_member4_role')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/firebase-studio-bots.appspot.com/o/imagereader%2FGiA1sHhC27A1tY0n5wWv%2Fuser_5_ghibli_boy.png?alt=media&token=6a12c8b8-27e6-4235-857c-174823485d43" alt="Santhakumar" />
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{t('team_member5_name')}</p>
                                    <p className="text-xs text-muted-foreground">{t('team_member5_role')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/firebase-studio-bots.appspot.com/o/imagereader%2FGiA1sHhC27A1tY0n5wWv%2Fuser_6_ghibli_boy.png?alt=media&token=a8e0f6e4-4d1a-47d3-82a8-8e6f1f1d7d0a" alt="Monisha" />
                                    <AvatarFallback>M</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{t('team_member6_name')}</p>
                                    <p className="text-xs text-muted-foreground">{t('team_member6_role')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </>
  );
}
