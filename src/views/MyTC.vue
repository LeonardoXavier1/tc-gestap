<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Meu Trabalho de Conclusão</h1>
      <p class="mt-2 text-sm text-gray-700">
        Acompanhe o progresso do seu TC e cronograma
      </p>
    </div>

    <!-- Student Info -->
    <div v-if="studentInfo" class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Informações do TC
        </h3>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h4 class="text-sm font-medium text-gray-500">Título</h4>
            <p class="mt-1 text-sm text-gray-900">{{ studentInfo.tcTitle || 'Não definido' }}</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-500">Orientador</h4>
            <p class="mt-1 text-sm text-gray-900">{{ getAdvisorName(studentInfo.advisorId) }}</p>
          </div>
          <div class="sm:col-span-2">
            <h4 class="text-sm font-medium text-gray-500">Descrição</h4>
            <p class="mt-1 text-sm text-gray-900">{{ studentInfo.tcDescription || 'Não definida' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Cronograma do Semestre
        </h3>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Proposta</p>
                <p class="text-lg font-semibold text-gray-900">
                  {{ formatDate(schedule.proposalDeadline) }}
                </p>
                <div class="mt-1">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getDeadlineStatusClass('proposal')">
                    {{ getDeadlineStatusText('proposal') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Reelaboração Proposta</p>
                <p class="text-lg font-semibold text-gray-900">
                  {{ formatDate(schedule.proposalRevisionDeadline) }}
                </p>
                <div class="mt-1">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getDeadlineStatusClass('proposalRevision')">
                    {{ getDeadlineStatusText('proposalRevision') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">TC Final</p>
                <p class="text-lg font-semibold text-gray-900">
                  {{ formatDate(schedule.tcDeadline) }}
                </p>
                <div class="mt-1">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getDeadlineStatusClass('tc')">
                    {{ getDeadlineStatusText('tc') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Reelaboração TC</p>
                <p class="text-lg font-semibold text-gray-900">
                  {{ formatDate(schedule.tcRevisionDeadline) }}
                </p>
                <div class="mt-1">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getDeadlineStatusClass('tcRevision')">
                    {{ getDeadlineStatusText('tcRevision') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grades -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Minhas Notas
        </h3>
        
        <div v-if="studentGrades.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma nota lançada</h3>
          <p class="mt-1 text-sm text-gray-500">Suas notas aparecerão aqui quando forem lançadas pelos professores.</p>
        </div>
        
        <div v-else class="space-y-4">
          <div
            v-for="grade in studentGrades"
            :key="grade.id"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">{{ getPhaseLabel(grade.phase) }}</h4>
                <p class="text-sm text-gray-500">Professor: {{ getProfessorName(grade.professorId) }}</p>
                <p class="text-sm text-gray-500">Avaliado em: {{ formatDate(grade.evaluatedAt) }}</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-primary-600">{{ grade.totalGrade }}</div>
                <div class="text-sm text-gray-500">Nota Total</div>
              </div>
            </div>
            
            <div v-if="grade.comments" class="mt-3 pt-3 border-t border-gray-200">
              <p class="text-sm text-gray-600">
                <strong>Comentários Gerais:</strong> {{ grade.comments }}
              </p>
            </div>

            <!-- Comentários por Critério -->
            <div class="mt-3 pt-3 border-t border-gray-200">
              <CriteriaComments 
                :grade-id="grade.id"
                :student-id="grade.studentId"
                :can-add-comment="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Meetings -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Reuniões de Orientação
        </h3>
        
        <div v-if="studentMeetings.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma reunião agendada</h3>
          <p class="mt-1 text-sm text-gray-500">Suas reuniões de orientação aparecerão aqui.</p>
        </div>
        
        <div v-else class="space-y-4">
          <div
            v-for="meeting in studentMeetings"
            :key="meeting.id"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">{{ meeting.title }}</h4>
                <p class="text-sm text-gray-500">
                  {{ formatDate(meeting.date) }} às {{ meeting.time }} ({{ meeting.duration }} min)
                </p>
                <p class="text-sm text-gray-500">Professor: {{ getProfessorName(meeting.professorId) }}</p>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClass(meeting.status)">
                {{ meeting.status }}
              </span>
            </div>
            
            <div v-if="meeting.description" class="mt-2">
              <p class="text-sm text-gray-600">{{ meeting.description }}</p>
            </div>
            
            <div v-if="meeting.notes" class="mt-2 pt-2 border-t border-gray-200">
              <p class="text-sm text-gray-600">
                <strong>Notas da reunião:</strong> {{ meeting.notes }}
              </p>
            </div>
            
            <div v-if="meeting.documents.length > 0" class="mt-3 pt-3 border-t border-gray-200">
              <h5 class="text-sm font-medium text-gray-900 mb-2">Documentos</h5>
              <div class="space-y-1">
                <div
                  v-for="doc in meeting.documents"
                  :key="doc.id"
                  class="flex items-center text-sm text-gray-600"
                >
                  <svg class="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  {{ doc.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useStudentsStore } from '../stores/students'
import { useProfessorsStore } from '../stores/professors'
import { useScheduleStore } from '../stores/schedule'
import { useGradesStore } from '../stores/grades'
import { useMeetingsStore } from '../stores/meetings'
import CriteriaComments from '../components/CriteriaComments.vue'

const authStore = useAuthStore()
const studentsStore = useStudentsStore()
const professorsStore = useProfessorsStore()
const scheduleStore = useScheduleStore()
const gradesStore = useGradesStore()
const meetingsStore = useMeetingsStore()

const schedule = computed(() => scheduleStore.schedule)
const deadlineStatus = computed(() => scheduleStore.getDeadlineStatus)
const professors = computed(() => professorsStore.professors)

const studentInfo = computed(() => {
  // Em um sistema real, você buscaria o aluno pelo ID do usuário logado
  // Por simplicidade, vamos usar o primeiro aluno como exemplo
  return studentsStore.students[0] || null
})

const studentGrades = computed(() => {
  if (!studentInfo.value) return []
  return gradesStore.getGradesByStudent(studentInfo.value.id)
})

const studentMeetings = computed(() => {
  if (!studentInfo.value) return []
  return meetingsStore.getMeetingsByStudent(studentInfo.value.id)
})

const getAdvisorName = (advisorId) => {
  const advisor = professors.value.find(p => p.id === advisorId)
  return advisor ? advisor.name : 'Não definido'
}

const getProfessorName = (professorId) => {
  const professor = professors.value.find(p => p.id === professorId)
  return professor ? professor.name : 'Professor não encontrado'
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

const getStatusClass = (status) => {
  const classes = {
    agendada: 'bg-blue-100 text-blue-800',
    realizada: 'bg-green-100 text-green-800',
    cancelada: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getDeadlineStatusClass = (phase) => {
  const status = deadlineStatus.value[phase]
  if (!status) return 'bg-gray-100 text-gray-800'
  
  switch (status.status) {
    case 'overdue':
      return 'bg-red-100 text-red-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-green-100 text-green-800'
  }
}

const getDeadlineStatusText = (phase) => {
  const status = deadlineStatus.value[phase]
  if (!status) return 'Indefinido'
  
  switch (status.status) {
    case 'overdue':
      return `${status.days} dias em atraso`
    case 'warning':
      return `${status.days} dias restantes`
    default:
      return 'No prazo'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}
</script>
