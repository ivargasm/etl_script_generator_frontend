// pages/configurador.tsx
import React from 'react'
import KpiFormCarousel from '../components/forms/KpiFormCarousel'

export default function ConfiguradorPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 space-y-6">
            <h1 className="text-2xl font-bold">Configuración de KPIs</h1>
            <KpiFormCarousel />
        </div>
    )
}
