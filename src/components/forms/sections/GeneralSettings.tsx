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
            <h3 className="text-lg font-medium text-primary dark:text-secondary-dark">Datos Generales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className='space-y-2 flex flex-col gap-1'>
                    <label className='text-sm text-text/70 dark:text-text-dark/70'>KPI</label>
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
                </div>
                <div className='space-y-2 flex flex-col gap-1'>
                    <label className='text-sm text-text/70 dark:text-text-dark/70'>Nombre del Archivo</label>
                    <input
                        type="text"
                        placeholder="Prefijo del archivo"
                        className="input"
                        value={kpi.file_prefix}
                        onChange={(e) => handleChange('file_prefix', e.target.value)}
                    />
                </div>
                <div className='space-y-2 flex flex-col gap-1'>
                    <label className='text-sm text-text/70 dark:text-text-dark/70'>Extensión</label>
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
                </div>
                <div className='space-y-2 flex flex-col gap-1'>
                    <label className='text-sm text-text/70 dark:text-text-dark/70'>Filas a saltar <span className='text-orange-600'>solo excel</span> </label>
                    <input
                        type="number"
                        placeholder="Filas a saltar"
                        className="input"
                        value={kpi.skiprows}
                        onChange={(e) => handleChange('skiprows', parseInt(e.target.value))}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-primary dark:text-secondary-dark">Data_Type_ID</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={data_type_id}
                        onChange={(e) => updateGlobal({ data_type_id: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-primary dark:text-secondary-dark">Separador</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={kpi.separator}
                        onChange={(e) => handleChange('separator', e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-primary dark:text-secondary-dark">Codificación</label>
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
