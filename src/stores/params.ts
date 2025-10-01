import { defineStore } from 'pinia'
import type { TaxBracket } from '../config/taxes.config'
import { defaultIR, defaultIS } from '../config/taxes.config'

type ParamsState = { ir: TaxBracket[]; is: TaxBracket[] }
const STORAGE_KEY = 'sim-salaire-dirigeant.params.v1'

function loadFromStorage(): ParamsState | null {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : null } catch { return null }
}
function persist(state: ParamsState) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }
function sanitize(brackets: TaxBracket[]) {
  return brackets
    .filter(b => Number.isFinite(b.seuil) && b.seuil >= 0 && Number.isFinite(b.taux) && b.taux >= 0)
    .map(b => ({ seuil: Math.round(b.seuil), taux: Math.round(b.taux * 1000) / 1000 }))
}
const asKey = (s: ParamsState) => JSON.stringify({
  ir: [...s.ir].sort((a,b)=>a.seuil-b.seuil),
  is: [...s.is].sort((a,b)=>a.seuil-b.seuil),
})

export const useParamsStore = defineStore('params', {
  state: (): ParamsState => loadFromStorage() ?? ({ ir: defaultIR, is: defaultIS }),
  actions: {
    setIR(brackets: TaxBracket[]) { this.ir = sanitize(brackets); persist(this.$state) },
    setIS(brackets: TaxBracket[]) { this.is = sanitize(brackets); persist(this.$state) },
    resetIR() { this.ir = [...defaultIR]; persist(this.$state) },
    resetIS() { this.is = [...defaultIS]; persist(this.$state) },
    clearCustom() { // reviennent aux “usine” et supprime la sauvegarde
      localStorage.removeItem(STORAGE_KEY)
      this.ir = [...defaultIR]
      this.is = [...defaultIS]
    },
    importJSON(json: string) {
      const obj = JSON.parse(json)
      if (!obj?.ir || !obj?.is) throw new Error('Fichier invalide')
      this.setIR(obj.ir); this.setIS(obj.is)
    },
    exportJSON(): string {
      return JSON.stringify({ ir: this.ir, is: this.is }, null, 2)
    },
  },
  getters: {
    irSorted: (s) => [...s.ir].sort((a,b)=>a.seuil-b.seuil),
    isSorted: (s) => [...s.is].sort((a,b)=>a.seuil-b.seuil),
    isCustomized: (s) => asKey(s) !== asKey({ ir: defaultIR, is: defaultIS }),
  }
})
