
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CloudRain } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { RUNOFF_COEFFICIENT } from '@/lib/data';
import { useLanguage } from '@/contexts/language-context';

type IotSimulationCardProps = {
  roofArea: number;
};

export function IotSimulationCard({ roofArea }: IotSimulationCardProps) {
  const [rainfall, setRainfall] = useState(0);
  const { t, language } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate a rainfall event
      const isRaining = Math.random() > 0.8;
      if (isRaining) {
        setRainfall(prev => prev + Math.random() * 5); // Add 0-5mm of rain
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const harvestedWater = rainfall * roofArea * RUNOFF_COEFFICIENT;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <CloudRain className="h-6 w-6" />
                    {t('iot_title')}
                </CardTitle>
                <CardDescription>{t('iot_description')}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                {t('iot_live_badge')}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
          <p className="text-lg font-medium">{t('iot_rainfall_today')}</p>
          <p className="text-2xl font-bold text-primary font-headline">
            {rainfall.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">mm</span>
          </p>
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
          <p className="text-lg font-medium">{t('iot_harvested_today')}</p>
          <p className="text-2xl font-bold text-accent font-headline">
            {formatNumber(harvestedWater, language)} <span className="text-sm font-normal text-muted-foreground">{t('iot_liters')}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
