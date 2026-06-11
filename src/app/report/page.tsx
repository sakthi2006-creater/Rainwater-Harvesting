
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatNumber } from '@/lib/utils';
import type { CalculationResults } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Logo } from '@/components/layout/logo';
import { useLanguage } from '@/contexts/language-context';

function ReportContent() {
    const searchParams = useSearchParams();
    const dataString = searchParams.get('data');
    const [currentDate, setCurrentDate] = useState('');
    const { t, language } = useLanguage();

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString(language));
    }, [language]);

    if (!dataString) {
        return <div className="p-10 text-center text-red-600">{t('report_no_data')}</div>;
    }

    let results: CalculationResults;
    try {
        results = JSON.parse(dataString);
    } catch (e) {
        return <div className="p-10 text-center text-red-600">{t('report_parse_error')}</div>;
    }
    
    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            <style jsx global>{`
              @media print {
                body {
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
              }
            `}</style>
            <header className="flex justify-between items-center border-b pb-4">
                <div className="flex gap-2 items-center">
                    <Logo className="h-10 w-10" />
                    <h1 className="text-4xl font-bold text-blue-800">{t('report_title')}</h1>
                </div>
                <div className="text-right text-sm text-gray-600">
                    {currentDate && <p>{t('report_date')}: {currentDate}</p>}
                    <p>{t('form_label_location')}: {results.inputs.district}, {results.inputs.location}</p>
                </div>
            </header>

            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('report_summary')}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700">{t('results_annual_harvest_potential')}</h3>
                        <p className="text-3xl font-bold text-blue-700">{formatNumber(results.annualHarvestPotential, language)} L</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700">{t('results_suggested_tank_size')}</h3>
                        <p className="text-3xl font-bold text-green-700">{formatNumber(results.suggestedTankSize, language)} L</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700">{t('results_initial_cost')}</h3>
                        <p className="text-2xl font-bold">INR {formatNumber(results.initialCost, language)}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700">{t('results_payback_period')}</h3>
                        <p className="text-2xl font-bold">{isFinite(results.paybackPeriod) ? `${results.paybackPeriod.toFixed(1)} ${t('results_years')}` : 'N/A'}</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('report_monthly_breakdown')}</h2>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('report_month')}</TableHead>
                            <TableHead className="text-right">{t('report_rainfall_mm')}</TableHead>
                            <TableHead className="text-right">{t('report_harvested_l')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.monthlyHarvestData.map((row) => (
                            <TableRow key={row.month}>
                                <TableCell className="font-medium">{t(row.month.toLowerCase())}</TableCell>
                                <TableCell className="text-right">{formatNumber(row.rainfall, language)}</TableCell>
                                <TableCell className="text-right">{formatNumber(row.harvested, language)}</TableCell>
                            </TableRow>
                        ))}
                         <TableRow className="font-bold bg-gray-100">
                            <TableCell>{t('report_total')}</TableCell>
                            <TableCell className="text-right">{formatNumber(results.monthlyHarvestData.reduce((acc, r) => acc + r.rainfall, 0), language)}</TableCell>
                            <TableCell className="text-right">{formatNumber(results.annualHarvestPotential, language)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
            
            <footer className="text-center text-xs text-gray-500 pt-8 border-t">
                {t('footer_generated_by')}
            </footer>
        </div>
    );
}

export default function ReportPage() {
    const { t } = useLanguage();
    return (
        <Suspense fallback={<div className="p-10 text-center">{t('report_loading')}</div>}>
            <ReportContent />
        </Suspense>
    )
}
