// components/forms/sections/RenameMap.tsx
import React, { useState } from 'react'
import { useConfigStore } from '../../../store/useConfigStore'

interface Props {
    index: number
}

export default function RenameMap({ index }: Props) {
    const { kpis, updateKpi } = useConfigStore()
    const selected = kpis[index]

    const handleRenameChange = (original: string, newName: string) => {
        updateKpi(index, {
            rename_map: {
                ...selected.rename_map,
                [original]: newName,
            },
        })
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary dark:text-secondary-dark">Renombrar columnas</h3>
            <p className="text-sm text-muted-foreground">
                Solo se mostrarán las columnas seleccionadas como requeridas.
            </p>
            <div className="grid grid-cols-1 gap-4">
                {selected.original_required_columns.map((col) => (
                    <div key={col} className="flex items-center gap-2">
                        <label className="w-1/3 text-sm font-medium">{col}</label>
                        <input
                            type="text"
                            className="input"
                            value={selected.rename_map[col] || ''}
                            onChange={(e) => handleRenameChange(col, e.target.value)}
                            placeholder="Nuevo nombre"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}