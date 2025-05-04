// components/forms/sections/RequiredColumns.tsx
import { useConfigStore } from '../../../store/useConfigStore'
import React from 'react'
import { useState } from 'react'

type Props = {
    index: number
}

export default function RequiredColumns({ index }: Props) {
    const kpi = useConfigStore((state) => state.kpis[index])
    const updateKpi = useConfigStore((state) => state.updateKpi)

    const [newColumn, setNewColumn] = useState('')

    const addColumn = () => {
        if (newColumn.trim() === '') return
        const updated = [...kpi.original_required_columns, newColumn.trim()]
        updateKpi(index, { original_required_columns: updated })
        setNewColumn('')
    }

    const removeColumn = (i: number) => {
        const updated = [...kpi.original_required_columns]
        updated.splice(i, 1)
        updateKpi(index, { original_required_columns: updated })
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Columnas requeridas</h3>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Nombre de la columna"
                    value={newColumn}
                    onChange={(e) => setNewColumn(e.target.value)}
                    className="input"
                />
                <button onClick={addColumn} className="btn btn-primary cursor-pointer">
                    Agregar
                </button>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-4">
                {kpi.original_required_columns.map((col, i) => (
                    <li key={i} className="flex justify-between items-center">
                        <span>{col}</span>
                        <button
                            onClick={() => removeColumn(i)}
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
