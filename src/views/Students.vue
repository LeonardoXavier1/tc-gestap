<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Alunos</h1>
        <p class="mt-2 text-sm text-gray-700">
          Gerencie os alunos matriculados no TC
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
          Adicionar Aluno
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
            placeholder="Nome, email ou matrícula..."
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
          <label for="advisor" class="form-label">Orientador</label>
          <select id="advisor" v-model="advisorFilter" class="form-input">
            <option value="">Todos</option>
            <option v-for="professor in professors" :key="professor.id" :value="professor.id">
              {{ professor.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Students Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li v-for="student in filteredStudents" :key="student.id">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-700">
                      {{ student.name.charAt(0) }}
                    </span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="flex items-center">
                    <p class="text-sm font-medium text-gray-900">{{ student.name }}</p>
                    <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClass(student.status)">
                      {{ student.status }}
                    </span>
                  </div>
                  <div class="mt-1">
                    <p class="text-sm text-gray-500">{{ student.email }}</p>
                    <p class="text-sm text-gray-500">Matrícula: {{ student.registration }}</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="text-right">
                  <p class="text-sm text-gray-900">{{ student.course }}</p>
                  <p class="text-sm text-gray-500">
                    Orientador: {{ getAdvisorName(student.advisorId) }}
                  </p>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click="editStudent(student)"
                    class="text-primary-600 hover:text-primary-900 text-sm font-medium"
                  >
                    Editar
                  </button>
                  <button
                    @click="deleteStudent(student)"
                    class="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Add/Edit Student Modal -->
    <Modal
      :show="showAddModal || showEditModal"
      :title="showAddModal ? 'Adicionar Aluno' : 'Editar Aluno'"
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
              v-model="studentForm.name"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="studentForm.email"
              type="email"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="registration" class="form-label">Matrícula</label>
            <input
              id="registration"
              v-model="studentForm.registration"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="course" class="form-label">Curso</label>
            <input
              id="course"
              v-model="studentForm.course"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="sm:col-span-2">
            <label for="advisor" class="form-label">Orientador</label>
            <select id="advisor" v-model="studentForm.advisorId" class="form-input" required>
              <option value="">Selecione um orientador</option>
              <option v-for="professor in professors" :key="professor.id" :value="professor.id">
                {{ professor.name }}
              </option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label for="tcTitle" class="form-label">Título do TC</label>
            <input
              id="tcTitle"
              v-model="studentForm.tcTitle"
              type="text"
              class="form-input"
            />
          </div>
          <div class="sm:col-span-2">
            <label for="tcDescription" class="form-label">Descrição do TC</label>
            <textarea
              id="tcDescription"
              v-model="studentForm.tcDescription"
              rows="3"
              class="form-input"
            ></textarea>
          </div>
        </div>
      </div>
      
      <template #actions>
        <button
          type="button"
          class="btn-primary"
          @click="saveStudent"
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
      message="Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita."
      type="error"
      confirm-text="Excluir"
      cancel-text="Cancelar"
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStudentsStore } from '../stores/students'
import { useProfessorsStore } from '../stores/professors'
import Modal from '../components/modals/Modal.vue'

const studentsStore = useStudentsStore()
const professorsStore = useProfessorsStore()

const searchTerm = ref('')
const statusFilter = ref('')
const advisorFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editingStudent = ref(null)

const studentForm = ref({
  name: '',
  email: '',
  registration: '',
  course: '',
  advisorId: '',
  tcTitle: '',
  tcDescription: ''
})

const students = computed(() => studentsStore.students)
const professors = computed(() => professorsStore.professors)

const filteredStudents = computed(() => {
  let filtered = students.value

  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(student =>
      student.name.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search) ||
      student.registration.toLowerCase().includes(search)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(student => student.status === statusFilter.value)
  }

  if (advisorFilter.value) {
    filtered = filtered.filter(student => student.advisorId === parseInt(advisorFilter.value))
  }

  return filtered
})

const getAdvisorName = (advisorId) => {
  const advisor = professors.value.find(p => p.id === advisorId)
  return advisor ? advisor.name : 'Não definido'
}

const getStatusClass = (status) => {
  return status === 'ativo' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800'
}

const editStudent = (student) => {
  editingStudent.value = student
  studentForm.value = { ...student }
  showEditModal.value = true
}

const deleteStudent = (student) => {
  editingStudent.value = student
  showDeleteModal.value = true
}

const saveStudent = () => {
  if (showAddModal.value) {
    studentsStore.addStudent(studentForm.value)
  } else {
    studentsStore.updateStudent(editingStudent.value.id, studentForm.value)
  }
  closeModal()
}

const confirmDelete = () => {
  studentsStore.deleteStudent(editingStudent.value.id)
  showDeleteModal.value = false
  editingStudent.value = null
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingStudent.value = null
  studentForm.value = {
    name: '',
    email: '',
    registration: '',
    course: '',
    advisorId: '',
    tcTitle: '',
    tcDescription: ''
  }
}

onMounted(() => {
  // Os dados já estão carregados nos stores
})
</script>
