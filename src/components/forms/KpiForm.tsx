// components/forms/KpiForm.tsx
import GeneralSettings from './sections/GeneralSettings'
import RequiredColumns from './sections/RequiredColumns'
import RenameMap from './sections/RenameMap'
import React from 'react'
import CleanFields from './sections/CleanFields'

type Props = {
    index: number
}

export default function KpiForm({ index }: Props) {
    return (
        <div className="space-y-6 p-4 rounded-2xl shadow-md border border-border bg-light-contrast dark:bg-dark-contrast">
            <h2 className="text-xl font-semibold text-accent dark:text-accent-dark">Configuración KPI #{index + 1}</h2>
            <GeneralSettings index={index} />
            <div className='flex flex-col md:flex-row gap-4 w-full items-start'>
                <div className='w-full md:w-1/3'>
                    <RequiredColumns index={index} />
                </div>
                <div className='w-full md:w-1/3'>
                    <RenameMap index={index} />
                </div>
                <div className='w-full md:w-1/3'>
                    <CleanFields index={index} />
                </div>
                

            </div>
        </div>
    )
}
