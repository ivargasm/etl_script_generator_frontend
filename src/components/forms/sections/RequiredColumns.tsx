// components/forms/sections/RequiredColumns.tsx
import React, { useState } from 'react'
import { useConfigStore } from '../../../store/useConfigStore'
import FileColumnExtractor from '../../FileColumnExtractor'

interface Props {
    index: number
}

export default function RequiredColumns({ index }: Props) {
    const { kpis, updateKpi } = useConfigStore()
    const selected = kpis[index]
    const [availableColumns, setAvailableColumns] = useState<string[]>([])

    const toggleColumn = (column: string) => {
        const exists = selected.original_required_columns.includes(column)
        const updated = exists
            ? selected.original_required_columns.filter((col) => col !== column)
            : [...selected.original_required_columns, column]
        updateKpi(index, { original_required_columns: updated })
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary dark:text-secondary-dark">Columnas requeridas</h3>
            <FileColumnExtractor onExtractColumns={setAvailableColumns} />

            {availableColumns.length === 0 && (
                <p className="text-sm text-muted">Sube un archivo para ver las columnas disponibles.</p>
            )}

            <div className="flex flex-wrap gap-2">
                {availableColumns.map((col) => {
                    const isSelected = selected.original_required_columns.includes(col)
                    return (
                        <button
                            key={col}
                            onClick={() => toggleColumn(col)}
                            type="button"
                            className={`px-3 py-1 text-sm rounded-xl border transition-all ${isSelected
                                    ? 'bg-btn text-text-dark border-primary'
                                    : 'bg-background text-foreground border-border hover:bg-accent hover:text-white'
                                }`}
                        >
                            {col}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
