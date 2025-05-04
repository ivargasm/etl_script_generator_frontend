import { useState } from 'react';
import KpiCard from '../components/KpiCard';
import React from 'react';

const KPI_LIST = ['sellout', 'stock_oh', 'stock_tuberia', 'fillrate', 'forecast', 'sellin'];

export default function KpiSelection({ onNext }: { onNext: (selected: string[]) => void }) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleKpi = (kpi: string) => {
        setSelected(prev =>
            prev.includes(kpi) ? prev.filter(k => k !== kpi) : [...prev, kpi]
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-text dark:text-text-dark">Selecciona los KPIs:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {KPI_LIST.map(kpi => (
                    <KpiCard
                        key={kpi}
                        label={kpi}
                        selected={selected.includes(kpi)}
                        onClick={() => toggleKpi(kpi)}
                    />
                ))}
            </div>
            <div className="flex justify-end">
                <button
                    disabled={selected.length === 0}
                    onClick={() => onNext(selected)}
                    className="bg-primary dark:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary disabled:opacity-50 cursor-pointer"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
