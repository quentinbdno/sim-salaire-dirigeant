import { createRouter, createWebHistory } from 'vue-router'
import SalaryCalculator from '../views/SalaryCalculator.vue'
import Parametres from '../views/Parametres.vue'

const routes = [
  { path: '/', redirect: '/saisie' },
  { path: '/saisie', name: 'Saisie', component: SalaryCalculator },
  { path: '/parametres', name: 'Parametres', component: Parametres },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
