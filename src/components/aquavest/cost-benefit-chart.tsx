
'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { CostBenefitData } from '@/lib/types';
import { formatNumber } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';

const chartConfig = {
  cumulativeSavings: {
    label: 'Net Savings (INR)',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

type CostBenefitChartProps = {
  data: CostBenefitData[];
  initialCost: number;
};

export function CostBenefitChart({ data, initialCost }: CostBenefitChartProps) {
  const { t, language } = useLanguage();
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart
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
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${t('chart_year')} ${value}`}
        />
        <YAxis 
            tickFormatter={(value) => `INR ${formatNumber(Number(value), language)}`}
            domain={[-initialCost, 'dataMax']}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideIndicator labelFormatter={(label) => `${t('chart_after_year')} ${label}`} formatter={(value) => `INR ${formatNumber(Number(value), language)}`} />} />
        <Line
          dataKey="cumulativeSavings"
          type="monotone"
          stroke="var(--color-cumulativeSavings)"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  );
}
