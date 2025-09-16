<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Meus Comentários</h1>
      <p class="mt-2 text-sm text-gray-700">
        Visualize todos os comentários recebidos dos professores e coordenadores sobre seus trabalhos
      </p>
    </div>

    <!-- Filtros -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label for="phase" class="form-label">Fase</label>
          <select id="phase" v-model="phaseFilter" class="form-input">
            <option value="">Todas as fases</option>
            <option value="proposta">Proposta</option>
            <option value="reelaboracao_proposta">Reelaboração Proposta</option>
            <option value="tc">TC Final</option>
            <option value="reelaboracao_tc">Reelaboração TC</option>
          </select>
        </div>
        <div>
          <label for="criteria" class="form-label">Critério</label>
          <select id="criteria" v-model="criteriaFilter" class="form-input">
            <option value="">Todos os critérios</option>
            <option value="relevancia">Relevância</option>
            <option value="metodologia">Metodologia</option>
            <option value="estrutura">Estrutura</option>
            <option value="linguagem">Linguagem</option>
            <option value="bibliografia">Bibliografia</option>
          </select>
        </div>
        <div>
          <label for="author" class="form-label">Autor</label>
          <select id="author" v-model="authorFilter" class="form-input">
            <option value="">Todos os autores</option>
            <option v-for="author in uniqueAuthors" :key="author" :value="author">
              {{ author }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total de Comentários</dt>
                <dd class="text-lg font-medium text-gray-900">{{ filteredComments.length }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Professores</dt>
                <dd class="text-lg font-medium text-gray-900">{{ professorCommentsCount }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Coordenadores</dt>
                <dd class="text-lg font-medium text-gray-900">{{ coordinatorCommentsCount }}</dd>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Critérios Avaliados</dt>
                <dd class="text-lg font-medium text-gray-900">{{ evaluatedCriteriaCount }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Comentários -->
    <div v-if="filteredComments.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum comentário encontrado</h3>
      <p class="mt-1 text-sm text-gray-500">
        {{ allComments.length === 0 
          ? 'Você ainda não recebeu comentários dos professores.' 
          : 'Tente ajustar os filtros para encontrar comentários.' 
        }}
      </p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="comment in filteredComments"
        :key="comment.id"
        class="bg-white shadow rounded-lg overflow-hidden"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ getCriteriaLabel(comment.criteria) }}
                </h3>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                      :class="getPhaseClass(comment.grade?.phase)">
                  {{ getPhaseLabel(comment.grade?.phase) }}
                </span>
              </div>
              
              <div class="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                <div class="flex items-center">
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  {{ comment.authorName }}
                </div>
                <div class="flex items-center">
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ formatDate(comment.createdAt) }}
                </div>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" 
                      :class="getAuthorRoleClass(comment.authorRole)">
                  {{ getAuthorRoleLabel(comment.authorRole) }}
                </span>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-gray-700">{{ comment.comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useStudentsStore } from '../stores/students'
import { useCriteriaCommentsStore } from '../stores/criteriaComments'
import { useGradesStore } from '../stores/grades'

const authStore = useAuthStore()
const studentsStore = useStudentsStore()
const criteriaCommentsStore = useCriteriaCommentsStore()
const gradesStore = useGradesStore()

const phaseFilter = ref('')
const criteriaFilter = ref('')
const authorFilter = ref('')

// Obter informações do aluno atual
const currentStudent = computed(() => {
  // Em um sistema real, você buscaria o aluno pelo ID do usuário logado
  // Por simplicidade, vamos usar o primeiro aluno como exemplo
  return studentsStore.students[0] || null
})

// Obter todos os comentários do aluno
const allComments = computed(() => {
  if (!currentStudent.value) return []
  return criteriaCommentsStore.getCommentsByStudent(currentStudent.value.id)
})

// Obter comentários filtrados
const filteredComments = computed(() => {
  let filtered = allComments.value

  if (phaseFilter.value) {
    filtered = filtered.filter(comment => {
      const grade = gradesStore.grades.find(g => g.id === comment.gradeId)
      return grade && grade.phase === phaseFilter.value
    })
  }

  if (criteriaFilter.value) {
    filtered = filtered.filter(comment => comment.criteria === criteriaFilter.value)
  }

  if (authorFilter.value) {
    filtered = filtered.filter(comment => comment.authorName === authorFilter.value)
  }

  return filtered
})

// Obter autores únicos
const uniqueAuthors = computed(() => {
  const authors = [...new Set(allComments.value.map(comment => comment.authorName))]
  return authors.sort()
})

// Estatísticas
const professorCommentsCount = computed(() => {
  return allComments.value.filter(comment => comment.authorRole === 'professor').length
})

const coordinatorCommentsCount = computed(() => {
  return allComments.value.filter(comment => comment.authorRole === 'coordenador').length
})

const evaluatedCriteriaCount = computed(() => {
  const criteria = new Set(allComments.value.map(comment => comment.criteria))
  return criteria.size
})

// Funções auxiliares
const getCriteriaLabel = (criteria) => {
  const labels = {
    relevancia: 'Relevância',
    metodologia: 'Metodologia',
    estrutura: 'Estrutura',
    linguagem: 'Linguagem',
    bibliografia: 'Bibliografia'
  }
  return labels[criteria] || criteria
}

const getPhaseLabel = (phase) => {
  const labels = {
    proposta: 'Proposta',
    reelaboracao_proposta: 'Reelaboração Proposta',
    tc: 'TC Final',
    reelaboracao_tc: 'Reelaboração TC'
  }
  return labels[phase] || phase
}

const getPhaseClass = (phase) => {
  const classes = {
    proposta: 'bg-blue-100 text-blue-800',
    reelaboracao_proposta: 'bg-yellow-100 text-yellow-800',
    tc: 'bg-green-100 text-green-800',
    reelaboracao_tc: 'bg-purple-100 text-purple-800'
  }
  return classes[phase] || 'bg-gray-100 text-gray-800'
}

const getAuthorRoleClass = (role) => {
  const classes = {
    professor: 'bg-blue-100 text-blue-800',
    coordenador: 'bg-purple-100 text-purple-800',
    aluno: 'bg-green-100 text-green-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const getAuthorRoleLabel = (role) => {
  const labels = {
    professor: 'Professor',
    coordenador: 'Coordenador',
    aluno: 'Aluno'
  }
  return labels[role] || role
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
