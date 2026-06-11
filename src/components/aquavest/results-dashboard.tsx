
import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AnnualPotentialChart } from './annual-potential-chart';
import { CostBenefitChart } from './cost-benefit-chart';
import { IotSimulationCard } from './iot-simulation-card';
import { WaterSavingsPieChart } from './water-savings-pie-chart';
import type { CalculationResults } from '@/lib/types';
import { formatNumber } from '@/lib/utils';
import { Droplets, Container, TrendingUp, CircleDollarSign, BarChart, Percent, FileDown, Sun, Waves, PieChart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';

type ResultsDashboardProps = {
  results: CalculationResults;
  showIotSimulation?: boolean;
};

export const ResultsDashboard: FC<ResultsDashboardProps> = ({ results, showIotSimulation }) => {
  const reportUrl = `/report?data=${encodeURIComponent(JSON.stringify(results))}`;
  const { t, language } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-3xl font-bold font-headline text-primary">{t('results_title', { name: results.inputs.name })}</h2>
        <Button asChild>
            <Link href={reportUrl} target="_blank">
                <FileDown className="mr-2 h-4 w-4" />
                {t('results_download_report')}
            </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('results_annual_harvest_potential')}</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(results.annualHarvestPotential, language)} L</div>
            <p className="text-xs text-muted-foreground">{t('results_from_your_roof')}</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('results_groundwater_recharge')}</CardTitle>
            <Waves className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(results.groundwaterRechargePotential, language)} L</div>
            <p className="text-xs text-muted-foreground">{t('results_from_open_space')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('results_suggested_tank_size')}</CardTitle>
            <Container className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(results.suggestedTankSize, language)} L</div>
            <p className="text-xs text-muted-foreground">{t('results_tank_size_description')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('results_payback_period')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isFinite(results.paybackPeriod) ? `${results.paybackPeriod.toFixed(1)} ${t('results_years')}` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">{t('results_annual_savings_description', { savings: formatNumber(results.annualSavings, language) })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('results_initial_cost')}</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">INR {formatNumber(results.initialCost, language)}</div>
            <p className="text-xs text-muted-foreground">{t('results_initial_cost_description')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
         <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart className="h-6 w-6"/>{t('results_monthly_harvest_title')}</CardTitle>
            <CardDescription>{t('results_monthly_harvest_description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <AnnualPotentialChart data={results.monthlyHarvestData} />
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><PieChart className="h-6 w-6"/>{t('results_savings_breakdown_title')}</CardTitle>
                <CardDescription>{t('results_savings_breakdown_description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <WaterSavingsPieChart data={results.waterSavingsBreakdown} annualWaterRequirement={results.annualWaterRequirement} />
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-6 w-6"/>{t('results_cost_benefit_title')}</CardTitle>
            <CardDescription>{t('results_cost_benefit_description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <CostBenefitChart data={results.costBenefitChartData} initialCost={results.initialCost}/>
          </CardContent>
        </Card>
        {showIotSimulation && <IotSimulationCard roofArea={results.inputs.roofArea} />}
      </div>
    </div>
  );
};
