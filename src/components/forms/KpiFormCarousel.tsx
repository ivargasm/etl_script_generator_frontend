// components/forms/KpiFormCarousel.tsx
import React, { useState } from 'react'
import { useConfigStore } from '../../store/useConfigStore'
import KpiForm from './KpiForm'
import JsonPreviewModal from '../JsonPreviewModal'
import GeneratedCodeModal from '../GeneratedCodeModal'
import { AdditionalSettings } from '../AdditionalSettings'

export default function KpiFormCarousel() {
    const { kpis, addKpi, removeKpi, getConfigJson } = useConfigStore()
    const [current, setCurrent] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [generatedCode, setGeneratedCode] = useState<string | null>(null)

    const handleNext = () => {
        if (current < kpis.length - 1) setCurrent((prev) => prev + 1)
    }

    const handlePrevious = () => {
        if (current > 0) setCurrent((prev) => prev - 1)
    }

    const handleRemove = () => {
        removeKpi(current)
        setCurrent((prev) => Math.max(0, prev - 1))
    }

    const handlePreview = () => {
        console.log('📦 JSON generado:', getConfigJson())
        setShowModal(true)
    }


    if (kpis.length === 0) {
        return (
            <div className="space-y-4 w-full h-dvh md:h-vh flex flex-col items-center justify-center">
                <p className="text-gray-500">No hay KPIs configurados.</p>
                <button
                    onClick={addKpi}
                    className="px-4 py-2 bg-btn text-white rounded hover:bg-btn-dark cursor-pointer"
                >
                    Agregar KPI
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6 p-8">
            <AdditionalSettings />
            <KpiForm index={current} />

            <div className="flex justify-between gap-2 flex-wrap">
                <div className="flex gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={current === 0}
                        className={`px-4 py-2 rounded cursor-pointer ${current === 0
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-gray-700 text-white hover:bg-gray-800'
                            }`}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={current === kpis.length - 1}
                        className={`px-4 py-2 rounded cursor-pointer ${current === kpis.length - 1
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-gray-700 text-white hover:bg-gray-800'
                            }`}
                    >
                        Siguiente
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleRemove}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={addKpi}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                    >
                        Agregar KPI
                    </button>
                    <button
                        onClick={handlePreview}
                        disabled={kpis.length === 0}
                        className={`mt-4 px-4 py-2 rounded text-text-dark cursor-pointer 
                            ${kpis.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-btn hover:bg-btn-dark'}`}
                    >
                        Vista previa JSON
                    </button>


                    {showModal && (
                        <JsonPreviewModal
                            json={getConfigJson()}
                            onClose={() => setShowModal(false)}
                            onCodeGenerated={(code) => setGeneratedCode(code)}
                        />
                    )}

                    {generatedCode && (
                        <GeneratedCodeModal
                            code={generatedCode}
                            onClose={() => setGeneratedCode(null)}
                        />
                    )}
                </div>
            </div>

            <p className="text-sm text-gray-500 text-center">
                Mostrando configuración {current + 1} de {kpis.length}
            </p>
        </div>
    )
}
