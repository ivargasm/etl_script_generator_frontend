// components/forms/sections/GeneralSettings.tsx
import { useConfigStore } from '../../../store/useConfigStore'
import React from 'react'
import { ToggleSwitch } from '../../ToggleSwitch'

type Props = {
    index: number
}

// Mapeo de formato de fecha visual a patrón regex
const DATE_FORMAT_PATTERNS: Record<string, string> = {
    'yyyymmdd':   '\\d{8}',
    'yyyy-mm-dd': '\\d{4}-\\d{2}-\\d{2}',
    'yyyy/mm/dd': '\\d{4}/\\d{2}/\\d{2}',
    'yyyy_mm_dd': '\\d{4}_\\d{2}_\\d{2}',
    'ddmmyyyy':   '\\d{8}',
    'dd-mm-yyyy': '\\d{2}-\\d{2}-\\d{4}',
    'dd/mm/yyyy': '\\d{2}/\\d{2}/\\d{4}',
    'dd_mm_yyyy': '\\d{2}_\\d{2}_\\d{4}',
    'mmddyyyy':   '\\d{8}',
    'mm-dd-yyyy': '\\d{2}-\\d{2}-\\d{4}',
    'mm/dd/yyyy': '\\d{2}/\\d{2}/\\d{4}',
    'yymmdd':     '\\d{6}',
    'yy-mm-dd':   '\\d{2}-\\d{2}-\\d{2}',
    'dd-mm-yy':   '\\d{2}-\\d{2}-\\d{2}',
}

function buildRegex(
    dateFormat: string,
    position: 'inicio' | 'fin' | 'medio',
    beforeType: 'texto_fijo' | 'texto_variable' | 'ninguno',
    beforeValue: string,
    afterType: 'texto_fijo' | 'texto_variable' | 'ninguno',
    afterValue: string,
): string {
    const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const datePattern = DATE_FORMAT_PATTERNS[dateFormat] || '\\d{8}'

    let before = ''
    if (position === 'inicio') {
        before = '^'
    } else if (beforeType === 'texto_fijo' && beforeValue) {
        before = escape(beforeValue)
    } else if (beforeType === 'texto_variable') {
        before = '.+?'
    }

    let after = ''
    if (position === 'fin') {
        after = '(?:[^\\d]|$)'
    } else if (afterType === 'texto_fijo' && afterValue) {
        after = escape(afterValue)
    } else if (afterType === 'texto_variable') {
        after = '.+?'
    }

    return `${before}(${datePattern})${after}`
}

export default function GeneralSettings({ index }: Props) {
    const kpi = useConfigStore((state) => state.kpis[index])
    const updateKpi = useConfigStore((state) => state.updateKpi)
    const { data_type_id, updateGlobal } = useConfigStore()

    const handleChange = (field: keyof typeof kpi, value: any) => {
        updateKpi(index, { [field]: value })
    }

    // ── Estado del asistente de fecha ──────────────────────────────────
    const [dateFormat, setDateFormat] = React.useState('yyyymmdd')
    const [position, setPosition] = React.useState<'inicio' | 'fin' | 'medio'>('medio')
    const [beforeType, setBeforeType] = React.useState<'texto_fijo' | 'texto_variable' | 'ninguno'>('ninguno')
    const [beforeValue, setBeforeValue] = React.useState('')
    const [afterType, setAfterType] = React.useState<'texto_fijo' | 'texto_variable' | 'ninguno'>('texto_variable')
    const [afterValue, setAfterValue] = React.useState('')
    const [sampleFilename, setSampleFilename] = React.useState('')
    const [sampleResult, setSampleResult] = React.useState<string | null>(null)

    // Recalcular regex cuando cambie alguna opción del asistente
    React.useEffect(() => {
        if (!kpi.extract_date_from_filename) return
        const regex = buildRegex(dateFormat, position, beforeType, beforeValue, afterType, afterValue)
        updateKpi(index, { filename_date_regex: regex })
    }, [dateFormat, position, beforeType, beforeValue, afterType, afterValue, kpi.extract_date_from_filename])

    // Probar regex contra el nombre de archivo de ejemplo
    React.useEffect(() => {
        if (!sampleFilename || !kpi.filename_date_regex) { setSampleResult(null); return }
        try {
            const match = sampleFilename.match(new RegExp(kpi.filename_date_regex))
            setSampleResult(match ? match[1] : 'Sin coincidencia')
        } catch {
            setSampleResult('Regex inválida')
        }
    }, [sampleFilename, kpi.filename_date_regex])

    const btnBase = "px-3 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer"
    const btnActive = "border-primary bg-primary/10 text-primary dark:border-secondary-dark dark:text-secondary-dark dark:bg-secondary-dark/10"
    const btnInactive = "border-gray-300 dark:border-gray-600 text-text/60 dark:text-text-dark/60 hover:border-primary/50"

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-primary dark:text-secondary-dark">Datos Generales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className='space-y-2 flex flex-col gap-1'>
                    <label className='text-sm text-text/70 dark:text-text-dark/70'>KPI</label>
                    <select className="input" value={kpi.kpi} onChange={(e) => handleChange('kpi', e.target.value)}>
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
                    <input type="text" placeholder="Prefijo del archivo" className="input" value={kpi.file_prefix} onChange={(e) => handleChange('file_prefix', e.target.value)} />
                </div>
                <div className='space-y-2 flex flex-col gap-1'>
                    <label className='text-sm text-text/70 dark:text-text-dark/70'>Extensión</label>
                    <select className="input" value={kpi.extension} onChange={(e) => handleChange('extension', e.target.value)}>
                        <option value=".xlsx">.xlsx</option>
                        <option value=".xls">.xls</option>
                        <option value=".csv">.csv</option>
                        <option value=".txt">.txt</option>
                    </select>
                </div>
                <div className='space-y-2 flex flex-col gap-1'>
                    <label className='text-sm text-text/70 dark:text-text-dark/70'>Filas a saltar <span className='text-orange-600'>solo excel</span></label>
                    <input type="number" placeholder="Filas a saltar" className="input" value={kpi.skiprows} onChange={(e) => handleChange('skiprows', parseInt(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <label className="block font-medium text-primary dark:text-secondary-dark">Data_Type_ID</label>
                    <input type="text" className="w-full p-2 border rounded-md" value={data_type_id} onChange={(e) => updateGlobal({ data_type_id: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <label className="block font-medium text-primary dark:text-secondary-dark">Separador</label>
                    <input type="text" className="w-full p-2 border rounded-md" value={kpi.separator} onChange={(e) => handleChange('separator', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="block font-medium text-primary dark:text-secondary-dark">Codificación</label>
                    <input type="text" className="w-full p-2 border rounded-md" value={kpi.encoding} onChange={(e) => handleChange('encoding', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="block font-medium text-primary dark:text-secondary-dark">Nombre de la pestaña <span className='text-orange-600'>(Excel)</span></label>
                    <input value={kpi.sheet_name} onChange={(e) => handleChange('sheet_name', e.target.value)} className="w-full p-2 border rounded-md" placeholder="Ej: Hoja1" />
                </div>
                <div className="space-y-2">
                    <label className="block font-medium text-primary dark:text-secondary-dark">Formato de fecha</label>
                    <select className="input" value={kpi.date_format_example} onChange={(e) => handleChange('date_format_example', e.target.value)}>
                        <option value="">-- Selecciona el formato --</option>
                        <option value="dd-mm-yyyy">dd-mm-yyyy (ej: 15-03-2023)</option>
                        <option value="mm-dd-yyyy">mm-dd-yyyy (ej: 03-15-2023)</option>
                        <option value="yyyy-mm-dd">yyyy-mm-dd (ej: 2023-03-15)</option>
                        <option value="yyyy-dd-mm">yyyy-dd-mm (ej: 2023-15-03)</option>
                        <option value="dd/mm/yyyy">dd/mm/yyyy (ej: 15/03/2023)</option>
                        <option value="mm/dd/yyyy">mm/dd/yyyy (ej: 03/15/2023)</option>
                        <option value="yyyy/mm/dd">yyyy/mm/dd (ej: 2023/03/15)</option>
                        <option value="yyyy/dd/mm">yyyy/dd/mm (ej: 2023/15/03)</option>
                        <option value="dd.mm.yyyy">dd.mm.yyyy (ej: 15.03.2023)</option>
                        <option value="mm.dd.yyyy">mm.dd.yyyy (ej: 03.15.2023)</option>
                        <option value="yyyy.mm.dd">yyyy.mm.dd (ej: 2023.03.15)</option>
                        <option value="dd mm yyyy">dd mm yyyy (ej: 15 03 2023)</option>
                        <option value="mm dd yyyy">mm dd yyyy (ej: 03 15 2023)</option>
                        <option value="yyyy mm dd">yyyy mm dd (ej: 2023 03 15)</option>
                        <option value="dd_mm_yyyy">dd_mm_yyyy (ej: 15_03_2023)</option>
                        <option value="mm_dd_yyyy">mm_dd_yyyy (ej: 03_15_2023)</option>
                        <option value="yyyy_mm_dd">yyyy_mm_dd (ej: 2023_03_15)</option>
                        <option value="dd-mm-yy">dd-mm-yy (ej: 15-03-23)</option>
                        <option value="mm-dd-yy">mm-dd-yy (ej: 03-15-23)</option>
                        <option value="yy-mm-dd">yy-mm-dd (ej: 23-03-15)</option>
                        <option value="dd/mm/yy">dd/mm/yy (ej: 15/03/23)</option>
                        <option value="mm/dd/yy">mm/dd/yy (ej: 03/15/23)</option>
                        <option value="yy/mm/dd">yy/mm/dd (ej: 23/03/15)</option>
                        <option value="yyyymmdd">yyyymmdd (ej: 20230315)</option>
                        <option value="ddmmyyyy">ddmmyyyy (ej: 15032023)</option>
                        <option value="mmddyyyy">mmddyyyy (ej: 03152023)</option>
                        <option value="yymmdd">yymmdd (ej: 230315)</option>
                        <option value="ddmmyy">ddmmyy (ej: 150323)</option>
                        <option value="mmddyy">mmddyy (ej: 031523)</option>
                        <option value="dd-mmm-yyyy">dd-mmm-yyyy (ej: 15-Mar-2023)</option>
                        <option value="dd/mmm/yyyy">dd/mmm/yyyy (ej: 15/Mar/2023)</option>
                        <option value="mmm-dd-yyyy">mmm-dd-yyyy (ej: Mar-15-2023)</option>
                        <option value="mmm/dd/yyyy">mmm/dd/yyyy (ej: Mar/15/2023)</option>
                        <option value="dd-mmmm-yyyy">dd-mmmm-yyyy (ej: 15-March-2023)</option>
                        <option value="mmmm dd, yyyy">mmmm dd, yyyy (ej: March 15, 2023)</option>
                        <option value="dd mmmm yyyy">dd mmmm yyyy (ej: 15 March 2023)</option>
                    </select>
                </div>
            </div>

            {/* ──────── ASISTENTE DE FECHA EN NOMBRE DE ARCHIVO ──────── */}
            <div className="border-t pt-4 mt-4 border-gray-200 dark:border-gray-700">
                <ToggleSwitch
                    id={`extract-date-${index}`}
                    checked={kpi.extract_date_from_filename}
                    onChange={(checked) => handleChange('extract_date_from_filename', checked)}
                    label="Extraer fecha del nombre del archivo"
                    className="mb-3"
                />

                {kpi.extract_date_from_filename && (
                    <div className="mt-2 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-5">

                        {/* Paso 1: Formato de la fecha */}
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-text dark:text-text-dark">
                                1️⃣&nbsp; ¿En qué formato aparece la fecha en el nombre del archivo?
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { val: 'yyyymmdd',   label: 'YYYYMMDD',   ex: '20260604' },
                                    { val: 'yyyy-mm-dd', label: 'YYYY-MM-DD', ex: '2026-06-04' },
                                    { val: 'yyyy/mm/dd', label: 'YYYY/MM/DD', ex: '2026/06/04' },
                                    { val: 'dd-mm-yyyy', label: 'DD-MM-YYYY', ex: '04-06-2026' },
                                    { val: 'ddmmyyyy',   label: 'DDMMYYYY',   ex: '04062026' },
                                    { val: 'yymmdd',     label: 'YYMMDD',     ex: '260604' },
                                ].map(opt => (
                                    <button key={opt.val} type="button"
                                        onClick={() => setDateFormat(opt.val)}
                                        className={`${btnBase} ${dateFormat === opt.val ? btnActive : btnInactive}`}
                                    >
                                        <span className="font-mono">{opt.label}</span>
                                        <span className="ml-1 text-xs opacity-60">({opt.ex})</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Paso 2: Posición */}
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-text dark:text-text-dark">
                                2️⃣&nbsp; ¿Dónde aparece la fecha dentro del nombre?
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { val: 'inicio', label: '📄 Al inicio', ex: '20260604_ventas.csv' },
                                    { val: 'fin',    label: '📄 Al final',  ex: 'ventas_20260604.csv' },
                                    { val: 'medio',  label: '📄 En medio',  ex: 'ventas_20260604_extra.csv' },
                                ].map(opt => (
                                    <button key={opt.val} type="button"
                                        onClick={() => setPosition(opt.val as any)}
                                        className={`${btnBase} ${position === opt.val ? btnActive : btnInactive}`}
                                    >
                                        {opt.label}
                                        <span className="ml-1 text-xs opacity-60 font-mono">{opt.ex}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Paso 3a: ¿Qué hay ANTES? (solo si no es al inicio) */}
                        {position !== 'inicio' && (
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-text dark:text-text-dark">
                                    3️⃣&nbsp; ¿Qué hay <span className="underline">antes</span> de la fecha?
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { val: 'texto_fijo',     label: '🔤 Texto fijo',     desc: 'Siempre igual (ej. "Ventas_")' },
                                        { val: 'texto_variable', label: '🔀 Texto variable', desc: 'Cambia cada vez (ej. UUID, número aleatorio)' },
                                    ].map(opt => (
                                        <button key={opt.val} type="button"
                                            onClick={() => setBeforeType(opt.val as any)}
                                            className={`${btnBase} ${beforeType === opt.val ? btnActive : btnInactive}`}
                                        >
                                            <span>{opt.label}</span>
                                            <span className="block text-xs opacity-60 mt-0.5">{opt.desc}</span>
                                        </button>
                                    ))}
                                </div>
                                {beforeType === 'texto_fijo' && (
                                    <input
                                        type="text"
                                        value={beforeValue}
                                        onChange={e => setBeforeValue(e.target.value)}
                                        placeholder='Escribe el texto fijo, ej: Ventas_'
                                        className="input mt-1"
                                    />
                                )}
                            </div>
                        )}

                        {/* Paso 3b/4: ¿Qué hay DESPUÉS? (solo si no es al final) */}
                        {position !== 'fin' && (
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-text dark:text-text-dark">
                                    {position === 'inicio' ? '3️⃣' : '4️⃣'}&nbsp; ¿Qué hay <span className="underline">después</span> de la fecha?
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { val: 'ninguno',        label: '✅ Nada',            desc: 'La fecha termina el nombre (antes de la extensión)' },
                                        { val: 'texto_fijo',     label: '🔤 Texto fijo',       desc: 'Siempre igual (ej. "_reporte")' },
                                        { val: 'texto_variable', label: '🔀 Texto variable',   desc: 'Cambia cada vez (ej. timestamp, UUID)' },
                                    ].map(opt => (
                                        <button key={opt.val} type="button"
                                            onClick={() => setAfterType(opt.val as any)}
                                            className={`${btnBase} ${afterType === opt.val ? btnActive : btnInactive}`}
                                        >
                                            <span>{opt.label}</span>
                                            <span className="block text-xs opacity-60 mt-0.5">{opt.desc}</span>
                                        </button>
                                    ))}
                                </div>
                                {afterType === 'texto_fijo' && (
                                    <input
                                        type="text"
                                        value={afterValue}
                                        onChange={e => setAfterValue(e.target.value)}
                                        placeholder='Escribe el texto fijo, ej: _scraping'
                                        className="input mt-1"
                                    />
                                )}
                            </div>
                        )}

                        {/* Prueba en vivo */}
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
                            <p className="text-sm font-semibold text-text dark:text-text-dark">🧪 Prueba con un nombre de archivo real</p>
                            <input
                                type="text"
                                value={sampleFilename}
                                onChange={e => setSampleFilename(e.target.value)}
                                placeholder="ej. bottlesense_20260604_235721.csv"
                                className="input"
                            />
                            {sampleResult !== null && (
                                <div className={`text-sm px-3 py-2 rounded-lg ${
                                    sampleResult === 'Sin coincidencia' || sampleResult === 'Regex inválida'
                                        ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                        : 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                }`}>
                                    {sampleResult === 'Sin coincidencia' || sampleResult === 'Regex inválida'
                                        ? `⚠️ ${sampleResult} — ajusta las opciones de arriba.`
                                        : `✅ Fecha extraída: ${sampleResult}`}
                                </div>
                            )}
                            <p className="text-xs text-text/50 dark:text-text-dark/50 font-mono">
                                Patrón generado: {kpi.filename_date_regex}
                            </p>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}
