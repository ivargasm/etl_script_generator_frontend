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

                <div className="space-y-2">
                    <label className="block font-medium text-primary dark:text-secondary-dark">Nombre de la pestaña <span className='text-orange-600'>(Excel)</span></label>
                    <input
                        value={kpi.sheet_name}
                        onChange={(e) => handleChange('sheet_name', e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Ej: Hoja1"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-primary dark:text-secondary-dark">Formato de fecha</label>
                    <select
                        className="input"
                        value={kpi.date_format_example}
                        onChange={(e) => handleChange('date_format_example', e.target.value)}
                    >
                        <option value="">-- Selecciona el formato --</option>

                        {/* <!-- Formatos con guiones y año de 4 dígitos --> */}
                        <option value="dd-mm-yyyy">dd-mm-yyyy (ej: 15-03-2023)</option>
                        <option value="mm-dd-yyyy">mm-dd-yyyy (ej: 03-15-2023)</option>
                        <option value="yyyy-mm-dd">yyyy-mm-dd (ej: 2023-03-15)</option>
                        <option value="yyyy-dd-mm">yyyy-dd-mm (ej: 2023-15-03)</option>

                        {/* <!-- Formatos con barras y año de 4 dígitos --> */}
                        <option value="dd/mm/yyyy">dd/mm/yyyy (ej: 15/03/2023)</option>
                        <option value="mm/dd/yyyy">mm/dd/yyyy (ej: 03/15/2023)</option>
                        <option value="yyyy/mm/dd">yyyy/mm/dd (ej: 2023/03/15)</option>
                        <option value="yyyy/dd/mm">yyyy/dd/mm (ej: 2023/15/03)</option>

                        {/* <!-- Formatos con puntos y año de 4 dígitos --> */}
                        <option value="dd.mm.yyyy">dd.mm.yyyy (ej: 15.03.2023)</option>
                        <option value="mm.dd.yyyy">mm.dd.yyyy (ej: 03.15.2023)</option>
                        <option value="yyyy.mm.dd">yyyy.mm.dd (ej: 2023.03.15)</option>
                        <option value="yyyy.dd.mm">yyyy.dd.mm (ej: 2023.15.03)</option>

                        {/* <!-- Formatos con espacios y año de 4 dígitos --> */}
                        <option value="dd mm yyyy">dd mm yyyy (ej: 15 03 2023)</option>
                        <option value="mm dd yyyy">mm dd yyyy (ej: 03 15 2023)</option>
                        <option value="yyyy mm dd">yyyy mm dd (ej: 2023 03 15)</option>

                        {/* <!-- Formatos con guión bajo y año de 4 dígitos --> */}
                        <option value="dd_mm_yyyy">dd_mm_yyyy (ej: 15_03_2023)</option>
                        <option value="mm_dd_yyyy">mm_dd_yyyy (ej: 03_15_2023)</option>
                        <option value="yyyy_mm_dd">yyyy_mm_dd (ej: 2023_03_15)</option>

                        {/* <!-- Formatos con año de 2 dígitos --> */}
                        <option value="dd-mm-yy">dd-mm-yy (ej: 15-03-23)</option>
                        <option value="mm-dd-yy">mm-dd-yy (ej: 03-15-23)</option>
                        <option value="yy-mm-dd">yy-mm-dd (ej: 23-03-15)</option>
                        <option value="dd/mm/yy">dd/mm/yy (ej: 15/03/23)</option>
                        <option value="mm/dd/yy">mm/dd/yy (ej: 03/15/23)</option>
                        <option value="yy/mm/dd">yy/mm/dd (ej: 23/03/15)</option>
                        <option value="dd.mm.yy">dd.mm.yy (ej: 15.03.23)</option>
                        <option value="mm.dd.yy">mm.dd.yy (ej: 03.15.23)</option>
                        <option value="yy.mm.dd">yy.mm.dd (ej: 23.03.15)</option>

                        {/* <!-- Formatos sin separadores --> */}
                        <option value="yyyymmdd">yyyymmdd (ej: 20230315)</option>
                        <option value="ddmmyyyy">ddmmyyyy (ej: 15032023)</option>
                        <option value="mmddyyyy">mmddyyyy (ej: 03152023)</option>
                        <option value="yymmdd">yymmdd (ej: 230315)</option>
                        <option value="ddmmyy">ddmmyy (ej: 150323)</option>
                        <option value="mmddyy">mmddyy (ej: 031523)</option>

                        {/* <!-- Formatos con nombres de mes abreviados --> */}
                        <option value="dd-mmm-yyyy">dd-mmm-yyyy (ej: 15-Mar-2023)</option>
                        <option value="dd/mmm/yyyy">dd/mmm/yyyy (ej: 15/Mar/2023)</option>
                        <option value="mmm-dd-yyyy">mmm-dd-yyyy (ej: Mar-15-2023)</option>
                        <option value="mmm/dd/yyyy">mmm/dd/yyyy (ej: Mar/15/2023)</option>
                        <option value="yyyy-mmm-dd">yyyy-mmm-dd (ej: 2023-Mar-15)</option>
                        <option value="dd mmm yyyy">dd mmm yyyy (ej: 15 Mar 2023)</option>
                        <option value="mmm dd yyyy">mmm dd yyyy (ej: Mar 15 2023)</option>
                        <option value="mmm dd, yyyy">mmm dd, yyyy (ej: Mar 15, 2023)</option>

                        {/* <!-- Formatos con nombres de mes completos --> */}
                        <option value="dd-mmmm-yyyy">dd-mmmm-yyyy (ej: 15-March-2023)</option>
                        <option value="mmmm dd, yyyy">mmmm dd, yyyy (ej: March 15, 2023)</option>
                        <option value="dd mmmm yyyy">dd mmmm yyyy (ej: 15 March 2023)</option>
                    </select>
                </div>

            </div>
        </div>
    )
}
