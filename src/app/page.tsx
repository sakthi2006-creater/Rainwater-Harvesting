
'use client';

import { useState, useEffect } from 'react';
import type { z } from 'zod';
import Header from '@/components/layout/header';
import { InputForm } from '@/components/aquavest/input-form';
import { ResultsDashboard } from '@/components/aquavest/results-dashboard';
import { calculateAquavestResults, formatNumber } from '@/lib/utils';
import type { CalculationInputs, CalculationResults } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { LoadingAnimation } from '@/components/layout/loading-animation';


export default function Home() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      if (!loggedIn) {
        router.push('/login');
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [router]);

  const handleCalculate = (values: CalculationInputs) => {
    setIsCalculating(true);
    // Simulate API call
    setTimeout(() => {
      try {
        const calculationResults = calculateAquavestResults(values);
        setResults(calculationResults);
        
        // Save results to history
        if (typeof window !== 'undefined') {
          const history = JSON.parse(sessionStorage.getItem('calculationHistory') || '[]');
          history.unshift({ ...calculationResults, date: new Date().toISOString() });
          // Keep history to a reasonable size, e.g., 10
          if (history.length > 10) {
            history.pop();
          }
          sessionStorage.setItem('calculationHistory', JSON.stringify(history));
        }

      } catch (error) {
        toast({
          variant: 'destructive',
          title: t('error_toast_title'),
          description: t('error_calculation_failed'),
        });
      } finally {
        setIsCalculating(false);
      }
    }, 1000);
  };

  if (!isLoggedIn) {
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
        <InputForm onCalculate={handleCalculate} isCalculating={isCalculating} />

        {isCalculating && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-2 text-muted-foreground">
                <LoadingAnimation />
            </div>
          </div>
        )}

        {results && !isCalculating ? (
          <ResultsDashboard results={results} showIotSimulation={true} />
        ) : (
          !isCalculating && (
            <Card className="mt-8 bg-card/50">
              <CardHeader>
                <CardTitle>{t('home_welcome_title')}</CardTitle>
                <CardDescription>{t('home_welcome_description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[2/1] w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/firebase-studio-bots.appspot.com/o/imagereader%2FGiA1sHhC27A1tY0n5wWv%2Fghibli_boy_in_nature.png?alt=media&token=c19ac73d-9d47-4d1a-8cde-8386a6d655f4"
                        alt="A Ghibli-style illustration of a boy in a nature setting."
                        fill
                        className="object-cover"
                        data-ai-hint="illustration boy"
                        priority
                    />
                </div>
              </CardContent>
            </Card>
          )
        )}
      </main>
    </>
  );
}
