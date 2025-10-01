<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePublicodes } from '../composables/usePublicodes'
import { useParamsStore } from '../stores/params'
import { calcProgressiveTax } from '../utils/tax'

const params = useParamsStore()
const { statut, brutAnnuel, netAnnuel } = usePublicodes()

// Champs de saisie
const caAnnuel = ref<number>(120000)
const fraisRecuperable = ref<number>(1200)
const fraisDeductible = ref<number>(8000)

// Bénéfice très simplifié (à affiner plus tard)
const benefAvantIS = computed(() => {
  const b = (caAnnuel.value || 0) - (fraisRecuperable.value || 0) - (fraisDeductible.value || 0) - (brutAnnuel.value || 0)
  return Math.max(0, Math.round(b))
})

// Impôts
const impotIS = computed(() => calcProgressiveTax(benefAvantIS.value, params.isSorted))
const baseIR = computed(() => Math.max(0, netAnnuel.value)) // approximation simple
const impotIR = computed(() => calcProgressiveTax(baseIR.value, params.irSorted))

function eur(v?: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v ?? 0)
}
function pct(v?: number) { return new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 1 }).format(v ?? 0) }
</script>

<template>
  <div class="container">
    <h1 class="page-title">Saisie</h1>

    <section class="card grid2">
      <label>
        CA annuel
        <input type="number" v-model.number="caAnnuel" min="0" step="1000" />
      </label>

      <label>
        Salaire brut annuel
        <input type="number" v-model.number="brutAnnuel" min="0" step="500" />
      </label>

      <label class="span2">
        Frais récupérable
        <input type="number" v-model.number="fraisRecuperable" min="0" step="50" />
        <small class="muted">
          Frais affectés à la société mais récupérés directement par vous (Navigo, téléphone, loyer…)
        </small>
      </label>

      <label class="span2">
        Frais déductible
        <input type="number" v-model.number="fraisDeductible" min="0" step="50" />
      </label>

      <label>
        Statut du dirigeant
        <select v-model="statut">
          <option value="assimilé salarié">Assimilé salarié</option>
          <option value="indépendant">Indépendant</option>
        </select>
      </label>

      <div class="info">
        <div class="muted">Net annuel estimé (Simulateur URSSAF)</div>
        <div class="kpi">{{ eur(netAnnuel) }}</div>
      </div>
    </section>

    <section class="card grid3">
      <div class="info">
        <div class="muted">Bénéfice avant IS (simplifié)</div>
        <div class="kpi">{{ eur(benefAvantIS) }}</div>
      </div>
      <div class="info">
        <div class="muted">IS estimé (barème)</div>
        <div class="kpi">{{ eur(impotIS) }}</div>
      </div>
      <div class="info">
        <div class="muted">IR estimé (barème)</div>
        <div class="kpi">{{ eur(impotIR) }}</div>
      </div>
    </section>

    <p class="note">
      ⚠️ Calculs IS/IR volontairement <b>simplifiés</b> pour démarrer (IR basé sur net annuel, IS sur bénéfice
      = CA - frais - salaire brut). On pourra affiner (charges patronales, abattements, quotient, revenus autres…).
    </p>
  </div>
</template>

<style scoped>
.grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
label { display: grid; gap: .4rem; font-weight: 600; }
input, select { padding: .6rem .7rem; border-radius: 10px; border: 1px solid #ccc; }
.muted { color: #6b7280; font-weight: 500; }
.kpi { font-size: 1.4rem; font-weight: 800; }
.info { display:flex; flex-direction: column; gap:.25rem; padding:.8rem; border:1px dashed #eee; border-radius: 10px; }
.note { color:#6b7280; margin:.5rem 0 0; }
.span2 { grid-column: span 2; }
@media (max-width: 860px) { .grid2, .grid3 { grid-template-columns: 1fr; } .span2 { grid-column: auto; } }
</style>
