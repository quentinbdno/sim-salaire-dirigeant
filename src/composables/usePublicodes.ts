import { ref, computed } from 'vue'
import Engine from 'publicodes'
import modeleSocial from 'modele-social'

type StatutDirigeant = 'assimilé salarié' | 'indépendant'

const engine = new Engine(modeleSocial) // 1 instance partagée

export function usePublicodes() {
  const statut = ref<StatutDirigeant>('assimilé salarié')
  const brutAnnuel = ref<number>(48000) // €/an

  function setSituation() {
    engine.setSituation({
      "dirigeant . régime social": `'${statut.value}'`,
      "dirigeant . rémunération . totale": `${brutAnnuel.value} €/an`,
    })
  }

  const netAnnuel = computed(() => {
    setSituation()
    const res = engine.evaluate("dirigeant . rémunération . net")
    return Number(res?.nodeValue ?? 0)
  })

  return { statut, brutAnnuel, netAnnuel }
}
