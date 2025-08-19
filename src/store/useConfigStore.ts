import { create } from 'zustand'

export type KpiConfig = {
    kpi: string
    file_prefix: string
    extension: string
    skiprows: number
    original_required_columns: string[]
    rename_map: Record<string, string>
    separator: string
    encoding: string
    clean_fields: string[]
    sheet_name?: string
    date_format_example?: string
    has_headers: boolean
    manual_headers: string[]
}

export type DatabaseConfig = {
    enabled: boolean
    aurora: boolean
    redshift: boolean
}

type ConfigState = {
    kpis: KpiConfig[]
    data_type_id: string
    database_config: DatabaseConfig

    addKpi: () => void
    updateKpi: (index: number, data: Partial<KpiConfig>) => void
    removeKpi: (index: number) => void
    updateGlobal: (data: Partial<Omit<ConfigState, 'kpis' | 'addKpi' | 'updateKpi' | 'removeKpi' | 'getConfigJson'>>) => void
    getConfigJson: () => any
}

export const useConfigStore = create<ConfigState>((set, get) => ({
    kpis: [],
    data_type_id: '16',
    database_config: {
        enabled: false,
        aurora: false,
        redshift: false
    },

    addKpi: () =>
        set((state) => ({
            kpis: [
                ...state.kpis,
                {
                    kpi: 'sellout',
                    file_prefix: '',
                    extension: '.xlsx',
                    skiprows: 0,
                    original_required_columns: [],
                    rename_map: {},
                    separator: ',',        // default por KPI
                    encoding: 'utf-8',      // default por KPI
                    clean_fields: [],
                    sheet_name: "",  // default por KPI
                    date_format_example: "yyyymmdd", // default por KPI
                    has_headers: true,
                    manual_headers: []
                }
            ]
        })),

    updateKpi: (index, data) =>
        set((state) => {
            const updated = [...state.kpis]
            updated[index] = { ...updated[index], ...data }
            return { kpis: updated }
        }),

    removeKpi: (index) =>
        set((state) => {
            const updated = [...state.kpis]
            updated.splice(index, 1)
            return { kpis: updated }
        }),

    updateGlobal: (data) => set((state) => ({ ...state, ...data })),

    getConfigJson: () => {
        const { kpis, data_type_id, database_config } = get()
        const pythonCompatibleKpis = kpis.map(kpi => ({
            ...kpi,
            has_headers: kpi.has_headers ? 'True' : 'False'
        }))
        const pythonCompatibleDbConfig = {
            enabled: database_config.enabled ? 'True' : 'False',
            aurora: database_config.aurora ? 'True' : 'False',
            redshift: database_config.redshift ? 'True' : 'False'
        }
        return {
            kpis: pythonCompatibleKpis,
            data_type_id,
            database_config: pythonCompatibleDbConfig
        }
    }
}))
