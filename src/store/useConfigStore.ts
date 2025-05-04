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
}

type ConfigState = {
    kpis: KpiConfig[]
    data_type_id: string

    addKpi: () => void
    updateKpi: (index: number, data: Partial<KpiConfig>) => void
    removeKpi: (index: number) => void
    updateGlobal: (data: Partial<Omit<ConfigState, 'kpis' | 'addKpi' | 'updateKpi' | 'removeKpi'>>) => void
    getConfigJson: () => any
}

export const useConfigStore = create<ConfigState>((set, get) => ({
    kpis: [],
    data_type_id: '16',

    addKpi: () =>
        set((state) => ({
            kpis: [
                ...state.kpis,
                {
                    kpi: '',
                    file_prefix: '',
                    extension: '.xlsx',
                    skiprows: 0,
                    original_required_columns: [],
                    rename_map: {},
                    separator: ',',        // default por KPI
                    encoding: 'utf-8'      // default por KPI
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
        const { kpis, data_type_id } = get()
        return {
            kpis,
            data_type_id,
        }
    }
}))
