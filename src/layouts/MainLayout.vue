<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <div class="flex h-16 items-center justify-center border-b border-gray-200">
        <h1 class="text-xl font-bold text-primary-600">TC Gestão</h1>
      </div>
      
      <nav class="mt-8 px-4">
        <div class="space-y-2">
          <router-link
            to="/"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="$route.name === 'Dashboard' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
            </svg>
            Dashboard
          </router-link>

          <!-- Coordenador -->
          <template v-if="userRole === 'coordenador'">
            <router-link
              to="/alunos"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="$route.name === 'Alunos' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              Alunos
            </router-link>

            <router-link
              to="/professores"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="$route.name === 'Professores' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              Professores
            </router-link>

            <router-link
              to="/cronograma"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="$route.name === 'Cronograma' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Cronograma
            </router-link>

            <router-link
              to="/banca"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="$route.name === 'Banca' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Banca Avaliadora
            </router-link>
          </template>

          <!-- Professor -->
          <template v-if="userRole === 'professor'">
            <router-link
              to="/alunos"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="$route.name === 'Alunos' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              Meus Alunos
            </router-link>
          </template>

          <!-- Professor e Coordenador -->
          <template v-if="userRole === 'professor' || userRole === 'coordenador'">
            <router-link
              to="/notas"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="$route.name === 'Notas' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Notas
            </router-link>

            <router-link
              to="/reunioes"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="$route.name === 'Reuniões' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Reuniões
            </router-link>
          </template>

          <!-- Aluno -->
          <template v-if="userRole === 'aluno'">
            <router-link
              to="/meu-tc"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="$route.name === 'MeuTC' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Meu TC
            </router-link>

            <router-link
              to="/meus-comentarios"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="$route.name === 'MeusComentarios' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Meus Comentários
            </router-link>

            <router-link
              to="/sugerir-professores"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="$route.name === 'ProfessorSuggestions' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Sugerir Professores
            </router-link>
          </template>
        </div>
      </nav>
    </div>

    <!-- Main content -->
    <div class="pl-64">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex h-16 items-center justify-between px-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">{{ pageTitle }}</h2>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-700">
              Olá, <span class="font-medium">{{ user?.name }}</span>
            </div>
            <button
              @click="logout"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Sair
            </button>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const userRole = computed(() => authStore.userRole)

const pageTitle = computed(() => {
  const routeNames = {
    'Dashboard': 'Dashboard',
    'Alunos': 'Alunos',
    'Professores': 'Professores',
    'Cronograma': 'Cronograma',
    'Banca': 'Banca Avaliadora',
    'Notas': 'Notas',
    'Reuniões': 'Reuniões',
    'MeuTC': 'Meu TC',
    'MeusComentarios': 'Meus Comentários',
    'ProfessorSuggestions': 'Sugerir Professores'
  }
  return routeNames[router.currentRoute.value.name] || 'TC Gestão'
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
