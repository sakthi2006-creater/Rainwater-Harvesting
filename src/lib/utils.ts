
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { STATES, MONTH_NAMES, RUNOFF_COEFFICIENT, TANK_COST_PER_LITER, WATER_COST_PER_LITER, DAILY_WATER_PER_PERSON_LITERS, COST_BENEFIT_YEARS } from './data';
import type { CalculationInputs, CalculationResults, MonthlyHarvest, CostBenefitData } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAquavestResults(inputs: CalculationInputs): CalculationResults {
  const stateData = STATES.find(loc => loc.name === inputs.location);
  if (!stateData) {
    throw new Error('State data not found');
  }

  const districtData = stateData.districts.find(d => d.name === inputs.district);
  if (!districtData) {
    throw new Error('District data not found');
  }

  const monthlyHarvestData: MonthlyHarvest[] = districtData.monthlyRainfallMm.map((rainfall, index) => {
    const harvested = rainfall * inputs.roofArea * RUNOFF_COEFFICIENT;
    return {
      month: MONTH_NAMES[index],
      rainfall,
      harvested: Math.round(harvested),
    };
  });

  const annualHarvestPotential = monthlyHarvestData.reduce((sum, item) => sum + item.harvested, 0);

  // Suggest tank size based on average of 3 rainiest months
  const sortedRainfall = [...districtData.monthlyRainfallMm].sort((a, b) => b - a);
  const avgRainiestMonths = (sortedRainfall[0] + sortedRainfall[1] + sortedRainfall[2]) / 3;
  const suggestedTankSizeUnrounded = avgRainiestMonths * inputs.roofArea * RUNOFF_COEFFICIENT;
  const suggestedTankSize = Math.ceil(suggestedTankSizeUnrounded / 1000) * 1000; // Round up to nearest 1000L

  const initialCost = suggestedTankSize * TANK_COST_PER_LITER;

  const annualWaterRequirement = inputs.population * DAILY_WATER_PER_PERSON_LITERS * 365;
  const waterSavedAnnually = Math.min(annualHarvestPotential, annualWaterRequirement);
  const annualSavings = waterSavedAnnually * WATER_COST_PER_LITER;

  const paybackPeriod = annualSavings > 0 ? initialCost / annualSavings : Infinity;

  const costBenefitChartData: CostBenefitData[] = Array.from({ length: COST_BENEFIT_YEARS + 1 }, (_, year) => ({
    year,
    cumulativeSavings: Math.round(year * annualSavings - initialCost),
  }));

  // Simple groundwater recharge calculation: 30% of total rainfall on open space is recharged
  const totalAnnualRainfallMm = districtData.monthlyRainfallMm.reduce((sum, r) => sum + r, 0);
  const groundwaterRechargePotential = (totalAnnualRainfallMm / 1000) * inputs.openSpace * 0.3 * 1000; // in Liters
  
  const waterSavingsBreakdown = [
    { name: 'water_met_by_rainwater', value: waterSavedAnnually, fill: 'hsl(var(--primary))' },
    { name: 'remaining_water_demand', value: Math.max(0, annualWaterRequirement - waterSavedAnnually), fill: 'hsl(var(--secondary))' },
  ];


  return {
    inputs,
    annualHarvestPotential,
    monthlyHarvestData,
    suggestedTankSize,
    initialCost,
    annualSavings,
    paybackPeriod,
    costBenefitChartData,
    groundwaterRechargePotential: Math.round(groundwaterRechargePotential),
    waterSavedAnnually,
    annualWaterRequirement,
    waterSavingsBreakdown,
  };
}

export function formatNumber(num: number, locale: string = 'en-IN'): string {
  return new Intl.NumberFormat(locale).format(Math.round(num));
}
