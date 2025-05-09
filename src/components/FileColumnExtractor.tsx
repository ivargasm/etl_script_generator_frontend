import React, { useState } from 'react'
import { Workbook } from 'exceljs'
import Papa from 'papaparse'

interface Props {
    onExtractColumns: (columns: string[]) => void
}

export default function FileColumnExtractor({ onExtractColumns }: Props) {
    const [fileName, setFileName] = useState<string | null>(null)

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

                const workbook = new Workbook()
                await workbook.xlsx.load(arrayBuffer as ArrayBuffer)
                const worksheet = workbook.worksheets[0]
                const headerRow = worksheet.getRow(1)
                const headers: string[] = []

                headerRow.eachCell((cell) => {
                    if (typeof cell.value === 'string') {
                        headers.push(cell.value)
                    }
                })

                onExtractColumns(headers)
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
                <p className="text-sm text-muted">Archivo cargado: {fileName}</p>
            )}
        </div>
    )
}
