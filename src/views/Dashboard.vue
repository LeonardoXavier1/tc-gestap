<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Bem-vindo, {{ user?.name }}!
        </h1>
        <p class="text-gray-600">
          {{ welcomeMessage }}
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Total de Alunos
                </dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats.totalStudents }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Propostas Entregues
                </dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats.proposalsSubmitted }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Prazos Próximos
                </dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats.upcomingDeadlines }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Atrasos
                </dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats.overdueItems }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Atividade Recente
        </h3>
        <div class="flow-root">
          <ul class="-mb-8">
            <li v-for="(activity, index) in recentActivities" :key="index">
              <div class="relative pb-8">
                <span v-if="index !== recentActivities.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                <div class="relative flex space-x-3">
                  <div>
                    <span class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white" :class="activity.iconBg">
                      <component :is="activity.icon" class="h-5 w-5" :class="activity.iconColor" />
                    </span>
                  </div>
                  <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p class="text-sm text-gray-500">
                        {{ activity.description }}
                      </p>
                    </div>
                    <div class="text-right text-sm whitespace-nowrap text-gray-500">
                      {{ activity.time }}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div v-if="userRole === 'coordenador'" class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Ações Rápidas
        </h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <router-link
            to="/alunos"
            class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-gray-200 hover:border-gray-300"
          >
            <div>
              <span class="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </span>
            </div>
            <div class="mt-8">
              <h3 class="text-lg font-medium">
                <span class="absolute inset-0" aria-hidden="true"></span>
                Gerenciar Alunos
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                Cadastrar e gerenciar alunos matriculados no TC.
              </p>
            </div>
          </router-link>

          <router-link
            to="/cronograma"
            class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-gray-200 hover:border-gray-300"
          >
            <div>
              <span class="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </span>
            </div>
            <div class="mt-8">
              <h3 class="text-lg font-medium">
                <span class="absolute inset-0" aria-hidden="true"></span>
                Definir Cronograma
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                Configurar prazos e cronograma do semestre.
              </p>
            </div>
          </router-link>

          <router-link
            to="/banca"
            class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-gray-200 hover:border-gray-300"
          >
            <div>
              <span class="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </span>
            </div>
            <div class="mt-8">
              <h3 class="text-lg font-medium">
                <span class="absolute inset-0" aria-hidden="true"></span>
                Banca Avaliadora
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                Definir professores da banca avaliadora.
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useStudentsStore } from '../stores/students'
import { useScheduleStore } from '../stores/schedule'

const authStore = useAuthStore()
const studentsStore = useStudentsStore()
const scheduleStore = useScheduleStore()

const user = computed(() => authStore.user)
const userRole = computed(() => authStore.userRole)

const welcomeMessage = computed(() => {
  const messages = {
    coordenador: 'Gerencie o sistema de TC e acompanhe o progresso dos alunos.',
    professor: 'Acompanhe seus alunos orientandos e lance notas.',
    aluno: 'Acompanhe o progresso do seu TC e cronograma.'
  }
  return messages[userRole.value] || 'Bem-vindo ao sistema de gestão de TC.'
})

const stats = computed(() => {
  const totalStudents = studentsStore.students.length
  const deadlineStatus = scheduleStore.getDeadlineStatus
  
  return {
    totalStudents,
    proposalsSubmitted: 2, // Mock data
    upcomingDeadlines: Object.values(deadlineStatus).filter(status => status.status === 'warning').length,
    overdueItems: Object.values(deadlineStatus).filter(status => status.status === 'overdue').length
  }
})

const recentActivities = computed(() => {
  const activities = [
    {
      description: 'Nova proposta entregue por Ana Silva',
      time: '2 horas atrás',
      icon: 'svg',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      description: 'Reunião de orientação agendada para Carlos Oliveira',
      time: '4 horas atrás',
      icon: 'svg',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      description: 'Notas lançadas para Mariana Costa',
      time: '1 dia atrás',
      icon: 'svg',
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    }
  ]
  
  return activities
})
</script>
