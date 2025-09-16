<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Banca Avaliadora</h1>
        <p class="mt-2 text-sm text-gray-700">
          Defina os professores que compõem a banca avaliadora
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
          Editar Banca
        </button>
      </div>
    </div>

    <!-- Current Committee -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Banca Avaliadora Atual
        </h3>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="bg-blue-50 rounded-lg p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span class="text-lg font-medium text-blue-600">
                    {{ getProfessorInitials(committee.professor1Id) }}
                  </span>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">
                  {{ getProfessorName(committee.professor1Id) }}
                </h4>
                <p class="text-sm text-gray-500">
                  {{ getProfessorEmail(committee.professor1Id) }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ getProfessorDepartment(committee.professor1Id) }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-green-50 rounded-lg p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-lg font-medium text-green-600">
                    {{ getProfessorInitials(committee.professor2Id) }}
                  </span>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">
                  {{ getProfessorName(committee.professor2Id) }}
                </h4>
                <p class="text-sm text-gray-500">
                  {{ getProfessorEmail(committee.professor2Id) }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ getProfessorDepartment(committee.professor2Id) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Informações da Banca</h4>
          <div class="text-sm text-gray-600">
            <p><strong>Criada em:</strong> {{ formatDate(committee.createdAt) }}</p>
            <p><strong>Última atualização:</strong> {{ formatDate(committee.updatedAt) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Student Suggestions -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Sugestões dos Alunos
        </h3>
        
        <div v-if="studentSuggestions.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma sugestão enviada</h3>
          <p class="mt-1 text-sm text-gray-500">Os alunos ainda não enviaram sugestões de professores.</p>
        </div>
        
        <div v-else class="space-y-4">
          <div
            v-for="suggestion in studentSuggestions"
            :key="suggestion.id"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-medium text-gray-900">
                {{ getStudentName(suggestion.studentId) }}
              </h4>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Sugestão
              </span>
            </div>
            
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="bg-blue-50 rounded-lg p-3">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span class="text-sm font-medium text-blue-600">
                        {{ getProfessorInitials(suggestion.professor1Id) }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <h5 class="text-sm font-medium text-gray-900">
                      {{ getProfessorName(suggestion.professor1Id) }}
                    </h5>
                    <p class="text-xs text-gray-500">
                      {{ getProfessorDepartment(suggestion.professor1Id) }}
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="bg-green-50 rounded-lg p-3">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span class="text-sm font-medium text-green-600">
                        {{ getProfessorInitials(suggestion.professor2Id) }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <h5 class="text-sm font-medium text-gray-900">
                      {{ getProfessorName(suggestion.professor2Id) }}
                    </h5>
                    <p class="text-xs text-gray-500">
                      {{ getProfessorDepartment(suggestion.professor2Id) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            :class="{ 
              'bg-blue-50 border-blue-200': isProfessorSuggested(professor.id),
              'bg-green-50 border-green-200': isProfessorInCommittee(professor.id)
            }"
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
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-medium text-gray-900">{{ professor.name }}</h4>
                  <div class="flex space-x-1">
                    <span v-if="isProfessorSuggested(professor.id)" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      Sugerido
                    </span>
                    <span v-if="isProfessorInCommittee(professor.id)" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      Na Banca
                    </span>
                  </div>
                </div>
                <p class="text-sm text-gray-500">{{ professor.department }}</p>
                <p class="text-sm text-gray-600">{{ professor.specialization }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Committee Modal -->
    <Modal
      :show="showEditModal"
      title="Editar Banca Avaliadora"
      type="info"
      size="lg"
      @close="closeModal"
    >
      <div class="space-y-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label for="professor1" class="form-label">Professor 1</label>
            <select id="professor1" v-model="committeeForm.professor1Id" class="form-input" required>
              <option value="">Selecione um professor</option>
              <option v-for="professor in availableProfessors" :key="professor.id" :value="professor.id">
                {{ professor.name }} - {{ professor.department }}
                <span v-if="isProfessorSuggested(professor.id)"> (Sugerido)</span>
              </option>
            </select>
          </div>
          <div>
            <label for="professor2" class="form-label">Professor 2</label>
            <select id="professor2" v-model="committeeForm.professor2Id" class="form-input" required>
              <option value="">Selecione um professor</option>
              <option v-for="professor in availableProfessors" :key="professor.id" :value="professor.id">
                {{ professor.name }} - {{ professor.department }}
                <span v-if="isProfessorSuggested(professor.id)"> (Sugerido)</span>
              </option>
            </select>
          </div>
        </div>
        
        <div v-if="committeeForm.professor1Id && committeeForm.professor2Id && committeeForm.professor1Id === committeeForm.professor2Id" class="alert-warning">
          <p>Os professores selecionados devem ser diferentes.</p>
        </div>
      </div>
      
      <template #actions>
        <button
          type="button"
          class="btn-primary"
          :disabled="!committeeForm.professor1Id || !committeeForm.professor2Id || committeeForm.professor1Id === committeeForm.professor2Id"
          @click="saveCommittee"
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
import { useProfessorsStore } from '../stores/professors'
import { useProfessorSuggestionsStore } from '../stores/professorSuggestions'
import { useStudentsStore } from '../stores/students'
import Modal from '../components/modals/Modal.vue'

const scheduleStore = useScheduleStore()
const professorsStore = useProfessorsStore()
const suggestionsStore = useProfessorSuggestionsStore()
const studentsStore = useStudentsStore()

const showEditModal = ref(false)

const committee = computed(() => scheduleStore.evaluationCommittee)
const professors = computed(() => professorsStore.professors)
const studentSuggestions = computed(() => suggestionsStore.suggestions)

const committeeForm = ref({
  professor1Id: '',
  professor2Id: ''
})

const availableProfessors = computed(() => {
  return suggestionsStore.getAvailableProfessors()
})

const getProfessorName = (professorId) => {
  const professor = availableProfessors.value.find(p => p.id === professorId)
  return professor ? professor.name : 'Não definido'
}

const getProfessorEmail = (professorId) => {
  const professor = professors.value.find(p => p.id === professorId)
  return professor ? professor.email : ''
}

const getProfessorDepartment = (professorId) => {
  const professor = availableProfessors.value.find(p => p.id === professorId)
  return professor ? professor.department : ''
}

const getProfessorInitials = (professorId) => {
  const professor = availableProfessors.value.find(p => p.id === professorId)
  return professor ? professor.name.charAt(0) : '?'
}

const getStudentName = (studentId) => {
  const student = studentsStore.students.find(s => s.id === studentId)
  return student ? student.name : 'Aluno não encontrado'
}

const isProfessorSuggested = (professorId) => {
  return studentSuggestions.value.some(suggestion => 
    suggestion.professor1Id === professorId || suggestion.professor2Id === professorId
  )
}

const isProfessorInCommittee = (professorId) => {
  return committee.value.professor1Id === professorId || committee.value.professor2Id === professorId
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const saveCommittee = () => {
  if (committeeForm.value.professor1Id && committeeForm.value.professor2Id && 
      committeeForm.value.professor1Id !== committeeForm.value.professor2Id) {
    scheduleStore.updateEvaluationCommittee(committeeForm.value)
    closeModal()
  }
}

const closeModal = () => {
  showEditModal.value = false
  committeeForm.value = {
    professor1Id: committee.value.professor1Id,
    professor2Id: committee.value.professor2Id
  }
}
</script>
