// components/forms/sections/RenameMap.tsx
import { useConfigStore } from '../../../store/useConfigStore'
import React from 'react'
import { useState } from 'react'

type Props = {
    index: number
}

export default function RenameMap({ index }: Props) {
    const kpi = useConfigStore((state) => state.kpis[index])
    const updateKpi = useConfigStore((state) => state.updateKpi)

    const [original, setOriginal] = useState('')
    const [renamed, setRenamed] = useState('')

    const addMapping = () => {
        if (original.trim() === '' || renamed.trim() === '') return
        const updated = {
            ...kpi.rename_map,
            [original.trim()]: renamed.trim()
        }
        updateKpi(index, { rename_map: updated })
        setOriginal('')
        setRenamed('')
    }

    const removeMapping = (key: string) => {
        const updated = { ...kpi.rename_map }
        delete updated[key]
        updateKpi(index, { rename_map: updated })
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Renombramiento de columnas</h3>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Nombre original"
                    value={original}
                    onChange={(e) => setOriginal(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Nuevo nombre"
                    value={renamed}
                    onChange={(e) => setRenamed(e.target.value)}
                    className="input"
                />
                <button onClick={addMapping} className="btn btn-primary cursor-pointer">
                    Agregar
                </button>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-4">
                {Object.entries(kpi.rename_map).map(([key, value]) => (
                    <li key={key} className="flex justify-between items-center">
                        <span>
                            <strong>{key}</strong> → {value}
                        </span>
                        <button
                            onClick={() => removeMapping(key)}
                            className="text-red-500 hover:underline text-sm cursor-pointer"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
