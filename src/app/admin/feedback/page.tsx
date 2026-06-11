
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/language-context';
import { LoadingAnimation } from '@/components/layout/loading-animation';
import { MessageSquare, Calendar, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type FeedbackSubmission = {
  subject: string;
  message: string;
  date: string;
  user: string;
};

export default function FeedbackPage() {
  const { t, language } = useLanguage();
  const [feedback, setFeedback] = useState<FeedbackSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFeedback = JSON.parse(sessionStorage.getItem('feedbackSubmissions') || '[]');
      setFeedback(storedFeedback);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <MessageSquare className="h-8 w-8" />
              <span>{t('feedback_page_title')}</span>
            </CardTitle>
            <CardDescription>{t('feedback_page_description')}</CardDescription>
          </CardHeader>
          <CardContent>
            {feedback.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {feedback.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className="flex flex-col text-left">
                        <span className="font-semibold">{item.subject}</span>
                         <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center gap-1.5">
                                <User className="h-3 w-3" />
                                <span>{item.user}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</span>
                            </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base whitespace-pre-wrap p-4 bg-secondary/30 rounded-md">
                      {item.message}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-center text-muted-foreground italic py-8">
                {t('feedback_page_no_feedback')}
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
