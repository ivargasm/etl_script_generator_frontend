import React from 'react'
import { useConfigStore } from '../store/useConfigStore'

export const GlobalSettings: React.FC = () => {
    const { data_type_id, output_name_prefix, separator, encoding, updateGlobal } = useConfigStore()

    return (
        <div className="bg-primary dark:bg-secondary shadow rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Configuración Global</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Data Type ID</label>
                    <input
                        type="text"
                        value={data_type_id}
                        onChange={(e) => updateGlobal({ data_type_id: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Prefijo nombre archivo</label>
                    <input
                        type="text"
                        value={output_name_prefix}
                        onChange={(e) => updateGlobal({ output_name_prefix: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Separador</label>
                    <input
                        type="text"
                        value={separator}
                        onChange={(e) => updateGlobal({ separator: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Encoding</label>
                    <input
                        type="text"
                        value={encoding}
                        onChange={(e) => updateGlobal({ encoding: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}
