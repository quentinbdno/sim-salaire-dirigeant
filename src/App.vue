<script setup lang="ts"></script>

<template>
  <header class="topbar">
    <nav class="nav">
      <RouterLink to="/saisie" class="link" active-class="active">Saisie</RouterLink>
      <RouterLink to="/parametres" class="link" active-class="active">Paramètres</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.topbar { position: sticky; top:0; z-index:10; background:#fff; border-bottom:1px solid #eee; }

/* conteneur */
.nav {
  max-width: 980px;
  margin: 0 auto;
  padding: .75rem 1rem;
  display: flex;
  gap: .5rem;
}

/* chaque onglet prend la même place */
.link {
  flex: 1 1 0;            /* <= égalise la largeur */
  display: block;
  text-align: center;
  padding: .55rem 1rem;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  text-decoration: none;
  color: #374151;
  background: #fff;
}

.link.active {
  background:#111827;
  color:#fff;
  border-color:#111827;
}

main { min-height: calc(100vh - 48px); background:#fafafa; }
</style>

