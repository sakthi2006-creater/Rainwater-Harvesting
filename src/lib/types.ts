
export type DistrictData = {
  name: string;
  lat: number;
  lng: number;
  monthlyRainfallMm: number[]; // 12 months
}
export type StateData = {
  name: string;
  districts: DistrictData[];
};

export type CalculationInputs = {
  name: string;
  roofArea: number;
  location: string;
  district: string;
  population: number;
  openSpace: number;
};

export type MonthlyHarvest = {
  month: string;
  rainfall: number;
  harvested: number;
};

export type CostBenefitData = {
  year: number;
  cumulativeSavings: number;
};

export type WaterSavingsBreakdown = {
  name: string;
  value: number;
  fill: string;
}[];

export type CalculationResults = {
  inputs: CalculationInputs;
  annualHarvestPotential: number;
  monthlyHarvestData: MonthlyHarvest[];
  suggestedTankSize: number;
  initialCost: number;
  annualSavings: number;
  paybackPeriod: number;
  costBenefitChartData: CostBenefitData[];
  groundwaterRechargePotential: number; // in Liters
  waterSavedAnnually: number;
  annualWaterRequirement: number;
  waterSavingsBreakdown: WaterSavingsBreakdown;
  date?: string; // Optional date for history
};
