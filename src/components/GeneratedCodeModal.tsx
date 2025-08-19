import React, { useState } from 'react'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-dark.css';
import './CodeEditor.css';

type Props = {
    code: string
    onClose: () => void
}

export default function GeneratedCodeModal({ code, onClose }: Props) {
    const [editableCode, setEditableCode] = useState(code)
    const [isEditing, setIsEditing] = useState(false)

    const handleDownload = () => {
        const blob = new Blob([editableCode], { type: 'text/x-python' })
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

                <div className="flex-1 bg-gray-900 rounded relative overflow-hidden">
                    {isEditing ? (
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 overflow-auto">
                                <Editor
                                    value={editableCode}
                                    onValueChange={setEditableCode}
                                    highlight={code => highlight(code, languages.python, 'python')}
                                    padding={16}
                                    style={{
                                        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                        fontSize: 14,
                                        backgroundColor: '#1a1a1a',
                                        color: '#f8f8f2',
                                        minHeight: '100%',
                                        outline: 'none',
                                        lineHeight: '1.5'
                                    }}
                                    placeholder="Edita tu código Python aquí..."
                                />
                            </div>
                            <div className="absolute top-2 right-2 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded z-10">
                                Modo edición
                            </div>
                        </div>
                    ) : (
                        <div className="h-full overflow-auto p-4">
                            <pre className="language-python" style={{
                                margin: 0,
                                padding: '16px',
                                backgroundColor: '#1a1a1a',
                                color: '#f8f8f2',
                                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                fontSize: '14px',
                                lineHeight: '1.5',
                                overflow: 'auto'
                            }}>
                                <code dangerouslySetInnerHTML={{
                                    __html: highlight(editableCode, languages.python, 'python')
                                }} />
                            </pre>
                        </div>
                    )}
                </div>

                <div className="mt-4 flex justify-between">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                            isEditing
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        }`}
                    >
                        {isEditing ? 'Vista previa' : 'Editar código'}
                    </button>
                    
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
                        >
                            Cerrar
                        </button>
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                        >
                            Descargar {isEditing ? 'modificado' : 'archivo'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
