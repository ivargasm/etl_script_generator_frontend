import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Settings, Pencil, Trash2, Terminal } from 'lucide-react'

const Section = ({ icon: Icon, title, description }: { icon: any; title: string; description: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-light-contrast dark:bg-dark-contrast p-6 rounded-2xl shadow-md border border-border space-y-3"
    >
        <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-primary dark:text-accent" />
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
        </div>
        <div className="text-md text-muted-foreground space-y-1">{description}</div>
    </motion.div>
)

export default function TutorialPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold text-center text-foreground"
            >
                🧩 Cómo usar el Generador ETL
            </motion.h1>

            <Section
                icon={Settings}
                title="1. Configuración General"
                description={
                    <ul className="list-disc ml-5 space-y-1">
                        <li><strong>KPI</strong>: Tipo de indicador (sellout, stock, etc.).</li>
                        <li><strong>file_prefix</strong>: Parte del nombre del archivo para identificarlo.</li>
                        <li><strong>Extensión</strong>: .csv, .xlsx, .txt.</li>
                        <li><strong>skiprows</strong>: Número de filas que ignorar (Excel).</li>
                        <li><strong>separator</strong>: Solo para .csv o .txt (ej: , | ;).</li>
                        <li><strong>encoding</strong>: Codificación del archivo (ej: utf-8).</li>
                        <li><strong>data_type_id</strong>: Por defecto es 16.</li>
                    </ul>
                }
            />

            <Section
                icon={FileText}
                title="2. Selección de Columnas"
                description={
                    <>
                        <p>Sube un archivo de prueba para extraer automáticamente las columnas disponibles.</p>
                        <p>Selecciona solo las columnas estrictamente requeridas.</p>
                        <p>Se mostrarán como tarjetas seleccionables.</p>
                    </>
                }
            />

            <Section
                icon={Pencil}
                title="3. Renombrado de Columnas"
                description={
                    <>
                        <p>Aparecerán solo las columnas que seleccionaste como requeridas.</p>
                        <p>No es obligatorio renombrarlas todas, solo las necesarias.</p>
                        <p>El nombre final debe coincidir con el esperado por el sistema.</p>
                    </>
                }
            />

            <Section
                icon={Trash2}
                title="4. Limpieza de Campos"
                description={
                    <>
                        <p>Define qué columnas deseas limpiar de caracteres especiales.</p>
                        <p>Solo aplica a columnas de tipo texto.</p>
                        <p>Útil para eliminar tildes, símbolos o acentos no deseados.</p>
                    </>
                }
            />

            <Section
                icon={Terminal}
                title="5. Generación del Código"
                description={
                    <>
                        <p>Se genera un script Python con toda la configuración.</p>
                        <p>Se puede visualizar y descargar el código directamente.</p>
                        <p>Futuras funciones: ejecutar el script o integrarlo con ChatGPT para personalizaciones.</p>
                    </>
                }
            />
        </div>
    )
}
