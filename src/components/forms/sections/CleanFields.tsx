// components/forms/sections/CleanFields.tsx
import React, { useState } from 'react'
import { useConfigStore } from '../../../store/useConfigStore'

interface Props {
    index: number
}

export default function CleanFields({ index }: Props) {
    const { kpis, updateKpi } = useConfigStore()
    const selected = kpis[index]
    const [newField, setNewField] = useState('')

    const addField = () => {
        const trimmed = newField.trim()
        if (trimmed && !selected.clean_fields.includes(trimmed)) {
            updateKpi(index, { clean_fields: [...selected.clean_fields, trimmed] })
            setNewField('')
        }
    }

    const removeField = (field: string) => {
        updateKpi(index, {
            clean_fields: selected.clean_fields.filter((f) => f !== field),
        })
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary dark:text-secondary-dark">Campos a limpiar</h3>
            <div className="flex gap-2">
                <div className='flex flex-col gap-2'>
                    <label className="block text-sm font-medium text-foreground">
                        Ingresa las calumnas a limpiar (renombradas)
                    </label>
                    <input
                        type="text"
                        value={newField}
                        onChange={(e) => setNewField(e.target.value)}
                        className="input"
                        placeholder="Nombre de campo"
                    />

                </div>
                <button onClick={addField} type="button" className="btn btn-primary">
                    Agregar
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {selected.clean_fields.map((field) => (
                    <span
                        key={field}
                        className="bg-primary text-white px-3 py-1 rounded-xl text-sm flex items-center gap-2"
                    >
                        {field}
                        <button
                            onClick={() => removeField(field)}
                            className="text-white hover:text-red-300"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    )
}
