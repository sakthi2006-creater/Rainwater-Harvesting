
'use client';

import * as React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { WaterSavingsBreakdown } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';
import { formatNumber } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type WaterSavingsPieChartProps = {
  data: WaterSavingsBreakdown;
  annualWaterRequirement: number;
};

export function WaterSavingsPieChart({ data, annualWaterRequirement }: WaterSavingsPieChartProps) {
  const { t, language } = useLanguage();

  const totalSaved = data.find(d => d.name === 'water_met_by_rainwater')?.value || 0;
  const percentageSaved = annualWaterRequirement > 0 ? (totalSaved / annualWaterRequirement) * 100 : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const percentage = (value / annualWaterRequirement) * 100;
      return (
        <div className="p-2 text-sm bg-background border rounded-md shadow-lg">
          <p className="font-bold">{t(name)}</p>
          <p>{`${formatNumber(value, language)} L (${percentage.toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
        {payload.map((entry: any, index: number) => {
          const { dataKey } = entry.payload;
          return (
            <li key={`item-${index}`} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>{t(dataKey)}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  
    if (annualWaterRequirement === 0) {
        return <div className="text-center text-muted-foreground p-4">{t('pie_chart_no_data')}</div>
    }

  return (
    <div className="w-full h-[300px] relative">
       <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
                <p className="text-3xl font-bold text-primary">{percentageSaved.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">{t('pie_chart_demand_met')}</p>
            </div>
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            dataKey="value"
            nameKey="name"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={5}
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
