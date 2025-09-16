<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Professores</h1>
        <p class="mt-2 text-sm text-gray-700">
          Gerencie os professores do departamento
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="showAddModal = true"
          class="btn-primary"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Adicionar Professor
        </button>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label for="search" class="form-label">Buscar</label>
          <input
            id="search"
            v-model="searchTerm"
            type="text"
            placeholder="Nome, email ou departamento..."
            class="form-input"
          />
        </div>
        <div>
          <label for="status" class="form-label">Status</label>
          <select id="status" v-model="statusFilter" class="form-input">
            <option value="">Todos</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
        <div>
          <label for="department" class="form-label">Departamento</label>
          <select id="department" v-model="departmentFilter" class="form-input">
            <option value="">Todos</option>
            <option value="Ciência da Computação">Ciência da Computação</option>
            <option value="Engenharia de Software">Engenharia de Software</option>
            <option value="Sistemas de Informação">Sistemas de Informação</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Professors Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="professor in filteredProfessors"
        :key="professor.id"
        class="bg-white overflow-hidden shadow rounded-lg"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                <span class="text-lg font-medium text-gray-700">
                  {{ professor.name.charAt(0) }}
                </span>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">{{ professor.name }}</h3>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClass(professor.status)">
                  {{ professor.status }}
                </span>
              </div>
              <p class="text-sm text-gray-500">{{ professor.email }}</p>
              <p class="text-sm text-gray-500">{{ professor.department }}</p>
              <p class="text-sm text-gray-600 mt-1">{{ professor.specialization }}</p>
            </div>
          </div>
          
          <div class="mt-4 flex space-x-2">
            <button
              @click="editProfessor(professor)"
              class="flex-1 bg-primary-50 text-primary-700 hover:bg-primary-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Editar
            </button>
            <button
              @click="deleteProfessor(professor)"
              class="flex-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Professor Modal -->
    <Modal
      :show="showAddModal || showEditModal"
      :title="showAddModal ? 'Adicionar Professor' : 'Editar Professor'"
      type="info"
      size="lg"
      @close="closeModal"
    >
      <div class="space-y-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label for="name" class="form-label">Nome</label>
            <input
              id="name"
              v-model="professorForm.name"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="professorForm.email"
              type="email"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="department" class="form-label">Departamento</label>
            <select id="department" v-model="professorForm.department" class="form-input" required>
              <option value="">Selecione um departamento</option>
              <option value="Ciência da Computação">Ciência da Computação</option>
              <option value="Engenharia de Software">Engenharia de Software</option>
              <option value="Sistemas de Informação">Sistemas de Informação</option>
            </select>
          </div>
          <div>
            <label for="specialization" class="form-label">Especialização</label>
            <input
              id="specialization"
              v-model="professorForm.specialization"
              type="text"
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
          @click="saveProfessor"
        >
          {{ showAddModal ? 'Adicionar' : 'Salvar' }}
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
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir este professor? Esta ação não pode ser desfeita."
      type="error"
      confirm-text="Excluir"
      cancel-text="Cancelar"
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProfessorsStore } from '../stores/professors'
import Modal from '../components/modals/Modal.vue'

const professorsStore = useProfessorsStore()

const searchTerm = ref('')
const statusFilter = ref('')
const departmentFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editingProfessor = ref(null)

const professorForm = ref({
  name: '',
  email: '',
  department: '',
  specialization: ''
})

const professors = computed(() => professorsStore.professors)

const filteredProfessors = computed(() => {
  let filtered = professors.value

  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(professor =>
      professor.name.toLowerCase().includes(search) ||
      professor.email.toLowerCase().includes(search) ||
      professor.department.toLowerCase().includes(search)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(professor => professor.status === statusFilter.value)
  }

  if (departmentFilter.value) {
    filtered = filtered.filter(professor => professor.department === departmentFilter.value)
  }

  return filtered
})

const getStatusClass = (status) => {
  return status === 'ativo' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800'
}

const editProfessor = (professor) => {
  editingProfessor.value = professor
  professorForm.value = { ...professor }
  showEditModal.value = true
}

const deleteProfessor = (professor) => {
  editingProfessor.value = professor
  showDeleteModal.value = true
}

const saveProfessor = () => {
  if (showAddModal.value) {
    professorsStore.addProfessor(professorForm.value)
  } else {
    professorsStore.updateProfessor(editingProfessor.value.id, professorForm.value)
  }
  closeModal()
}

const confirmDelete = () => {
  professorsStore.deleteProfessor(editingProfessor.value.id)
  showDeleteModal.value = false
  editingProfessor.value = null
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingProfessor.value = null
  professorForm.value = {
    name: '',
    email: '',
    department: '',
    specialization: ''
  }
}
</script>
