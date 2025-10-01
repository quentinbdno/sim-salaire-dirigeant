export type TaxBracket = {
  seuil: number; // seuil inférieur du palier (en € / an)
  taux: number;  // ex: 0.11 pour 11%
};

export const defaultIR: TaxBracket[] = [
  { seuil: 0, taux: 0 },
  { seuil: 10777, taux: 0.11 },
  { seuil: 27478, taux: 0.30 },
  { seuil: 78570, taux: 0.41 },
  { seuil: 168994, taux: 0.45 },
];

export const defaultIS: TaxBracket[] = [
  { seuil: 0, taux: 0.15 },  // ex: taux réduit PME
  { seuil: 42500, taux: 0.25 }, // taux normal
];
