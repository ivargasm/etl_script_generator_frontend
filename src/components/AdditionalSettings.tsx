import React from 'react'
import { useConfigStore } from '../store/useConfigStore'
import { ToggleSwitch } from './ToggleSwitch'

export const AdditionalSettings: React.FC = () => {
    const { database_config, updateGlobal } = useConfigStore()

    const handleDatabaseToggle = (enabled: boolean) => {
        updateGlobal({
            database_config: {
                ...database_config,
                enabled,
                // Reset selections when disabling
                aurora: enabled ? database_config.aurora : false,
                redshift: enabled ? database_config.redshift : false
            }
        })
    }

    const handleDatabaseTypeChange = (type: 'aurora' | 'redshift', value: boolean) => {
        updateGlobal({
            database_config: {
                ...database_config,
                [type]: value
            }
        })
    }

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4 shadow-md">
            <h3 className="text-lg font-semibold text-primary dark:text-secondary-dark">Configuraciones Adicionales</h3>
            
            <div className="space-y-4">
                <ToggleSwitch
                    id="database-connection"
                    checked={database_config.enabled}
                    onChange={handleDatabaseToggle}
                    label="Agregar conexión a base de datos"
                />

                {database_config.enabled && (
                    <div className="ml-6 space-y-3 border-l-2 border-blue-200 dark:border-blue-600 pl-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Selecciona las bases de datos requeridas:</p>
                        
                        <ToggleSwitch
                            id="aurora-db"
                            checked={database_config.aurora}
                            onChange={(value) => handleDatabaseTypeChange('aurora', value)}
                            label="Aurora"
                        />
                        
                        <ToggleSwitch
                            id="redshift-db"
                            checked={database_config.redshift}
                            onChange={(value) => handleDatabaseTypeChange('redshift', value)}
                            label="Redshift"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}