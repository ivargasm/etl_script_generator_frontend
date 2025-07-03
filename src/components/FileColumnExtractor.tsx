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
    const [previewRows, setPreviewRows] = useState<string[][]>([])

    const loadSheetData = (sheetName: string) => {
        if (!workbook) return
        const worksheet = workbook.worksheets.find(ws => ws.name === sheetName)
        if (!worksheet) return

        const headerRow = worksheet.getRow(1)
        const headers: string[] = []
        headerRow.eachCell((cell) => {
            if (typeof cell.value === 'string') headers.push(cell.value)
        })
        onExtractColumns(headers)

        const preview: string[][] = []
        worksheet.eachRow({ includeEmpty: true }, (row, rowNum) => {
            if (rowNum > 5) return
            const valuesArray = Array.isArray(row.values) ? row.values : [];
            const rowData = valuesArray.slice(1).map((cell: any) => {
                if (cell instanceof Date) {
                    return cell.toLocaleDateString('es-MX') // o 'en-GB' para dd/mm/yyyy
                }

                if (typeof cell === 'object' && cell !== null) {
                    return cell.text ?? cell.formula ?? cell.result ?? ''
                }

                return cell?.toString() ?? ''
            })

            preview.push(rowData)
        })

        setPreviewRows(preview)
    }

    useEffect(() => {
        if (selectedSheet && workbook) {
            loadSheetData(selectedSheet)
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
                    const preview = results.data.slice(0, 5) as any[]
                    setPreviewRows(preview.map(row => Object.values(row).map(String)))
                },
                error: (err) => console.error('Error al parsear CSV/TXT:', err.message),
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
                if (sheets.length === 1) {
                    setSelectedSheet(sheets[0])
                    loadSheetData(sheets[0])
                } else {
                    setSelectedSheet(sheets[0])
                }
            }

            reader.readAsArrayBuffer(file)
        } else {
            alert('Formato no compatible. Usa .csv, .txt o .xlsx')
        }
    }

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">Sube un archivo de ejemplo</label>
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
                            <label className="block text-sm font-medium text-orange-600">Selecciona la hoja</label>
                            <select
                                value={selectedSheet}
                                onChange={(e) => setSelectedSheet(e.target.value)}
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

            {previewRows.length > 0 && (
                <div className="overflow-auto border rounded max-h-80">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                {previewRows[0]?.map((_, i) => (
                                    <th key={i} className="px-2 py-1 border text-left">Col {i + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {previewRows.map((row, i) => (
                                <tr key={i}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="px-2 py-1 border">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
