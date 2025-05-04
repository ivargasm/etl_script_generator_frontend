// components/forms/KpiForm.tsx
import GeneralSettings from './sections/GeneralSettings'
import RequiredColumns from './sections/RequiredColumns'
import RenameMap from './sections/RenameMap'
import React from 'react'

type Props = {
    index: number
}

export default function KpiForm({ index }: Props) {
    return (
        <div className="space-y-6 p-4 rounded-2xl shadow-md border border-border bg-card">
            <h2 className="text-xl font-semibold">Configuración KPI #{index + 1}</h2>
            <GeneralSettings index={index} />
            <RequiredColumns index={index} />
            <RenameMap index={index} />
        </div>
    )
}
