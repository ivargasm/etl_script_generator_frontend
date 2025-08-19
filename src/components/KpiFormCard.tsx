import React from 'react'
import { useConfigStore } from '../store/useConfigStore'
import { ToggleSwitch } from './ToggleSwitch'

type Props = {
    index: number
}

export const KpiFormCard: React.FC<Props> = ({ index }) => {
    const { kpis, updateKpi, removeKpi } = useConfigStore()
    const kpi = kpis[index]

    const handleChange = (field: keyof typeof kpi, value: any) => {
        updateKpi(index, { [field]: value })
    }

    const handleRenameMapChange = (key: string, value: string) => {
        const newMap = { ...kpi.rename_map, [key]: value }
        updateKpi(index, { rename_map: newMap })
    }

    const handleAddRenameField = () => {
        updateKpi(index, { rename_map: { ...kpi.rename_map, '': '' } })
    }

    const handleRemoveRenameKey = (key: string) => {
        const newMap = { ...kpi.rename_map }
        delete newMap[key]
        updateKpi(index, { rename_map: newMap })
    }

    const handleOriginalRequiredChange = (value: string) => {
        const updated = value.split(',').map(v => v.trim()).filter(Boolean)
        updateKpi(index, { original_required_columns: updated })
    }

    const handleManualHeadersChange = (value: string) => {
        // Store raw text to allow comma typing
        updateKpi(index, { manual_headers: [value] })
    }

    const processManualHeaders = (value: string) => {
        const updated = value.split(',').map(v => v.trim()).filter(Boolean)
        updateKpi(index, { manual_headers: updated })
    }

    return (
        <div className="bg-white border rounded-xl p-6 space-y-4 shadow-md">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">KPI #{index + 1}</h3>
                <button
                    onClick={() => removeKpi(index)}
                    className="text-red-500 hover:underline text-sm"
                >
                    Eliminar
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Nombre del KPI</label>
                    <input
                        type="text"
                        value={kpi.kpi}
                        onChange={(e) => handleChange('kpi', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Prefijo de archivo</label>
                    <input
                        type="text"
                        value={kpi.file_prefix}
                        onChange={(e) => handleChange('file_prefix', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Extensión</label>
                    <input
                        type="text"
                        value={kpi.extension}
                        onChange={(e) => handleChange('extension', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Skip Rows</label>
                    <input
                        type="number"
                        value={kpi.skiprows}
                        onChange={(e) => handleChange('skiprows', Number(e.target.value))}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
            </div>

            <div>
                <ToggleSwitch
                    id={`has-headers-${index}`}
                    checked={kpi.has_headers}
                    onChange={(checked) => handleChange('has_headers', checked)}
                    label="El archivo tiene encabezados"
                    className="mb-3"
                />

                {!kpi.has_headers && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Encabezados manuales (separados por coma)
                        </label>
                        <textarea
                            value={kpi.manual_headers.length === 1 && kpi.manual_headers[0].includes(',') ? kpi.manual_headers[0] : kpi.manual_headers.join(', ')}
                            onChange={(e) => handleManualHeadersChange(e.target.value)}
                            onBlur={(e) => processManualHeaders(e.target.value)}
                            placeholder="Columna1, Columna2, Columna3..."
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Columnas requeridas originales (separadas por coma)
                    </label>
                    <textarea
                        value={kpi.original_required_columns.join(', ')}
                        onChange={(e) => handleOriginalRequiredChange(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Rename Map</label>
                <div className="space-y-2">
                    {Object.entries(kpi.rename_map).map(([key, val], i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={key}
                                onChange={(e) => {
                                    const newKey = e.target.value
                                    const newMap = { ...kpi.rename_map }
                                    delete newMap[key]
                                    newMap[newKey] = val
                                    updateKpi(index, { rename_map: newMap })
                                }}
                                placeholder="Columna original"
                                className="flex-1 p-2 border rounded-lg"
                            />
                            <input
                                type="text"
                                value={val}
                                onChange={(e) => handleRenameMapChange(key, e.target.value)}
                                placeholder="Columna destino"
                                className="flex-1 p-2 border rounded-lg"
                            />
                            <button
                                onClick={() => handleRemoveRenameKey(key)}
                                className="text-red-500 text-sm"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAddRenameField}
                        className="text-blue-600 text-sm mt-2 hover:underline"
                    >
                        + Agregar campo de renombre
                    </button>
                </div>
            </div>
        </div>
    )
}
