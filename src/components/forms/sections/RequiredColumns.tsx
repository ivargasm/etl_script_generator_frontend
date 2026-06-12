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

    const handleHeadersDetected = (hasHeaders: boolean) => {
        updateKpi(index, { has_headers: hasHeaders })
    }

    const handleManualHeadersSet = (headers: string[]) => {
        updateKpi(index, { manual_headers: headers })
    }

    const toggleColumn = (column: string) => {
        const isRequired = selected.original_required_columns.includes(column)
        const isOptional = (selected.original_optional_columns || []).includes(column)

        if (isRequired) {
            updateKpi(index, {
                original_required_columns: selected.original_required_columns.filter((col) => col !== column),
            })
        } else if (isOptional) {
            updateKpi(index, {
                original_optional_columns: (selected.original_optional_columns || []).filter((col) => col !== column),
            })
        } else {
            updateKpi(index, {
                original_required_columns: [...selected.original_required_columns, column],
            })
        }
    }

    const toggleRequiredOptional = (column: string, targetType: 'required' | 'optional') => {
        const requiredList = selected.original_required_columns
        const optionalList = selected.original_optional_columns || []

        if (targetType === 'required') {
            updateKpi(index, {
                original_optional_columns: optionalList.filter((col) => col !== column),
                original_required_columns: [...requiredList, column],
            })
        } else {
            updateKpi(index, {
                original_required_columns: requiredList.filter((col) => col !== column),
                original_optional_columns: [...optionalList, column],
            })
        }
    }

    const removeColumn = (column: string) => {
        updateKpi(index, {
            original_required_columns: selected.original_required_columns.filter((col) => col !== column),
            original_optional_columns: (selected.original_optional_columns || []).filter((col) => col !== column),
        })
    }

    const hasSelectedColumns = selected.original_required_columns.length > 0 ||
        (selected.original_optional_columns && selected.original_optional_columns.length > 0)

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary dark:text-secondary-dark">Columnas del archivo</h3>
            <FileColumnExtractor
                onExtractColumns={setAvailableColumns}
                hasHeaders={selected.has_headers}
                onHeadersDetected={handleHeadersDetected}
                onManualHeadersSet={handleManualHeadersSet}
            />

            {availableColumns.length === 0 && (
                <p className="text-sm text-muted">Sube un archivo para ver las columnas disponibles.</p>
            )}

            <div className="flex flex-wrap gap-2">
                {availableColumns.map((col) => {
                    const isRequired = selected.original_required_columns.includes(col)
                    const isOptional = (selected.original_optional_columns || []).includes(col)

                    let buttonStyle = 'bg-background text-foreground border-border hover:bg-accent hover:text-white'
                    if (isRequired) {
                        buttonStyle = 'bg-btn text-text-dark border-primary'
                    } else if (isOptional) {
                        buttonStyle = 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600'
                    }

                    return (
                        <button
                            key={col}
                            onClick={() => toggleColumn(col)}
                            type="button"
                            className={`px-3 py-1 text-sm rounded-xl border transition-all ${buttonStyle}`}
                        >
                            {col}
                        </button>
                    )
                })}
            </div>

            {hasSelectedColumns && (
                <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Configuración de columnas seleccionadas</h4>
                    <div className="border border-border rounded-xl overflow-hidden bg-white dark:bg-dark-contrast">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-muted uppercase">
                                    <th className="px-3 py-2">Columna</th>
                                    <th className="px-3 py-2">Tipo</th>
                                    <th className="px-3 py-2 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border text-xs">
                                {selected.original_required_columns.map((col) => (
                                    <tr key={col} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                                        <td className="px-3 py-2 font-medium text-foreground truncate max-w-[120px]">{col}</td>
                                        <td className="px-3 py-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                Requerida
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-right space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => toggleRequiredOptional(col, 'optional')}
                                                className="text-[10px] text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors hover:cursor-pointer"
                                            >
                                                Hacer Opcional
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeColumn(col)}
                                                className="text-[10px] text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors hover:cursor-pointer"
                                            >
                                                Quitar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {(selected.original_optional_columns || []).map((col) => (
                                    <tr key={col} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                                        <td className="px-3 py-2 font-medium text-foreground truncate max-w-[120px]">{col}</td>
                                        <td className="px-3 py-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                                                Opcional
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-right space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => toggleRequiredOptional(col, 'required')}
                                                className="text-[10px] text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors hover:cursor-pointer"
                                            >
                                                Hacer Requerida
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeColumn(col)}
                                                className="text-[10px] text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors hover:cursor-pointer"
                                            >
                                                Quitar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
