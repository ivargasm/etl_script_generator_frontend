import React, { useEffect, useState } from 'react'
import { Workbook } from 'exceljs'
import Papa from 'papaparse'

interface Props {
    onExtractColumns: (columns: string[]) => void
}

export default function FileColumnExtractor({ onExtractColumns }: Props) {
    const [fileName, setFileName] = useState<string | null>(null)
    const [selectedSheet, setSelectedSheet] = useState<string | undefined>(undefined)
    const [availableSheets, setAvailableSheets] = useState<string[]>([])
    const [workbook, setWorkbook] = useState<Workbook | null>(null)

    const loadSheetColumns = (sheetName: string) => {
        if (workbook) {
            const worksheet = workbook.worksheets.find(ws => ws.name === sheetName)
            if (worksheet) {
                const headerRow = worksheet.getRow(1)
                const headers: string[] = []
                headerRow.eachCell((cell) => {
                    if (typeof cell.value === 'string') {
                        headers.push(cell.value)
                    }
                })
                onExtractColumns(headers)
            }
        }
    }

    useEffect(() => {
        if (selectedSheet && workbook) {
            loadSheetColumns(selectedSheet)
        }
    }, [selectedSheet, workbook])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setFileName(file.name)
        const fileExt = file.name.split('.').pop()?.toLowerCase()

        if (fileExt === 'csv' || fileExt === 'txt') {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    onExtractColumns(results.meta.fields || [])
                },
                error: (err) => {
                    console.error('Error al parsear CSV/TXT:', err.message)
                },
            })
        } else if (fileExt === 'xlsx') {
            const reader = new FileReader()
            reader.onload = async (event) => {
                const arrayBuffer = event.target?.result
                if (!arrayBuffer) return

                const newWorkbook = new Workbook()
                await newWorkbook.xlsx.load(arrayBuffer as ArrayBuffer)
                setWorkbook(newWorkbook)
                const sheets = newWorkbook.worksheets.map(ws => ws.name)
                setAvailableSheets(sheets)
                
                if (sheets.length > 1) {
                    // Si hay múltiples hojas, mostramos el selector
                    setSelectedSheet(sheets[0])
                } else {
                    // Si hay una sola hoja, extraemos directamente
                    const worksheet = newWorkbook.worksheets[0]
                    const headerRow = worksheet.getRow(1)
                    const headers: string[] = []

                    headerRow.eachCell((cell) => {
                        if (typeof cell.value === 'string') {
                            headers.push(cell.value)
                        }
                    })

                    onExtractColumns(headers)
                }
            }

            reader.readAsArrayBuffer(file)
        } else {
            alert('Formato de archivo no compatible. Usa .csv, .txt o .xlsx')
        }
    }

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
                Sube un archivo de ejemplo
            </label>
            <input
                type="file"
                accept=".csv,.txt,.xlsx"
                onChange={handleFileUpload}
                className="input"
            />
            {fileName && (
                <div>
                    <p className="text-sm text-muted">Archivo cargado: {fileName}</p>
                    {availableSheets.length > 1 && (
                        <div className="mt-2">
                            <label className="block text-sm font-medium text-orange-600">
                                Selecciona la hoja a usar
                            </label>
                            <select
                                value={selectedSheet}
                                onChange={(e) => {
                                    const sheetName = e.target.value as string
                                    setSelectedSheet(sheetName)
                                }}
                                className="input"
                            >
                                {availableSheets.map(sheet => (
                                    <option key={sheet} value={sheet}>{sheet}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
