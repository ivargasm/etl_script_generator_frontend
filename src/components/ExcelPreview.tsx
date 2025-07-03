// components/ExcelPreview.tsx
import React, { useState } from 'react'
import { Workbook } from 'exceljs'

export default function ExcelPreview() {
    const [fileName, setFileName] = useState<string | null>(null)
    const [previewRows, setPreviewRows] = useState<string[][]>([])
    const [sheetNames, setSheetNames] = useState<string[]>([])
    const [selectedSheet, setSelectedSheet] = useState<string | null>(null)
    const [workbook, setWorkbook] = useState<Workbook | null>(null)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setFileName(file.name)

        const reader = new FileReader()
        reader.onload = async (event) => {
            const buffer = event.target?.result
            if (!buffer) return

            const wb = new Workbook()
            await wb.xlsx.load(buffer as ArrayBuffer)

            setWorkbook(wb)

            const names = wb.worksheets.map((ws) => ws.name)
            setSheetNames(names)
            setSelectedSheet(names[0])
            loadSheetPreview(wb, names[0])
        }

        reader.readAsArrayBuffer(file)
    }

    const loadSheetPreview = (wb: Workbook, sheetName: string) => {
        const worksheet = wb.getWorksheet(sheetName)
        const preview: string[][] = []

        worksheet?.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if (rowNumber > 5) return
            const rowData = ((row.values ?? []) as any[]).slice(1).map((cell: any) =>
                typeof cell === 'object' && cell !== null
                    ? cell.text ?? cell.formula ?? cell.result ?? ''
                    : cell?.toString() ?? ''
            )
            preview.push(rowData)
        })

        setPreviewRows(preview)
    }

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-white dark:bg-gray-900">
            <label className="block font-medium">Vista previa de archivo Excel</label>
            <input type="file" accept=".xlsx" onChange={handleFileUpload} className="input" />

            {fileName && sheetNames.length > 0 && (
                <>
                    <div className="flex items-center gap-2 mt-2">
                        <label className="text-sm">Hoja:</label>
                        <select
                            value={selectedSheet || ''}
                            onChange={(e) => {
                                const name = e.target.value
                                setSelectedSheet(name)
                                if (workbook) loadSheetPreview(workbook, name)
                            }}
                            className="input"
                        >
                            {sheetNames.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {previewRows.length > 0 && (
                        <div className="overflow-auto border rounded max-h-80 mt-4">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-200 dark:bg-gray-700">
                                    <tr>
                                        {previewRows[0]?.map((_, i) => (
                                            <th key={i} className="px-2 py-1 border text-left">
                                                Col {i + 1}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewRows.map((row, i) => (
                                        <tr key={i}>
                                            {row.map((cell, j) => (
                                                <td key={j} className="px-2 py-1 border">
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
