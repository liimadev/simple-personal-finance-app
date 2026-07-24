import { create } from "zustand";

export const useValoresOcultosStore = create ((set) => ({
    valoresOcultos: false,

    setValoresOcultos: (valor) => set({ valoresOcultos: valor }),

    toggleValoresOcultos: () => set((state) => ({ valoresOcultos: !state.valoresOcultos }))
}))