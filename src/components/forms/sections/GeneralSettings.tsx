// components/forms/sections/GeneralSettings.tsx
import { useConfigStore } from '../../../store/useConfigStore'
import React from 'react'

type Props = {
    index: number
}

export default function GeneralSettings({ index }: Props) {
    const kpi = useConfigStore((state) => state.kpis[index])
    const updateKpi = useConfigStore((state) => state.updateKpi)
    const { data_type_id, updateGlobal } = useConfigStore()

    const handleChange = (field: keyof typeof kpi, value: any) => {
        updateKpi(index, { [field]: value })
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Datos Generales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                    className="input"
                    value={kpi.kpi}
                    onChange={(e) => handleChange('kpi', e.target.value)}
                >
                    <option value="sellout">sellout</option>
                    <option value="stock_oh">stock_oh</option>
                    <option value="stock_tuberia">stock_tuberia</option>
                    <option value="sellin">sellin</option>
                    <option value="fillrate">fillrate</option>
                    <option value="forecast">forecast</option>
                </select>
                <input
                    type="text"
                    placeholder="Prefijo del archivo"
                    className="input"
                    value={kpi.file_prefix}
                    onChange={(e) => handleChange('file_prefix', e.target.value)}
                />
                <select
                    className="input"
                    value={kpi.extension}
                    onChange={(e) => handleChange('extension', e.target.value)}
                >
                    <option value=".xlsx">.xlsx</option>
                    <option value=".xls">.xls</option>
                    <option value=".csv">.csv</option>
                    <option value=".txt">.txt</option>
                </select>
                <input
                    type="number"
                    placeholder="Filas a saltar"
                    className="input"
                    value={kpi.skiprows}
                    onChange={(e) => handleChange('skiprows', parseInt(e.target.value))}
                />

                <div className="space-y-2">
                    <label className="block font-medium">Data_Type_ID</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={data_type_id}
                        onChange={(e) => updateGlobal({ data_type_id: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-medium">Separador</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={kpi.separator}
                        onChange={(e) => handleChange('separator', e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-medium">Codificación</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={kpi.encoding}
                        onChange={(e) => handleChange('encoding', e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
