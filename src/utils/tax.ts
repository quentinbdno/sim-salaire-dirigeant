// src/utils/tax.ts
import type { TaxBracket } from '../config/taxes.config'

export function calcProgressiveTax(base: number, brackets: TaxBracket[]): number {
  if (!Number.isFinite(base) || base <= 0 || brackets.length === 0) return 0

  const sorted = [...brackets].sort((a, b) => a.seuil - b.seuil)
  let tax = 0

  for (let i = 0; i < sorted.length; i++) {
    const cur = sorted[i]! // <-- garanti par i < length
    const upper = i + 1 < sorted.length ? sorted[i + 1]!.seuil : Infinity

    const width = Math.min(base, upper) - cur.seuil
    if (width > 0) tax += width * cur.taux
    if (base <= upper) break
  }

  return Math.max(0, Math.round(tax * 100) / 100)
}
