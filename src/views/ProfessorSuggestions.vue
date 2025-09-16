<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Sugerir Professores Avaliadores</h1>
      <p class="mt-2 text-sm text-gray-700">
        Selecione 2 professores da lista disponível para avaliar seu Trabalho de Conclusão
      </p>
    </div>

    <!-- Current Suggestions -->
    <div v-if="currentSuggestion" class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Suas Sugestões Atuais
        </h3>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="bg-blue-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span class="text-lg font-medium text-blue-600">
                    {{ getProfessorInitials(currentSuggestion.professor1Id) }}
                  </span>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">
                  {{ getProfessorName(currentSuggestion.professor1Id) }}
                </h4>
                <p class="text-sm text-gray-500">
                  {{ getProfessorDepartment(currentSuggestion.professor1Id) }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ getProfessorSpecialization(currentSuggestion.professor1Id) }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-green-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-lg font-medium text-green-600">
                    {{ getProfessorInitials(currentSuggestion.professor2Id) }}
                  </span>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">
                  {{ getProfessorName(currentSuggestion.professor2Id) }}
                </h4>
                <p class="text-sm text-gray-500">
                  {{ getProfessorDepartment(currentSuggestion.professor2Id) }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ getProfessorSpecialization(currentSuggestion.professor2Id) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex space-x-4">
          <button
            @click="showEditModal = true"
            class="btn-primary"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Alterar Sugestões
          </button>
          <button
            @click="deleteSuggestion"
            class="btn-danger"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Remover Sugestões
          </button>
        </div>
      </div>
    </div>

    <!-- No Suggestions Message -->
    <div v-else class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma sugestão enviada</h3>
        <p class="mt-1 text-sm text-gray-500">Selecione 2 professores para avaliar seu TC.</p>
        <div class="mt-6">
          <button
            @click="showAddModal = true"
            class="btn-primary"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Sugerir Professores
          </button>
        </div>
      </div>
    </div>

    <!-- Available Professors -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Professores Disponíveis para Avaliação
        </h3>
        
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="professor in availableProfessors"
            :key="professor.id"
            class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            :class="{ 'bg-blue-50 border-blue-200': isProfessorSuggested(professor.id) }"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span class="text-sm font-medium text-gray-700">
                    {{ professor.name.charAt(0) }}
                  </span>
                </div>
              </div>
              <div class="ml-3 flex-1">
                <h4 class="text-sm font-medium text-gray-900">{{ professor.name }}</h4>
                <p class="text-sm text-gray-500">{{ professor.department }}</p>
                <p class="text-sm text-gray-600">{{ professor.specialization }}</p>
                <div v-if="isProfessorSuggested(professor.id)" class="mt-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Sugerido
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Suggestions Modal -->
    <Modal
      :show="showAddModal || showEditModal"
      :title="showAddModal ? 'Sugerir Professores' : 'Alterar Sugestões'"
      type="info"
      size="lg"
      @close="closeModal"
    >
      <div class="space-y-4">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-blue-700">
                Selecione exatamente 2 professores diferentes da lista disponível para avaliar seu Trabalho de Conclusão.
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label for="professor1" class="form-label">Primeiro Professor</label>
            <select id="professor1" v-model="suggestionForm.professor1Id" class="form-input" required>
              <option value="">Selecione um professor</option>
              <option v-for="professor in availableProfessors" :key="professor.id" :value="professor.id">
                {{ professor.name }} - {{ professor.department }}
              </option>
            </select>
          </div>
          <div>
            <label for="professor2" class="form-label">Segundo Professor</label>
            <select id="professor2" v-model="suggestionForm.professor2Id" class="form-input" required>
              <option value="">Selecione um professor</option>
              <option v-for="professor in availableProfessors" :key="professor.id" :value="professor.id">
                {{ professor.name }} - {{ professor.department }}
              </option>
            </select>
          </div>
        </div>
        
        <div v-if="suggestionForm.professor1Id && suggestionForm.professor2Id && suggestionForm.professor1Id === suggestionForm.professor2Id" class="alert-warning">
          <p>Os professores selecionados devem ser diferentes.</p>
        </div>
      </div>
      
      <template #actions>
        <button
          type="button"
          class="btn-primary"
          :disabled="!suggestionForm.professor1Id || !suggestionForm.professor2Id || suggestionForm.professor1Id === suggestionForm.professor2Id"
          @click="saveSuggestion"
        >
          {{ showAddModal ? 'Enviar Sugestões' : 'Salvar Alterações' }}
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

    <!-- Delete Confirmation Modal -->
    <Modal
      :show="showDeleteModal"
      title="Confirmar Remoção"
      message="Tem certeza que deseja remover suas sugestões de professores? Esta ação não pode ser desfeita."
      type="error"
      confirm-text="Remover"
      cancel-text="Cancelar"
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProfessorSuggestionsStore } from '../stores/professorSuggestions'
import { useStudentsStore } from '../stores/students'
import { useAuthStore } from '../stores/auth'
import Modal from '../components/modals/Modal.vue'

const suggestionsStore = useProfessorSuggestionsStore()
const studentsStore = useStudentsStore()
const authStore = useAuthStore()

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

const suggestionForm = ref({
  professor1Id: '',
  professor2Id: ''
})

const availableProfessors = computed(() => suggestionsStore.getAvailableProfessors())

const currentSuggestion = computed(() => {
  // Em um sistema real, você buscaria o aluno pelo ID do usuário logado
  // Por simplicidade, vamos usar o primeiro aluno como exemplo
  const studentId = studentsStore.students[0]?.id
  if (!studentId) return null
  return suggestionsStore.getSuggestionsByStudent(studentId)
})

const isProfessorSuggested = (professorId) => {
  if (!currentSuggestion.value) return false
  return currentSuggestion.value.professor1Id === professorId || 
         currentSuggestion.value.professor2Id === professorId
}

const getProfessorName = (professorId) => {
  const professor = availableProfessors.value.find(p => p.id === professorId)
  return professor ? professor.name : 'Professor não encontrado'
}

const getProfessorDepartment = (professorId) => {
  const professor = availableProfessors.value.find(p => p.id === professorId)
  return professor ? professor.department : ''
}

const getProfessorSpecialization = (professorId) => {
  const professor = availableProfessors.value.find(p => p.id === professorId)
  return professor ? professor.specialization : ''
}

const getProfessorInitials = (professorId) => {
  const professor = availableProfessors.value.find(p => p.id === professorId)
  return professor ? professor.name.charAt(0) : '?'
}

const saveSuggestion = () => {
  if (suggestionForm.value.professor1Id && suggestionForm.value.professor2Id && 
      suggestionForm.value.professor1Id !== suggestionForm.value.professor2Id) {
    
    const studentId = studentsStore.students[0]?.id // Em um sistema real, seria o ID do usuário logado
    
    if (showAddModal.value) {
      suggestionsStore.addSuggestion({
        studentId,
        professor1Id: suggestionForm.value.professor1Id,
        professor2Id: suggestionForm.value.professor2Id
      })
    } else {
      suggestionsStore.updateSuggestion(currentSuggestion.value.id, {
        professor1Id: suggestionForm.value.professor1Id,
        professor2Id: suggestionForm.value.professor2Id
      })
    }
    closeModal()
  }
}

const deleteSuggestion = () => {
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (currentSuggestion.value) {
    suggestionsStore.deleteSuggestion(currentSuggestion.value.id)
  }
  showDeleteModal.value = false
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  suggestionForm.value = {
    professor1Id: '',
    professor2Id: ''
  }
}

onMounted(() => {
  // Os dados já estão carregados nos stores
})
</script>
