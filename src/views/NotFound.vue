<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="mx-auto h-24 w-24 text-gray-400">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h1 class="mt-4 text-6xl font-bold text-gray-900">404</h1>
      <h2 class="mt-2 text-2xl font-semibold text-gray-700">Página não encontrada</h2>
      <p class="mt-2 text-gray-600">A página que você está procurando não existe.</p>
      <div class="mt-6">
        <router-link
          to="/"
          class="btn-primary"
        >
          Voltar ao Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Página 404 simples
</script>
