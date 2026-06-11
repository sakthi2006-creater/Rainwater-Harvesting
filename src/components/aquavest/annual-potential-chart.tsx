
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { MonthlyHarvest } from '@/lib/types';
import { formatNumber } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';


const chartConfig = {
  harvested: {
    label: 'Harvested (L)',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

type AnnualPotentialChartProps = {
  data: MonthlyHarvest[];
};

export function AnnualPotentialChart({ data }: AnnualPotentialChartProps) {
  const { t, language } = useLanguage();
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => t(value.toLowerCase())}
        />
        <YAxis 
            tickFormatter={(value) => `${formatNumber(Number(value) / 1000, language)}k`}
        />
        <ChartTooltip
            cursor={false}
            content={
                <ChartTooltipContent
                    formatter={(value, name, item) => (
                        <>
                            <div className="flex flex-col space-y-1">
                                <span className='font-semibold'>{formatNumber(Number(value), language)} L {t('chart_harvested')}</span>
                                <span className="text-muted-foreground">{t('chart_from')} {item.payload.rainfall} mm {t('chart_rainfall')}</span>
                            </div>
                        </>
                    )}
                    labelFormatter={(label) => <div className="font-bold mb-2">{t(label.toLowerCase())}</div>}
                />
            }
        />
        <Bar dataKey="harvested" name="Harvested Water" fill="var(--color-harvested)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
