import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
    code: string
    onClose: () => void
}

export default function GeneratedCodeModal({ code, onClose }: Props) {
    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/x-python' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'etl_script.py'
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[90vw] h-[90vh] shadow-2xl overflow-hidden flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Código Python generado
                </h2>

                <div className="flex-1 overflow-auto bg-gray-900 text-green-400 p-4 rounded text-sm whitespace-pre-wrap">
                <SyntaxHighlighter language="python" style={oneDark} wrapLines showLineNumbers>
                    {code}
                </SyntaxHighlighter>
                </div>

                <div className="mt-4 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Descargar archivo
                    </button>
                </div>
            </div>
        </div>
    )
}
