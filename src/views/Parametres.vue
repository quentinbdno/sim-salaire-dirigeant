<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TaxBracket } from '../config/taxes.config'
import { useParamsStore } from '../stores/params'

const store = useParamsStore()
const ir = ref<TaxBracket[]>([...store.irSorted])
const is = ref<TaxBracket[]>([...store.isSorted])

function addLine(list: 'ir'|'is') { (list === 'ir' ? ir : is).value.push({ seuil: 0, taux: 0 }) }
function removeLine(list: 'ir'|'is', idx: number) { (list === 'ir' ? ir : is).value.splice(idx, 1) }
function save() { store.setIR(ir.value); store.setIS(is.value) }
function resetIR() { store.resetIR(); ir.value = [...store.irSorted] }
function resetIS() { store.resetIS(); is.value = [...store.isSorted] }

watch(() => store.irSorted, v => ir.value = [...v])
watch(() => store.isSorted, v => is.value = [...v])

function fmtTaux(v:number){ return (v*100).toLocaleString('fr-FR', {maximumFractionDigits: 2}) }
</script>

<template>
  <div class="container">
    <h1 class="page-title">Paramètres</h1>

    <!-- IR -->
    <section class="card">
      <h2>Barème IR</h2>
      <div class="rows">
        <div class="row" v-for="(b, i) in ir" :key="`ir-${i}`">
          <div class="field">
            <label class="lbl">Seuil (≥)</label>
            <input type="number" v-model.number="b.seuil" min="0" step="500" />
          </div>
          <div class="field">
            <label class="lbl">Taux</label>
            <div class="rate">
              <input type="number" v-model.number="b.taux" min="0" max="1" step="0.005" />
              <span class="pct">({{ fmtTaux(b.taux) }}%)</span>
            </div>
          </div>
          <button class="icon" @click="removeLine('ir', i)" aria-label="Supprimer">✕</button>
        </div>
      </div>
      <div class="actions">
        <button @click="addLine('ir')">+ Ajouter un palier</button>
        <div class="right">
          <button class="ghost" @click="resetIR()">Réinitialiser</button>
          <button class="primary" @click="save()">Enregistrer</button>
        </div>
      </div>
    </section>

    <!-- IS -->
    <section class="card">
      <h2>Barème IS</h2>
      <div class="rows">
        <div class="row" v-for="(b, i) in is" :key="`is-${i}`">
          <div class="field">
            <label class="lbl">Seuil (≥)</label>
            <input type="number" v-model.number="b.seuil" min="0" step="500" />
          </div>
          <div class="field">
            <label class="lbl">Taux</label>
            <div class="rate">
              <input type="number" v-model.number="b.taux" min="0" max="1" step="0.005" />
              <span class="pct">({{ fmtTaux(b.taux) }}%)</span>
            </div>
          </div>
          <button class="icon" @click="removeLine('is', i)" aria-label="Supprimer">✕</button>
        </div>
      </div>
      <div class="actions">
        <button @click="addLine('is')">+ Ajouter un palier</button>
        <div class="right">
          <button class="ghost" @click="resetIS()">Réinitialiser</button>
          <button class="primary" @click="save()">Enregistrer</button>
        </div>
      </div>
    </section>

    <p class="hint">Les paliers sont interprétés comme des <b>seuils inférieurs</b> croissants. Le dernier palier est ouvert.</p>
  </div>
</template>

<style scoped>
h2 { font-size: 1.15rem; margin: 0 0 .6rem; text-align: center; }

.rows { display: flex; flex-direction: column; gap: .6rem; }

/* === LIGNE === */
.row {
  display: grid;
  grid-template-columns: minmax(0,1fr) minmax(0,1fr) 56px; /* seuil | taux | bouton */
  gap: .75rem;
  align-items: end;
  padding: .6rem;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  background: #fcfcfd;
}
.row > .field { min-width: 0; } /* autorise le shrink dans la grille */

.field .lbl { font-size: .85rem; color: #6b7280; display: block; margin-bottom: .25rem; }

input {
  width: 100%;
  padding: .55rem .65rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #fff;
}

/* === Champ TAUX : grille interne 1fr | auto === */
.rate {
  display: grid;
  grid-template-columns: minmax(0,1fr) auto;
  align-items: center;
  gap: .5rem;
  min-width: 0;
}
.rate input { min-width: 0; }          /* l’input peut rétrécir */
.pct { white-space: nowrap; }          /* le % reste sur une ligne et ne pousse pas */

.icon {
  justify-self: end;
  width: 56px; height: 40px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
}
.icon:hover { background: #f3f4f6; }

.actions { display:flex; align-items:center; justify-content: space-between; margin-top: .8rem; }
.right { display:flex; gap:.5rem; }
button { padding:.55rem .8rem; border-radius: 10px; border:1px solid #ddd; background:#f9f9f9; cursor:pointer; }
button.primary { background:#111827; color:#fff; border-color:#111827; }
button.ghost { background:transparent; }

.hint { color:#6b7280; margin:.5rem 0 0; }

/* Empile plus tôt si besoin (<= 1100px) */
@media (max-width: 1100px) {
  .row {
    grid-template-columns: 1fr 56px;
    align-items: start;
  }
  .row .field:nth-child(1),
  .row .field:nth-child(2) { grid-column: 1 / -1; }
}

/* Très petits écrans : cacher l’affichage (%) pour gagner de la place */
@media (max-width: 480px) {
  .pct { display: none; }
}
</style>
