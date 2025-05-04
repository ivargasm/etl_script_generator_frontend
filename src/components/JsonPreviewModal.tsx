import React, { useState } from 'react'

type Props = {
    json: any
    onClose: () => void
    onCodeGenerated: (code: string) => void
}

export default function JsonPreviewModal({ json, onClose, onCodeGenerated }: Props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSend = async () => {
        setLoading(true)
        setError(null)

        try {
            // const response = await fetch('http://localhost:8000/generate/script', {
                const response = await fetch('https://etl-script-generator-backend.onrender.com/generate/script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            })

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.statusText}`)
            }

            const result = await response.json()

            if (result.success && result.code) {
                onCodeGenerated(result.code)
                onClose()
            } else {
                setError('No se recibió el código generado.')
            }
        } catch (err: any) {
            setError(`No se pudo enviar: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-3xl w-full shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Vista previa del JSON
                </h2>

                <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-4 rounded max-h-96 overflow-auto text-gray-700 dark:text-gray-100">
                    {JSON.stringify(json, null, 2)}
                </pre>

                {error && (
                    <div className="mt-4 p-2 bg-red-100 text-red-800 rounded">
                        {error}
                    </div>
                )}

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className={`px-4 py-2 text-white rounded ${
                            loading
                                ? 'bg-blue-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Generando...' : 'Generar Python'}
                    </button>
                </div>
            </div>
        </div>
    )
}
