<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Cronograma</h1>
        <p class="mt-2 text-sm text-gray-700">
          Defina os prazos e cronograma do semestre
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="showEditModal = true"
          class="btn-primary"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Editar Cronograma
        </button>
      </div>
    </div>

    <!-- Current Schedule -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Cronograma Atual - {{ schedule.semester }}
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

    <!-- Evaluation Times -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Tempos de Avaliação
        </h3>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="bg-blue-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Avaliação Proposta</p>
                <p class="text-lg font-semibold text-gray-900">
                  {{ schedule.proposalEvaluationDays }} dias
                </p>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Avaliação Reelaboração</p>
                <p class="text-lg font-semibold text-gray-900">
                  {{ schedule.proposalRevisionEvaluationDays }} dias
                </p>
              </div>
            </div>
          </div>

          <div class="bg-green-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Avaliação TC</p>
                <p class="text-lg font-semibold text-gray-900">
                  {{ schedule.tcEvaluationDays }} dias
                </p>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Avaliação Reelaboração TC</p>
                <p class="text-lg font-semibold text-gray-900">
                  {{ schedule.tcRevisionEvaluationDays }} dias
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Schedule Modal -->
    <Modal
      :show="showEditModal"
      title="Editar Cronograma"
      type="info"
      size="lg"
      @close="closeModal"
    >
      <div class="space-y-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label for="semester" class="form-label">Semestre</label>
            <input
              id="semester"
              v-model="scheduleForm.semester"
              type="text"
              class="form-input"
              placeholder="Ex: 2024.1"
              required
            />
          </div>
          <div></div>
          
          <div>
            <label for="proposalDeadline" class="form-label">Prazo Proposta</label>
            <input
              id="proposalDeadline"
              v-model="scheduleForm.proposalDeadline"
              type="date"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="proposalRevisionDeadline" class="form-label">Prazo Reelaboração Proposta</label>
            <input
              id="proposalRevisionDeadline"
              v-model="scheduleForm.proposalRevisionDeadline"
              type="date"
              class="form-input"
              required
            />
          </div>
          
          <div>
            <label for="tcDeadline" class="form-label">Prazo TC Final</label>
            <input
              id="tcDeadline"
              v-model="scheduleForm.tcDeadline"
              type="date"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="tcRevisionDeadline" class="form-label">Prazo Reelaboração TC</label>
            <input
              id="tcRevisionDeadline"
              v-model="scheduleForm.tcRevisionDeadline"
              type="date"
              class="form-input"
              required
            />
          </div>
          
          <div>
            <label for="proposalEvaluationDays" class="form-label">Dias para Avaliação Proposta</label>
            <input
              id="proposalEvaluationDays"
              v-model.number="scheduleForm.proposalEvaluationDays"
              type="number"
              min="1"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="proposalRevisionEvaluationDays" class="form-label">Dias para Avaliação Reelaboração</label>
            <input
              id="proposalRevisionEvaluationDays"
              v-model.number="scheduleForm.proposalRevisionEvaluationDays"
              type="number"
              min="1"
              class="form-input"
              required
            />
          </div>
          
          <div>
            <label for="tcEvaluationDays" class="form-label">Dias para Avaliação TC</label>
            <input
              id="tcEvaluationDays"
              v-model.number="scheduleForm.tcEvaluationDays"
              type="number"
              min="1"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="tcRevisionEvaluationDays" class="form-label">Dias para Avaliação Reelaboração TC</label>
            <input
              id="tcRevisionEvaluationDays"
              v-model.number="scheduleForm.tcRevisionEvaluationDays"
              type="number"
              min="1"
              class="form-input"
              required
            />
          </div>
        </div>
      </div>
      
      <template #actions>
        <button
          type="button"
          class="btn-primary"
          @click="saveSchedule"
        >
          Salvar
        </button>
        <button
          type="button"
          class="btn-secondary"
          @click="closeModal"
        >
          Cancelar
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useScheduleStore } from '../stores/schedule'
import Modal from '../components/modals/Modal.vue'

const scheduleStore = useScheduleStore()

const showEditModal = ref(false)

const schedule = computed(() => scheduleStore.schedule)
const deadlineStatus = computed(() => scheduleStore.getDeadlineStatus)

const scheduleForm = ref({
  semester: '',
  proposalDeadline: '',
  proposalRevisionDeadline: '',
  tcDeadline: '',
  tcRevisionDeadline: '',
  proposalEvaluationDays: 0,
  proposalRevisionEvaluationDays: 0,
  tcEvaluationDays: 0,
  tcRevisionEvaluationDays: 0
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
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

const saveSchedule = () => {
  scheduleStore.updateSchedule(scheduleForm.value)
  closeModal()
}

const closeModal = () => {
  showEditModal.value = false
  scheduleForm.value = { ...schedule.value }
}
</script>
