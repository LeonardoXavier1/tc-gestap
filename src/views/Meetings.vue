<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Reuniões de Orientação</h1>
        <p class="mt-2 text-sm text-gray-700">
          Gerencie as reuniões de orientação com alunos
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
          Agendar Reunião
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div>
          <label for="student" class="form-label">Aluno</label>
          <select id="student" v-model="studentFilter" class="form-input">
            <option value="">Todos</option>
            <option v-for="student in students" :key="student.id" :value="student.id">
              {{ student.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="status" class="form-label">Status</label>
          <select id="status" v-model="statusFilter" class="form-input">
            <option value="">Todos</option>
            <option value="agendada">Agendada</option>
            <option value="realizada">Realizada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div>
          <label for="dateFrom" class="form-label">Data Início</label>
          <input
            id="dateFrom"
            v-model="dateFromFilter"
            type="date"
            class="form-input"
          />
        </div>
        <div>
          <label for="dateTo" class="form-label">Data Fim</label>
          <input
            id="dateTo"
            v-model="dateToFilter"
            type="date"
            class="form-input"
          />
        </div>
      </div>
    </div>

    <!-- Meetings List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Reuniões</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Lista de todas as reuniões de orientação
        </p>
      </div>
      
      <ul class="divide-y divide-gray-200">
        <li v-for="meeting in filteredMeetings" :key="meeting.id">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-700">
                      {{ getStudentName(meeting.studentId).charAt(0) }}
                    </span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="flex items-center">
                    <h4 class="text-sm font-medium text-gray-900">{{ meeting.title }}</h4>
                    <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClass(meeting.status)">
                      {{ meeting.status }}
                    </span>
                  </div>
                  <div class="mt-1">
                    <p class="text-sm text-gray-500">{{ getStudentName(meeting.studentId) }}</p>
                    <p class="text-sm text-gray-500">
                      {{ formatDate(meeting.date) }} às {{ meeting.time }} ({{ meeting.duration }} min)
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="text-right">
                  <p class="text-sm text-gray-900">{{ getProfessorName(meeting.professorId) }}</p>
                  <p class="text-sm text-gray-500">
                    {{ meeting.documents.length }} documento(s)
                  </p>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click="viewMeeting(meeting)"
                    class="text-primary-600 hover:text-primary-900 text-sm font-medium"
                  >
                    Ver
                  </button>
                  <button
                    @click="editMeeting(meeting)"
                    class="text-yellow-600 hover:text-yellow-900 text-sm font-medium"
                  >
                    Editar
                  </button>
                  <button
                    @click="deleteMeeting(meeting)"
                    class="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="meeting.description" class="mt-2">
              <p class="text-sm text-gray-600">{{ meeting.description }}</p>
            </div>
            
            <div v-if="meeting.notes" class="mt-2">
              <p class="text-sm text-gray-500">
                <strong>Notas:</strong> {{ meeting.notes }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Add/Edit Meeting Modal -->
    <Modal
      :show="showAddModal || showEditModal"
      :title="showAddModal ? 'Agendar Reunião' : 'Editar Reunião'"
      type="info"
      size="lg"
      @close="closeModal"
    >
      <div class="space-y-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label for="student" class="form-label">Aluno</label>
            <select id="student" v-model="meetingForm.studentId" class="form-input" required>
              <option value="">Selecione um aluno</option>
              <option v-for="student in students" :key="student.id" :value="student.id">
                {{ student.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="title" class="form-label">Título</label>
            <input
              id="title"
              v-model="meetingForm.title"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="date" class="form-label">Data</label>
            <input
              id="date"
              v-model="meetingForm.date"
              type="date"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="time" class="form-label">Horário</label>
            <input
              id="time"
              v-model="meetingForm.time"
              type="time"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="duration" class="form-label">Duração (minutos)</label>
            <input
              id="duration"
              v-model.number="meetingForm.duration"
              type="number"
              min="15"
              max="240"
              class="form-input"
              required
            />
          </div>
          <div>
            <label for="status" class="form-label">Status</label>
            <select id="status" v-model="meetingForm.status" class="form-input" required>
              <option value="agendada">Agendada</option>
              <option value="realizada">Realizada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>
        
        <div>
          <label for="description" class="form-label">Descrição</label>
          <textarea
            id="description"
            v-model="meetingForm.description"
            rows="3"
            class="form-input"
            placeholder="Descrição da reunião..."
          ></textarea>
        </div>
        
        <div>
          <label for="notes" class="form-label">Notas da Reunião</label>
          <textarea
            id="notes"
            v-model="meetingForm.notes"
            rows="3"
            class="form-input"
            placeholder="Notas sobre o que foi discutido..."
          ></textarea>
        </div>
      </div>
      
      <template #actions>
        <button
          type="button"
          class="btn-primary"
          @click="saveMeeting"
        >
          {{ showAddModal ? 'Agendar' : 'Salvar' }}
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

    <!-- View Meeting Modal -->
    <Modal
      :show="showViewModal"
      title="Detalhes da Reunião"
      type="info"
      size="lg"
      @close="showViewModal = false"
    >
      <div v-if="viewingMeeting" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-500">Aluno</label>
            <p class="text-sm text-gray-900">{{ getStudentName(viewingMeeting.studentId) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Professor</label>
            <p class="text-sm text-gray-900">{{ getProfessorName(viewingMeeting.professorId) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Data</label>
            <p class="text-sm text-gray-900">{{ formatDate(viewingMeeting.date) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Horário</label>
            <p class="text-sm text-gray-900">{{ viewingMeeting.time }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Duração</label>
            <p class="text-sm text-gray-900">{{ viewingMeeting.duration }} minutos</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Status</label>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClass(viewingMeeting.status)">
              {{ viewingMeeting.status }}
            </span>
          </div>
        </div>

        <div v-if="viewingMeeting.description">
          <label class="text-sm font-medium text-gray-500">Descrição</label>
          <p class="text-sm text-gray-900 mt-1">{{ viewingMeeting.description }}</p>
        </div>

        <div v-if="viewingMeeting.notes">
          <label class="text-sm font-medium text-gray-500">Notas da Reunião</label>
          <p class="text-sm text-gray-900 mt-1">{{ viewingMeeting.notes }}</p>
        </div>

        <div v-if="viewingMeeting.documents.length > 0">
          <label class="text-sm font-medium text-gray-500">Documentos</label>
          <div class="mt-2 space-y-2">
            <div
              v-for="doc in viewingMeeting.documents"
              :key="doc.id"
              class="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span class="text-sm text-gray-900">{{ doc.name }}</span>
              </div>
              <span class="text-xs text-gray-500">{{ formatDateTime(doc.uploadedAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal
      :show="showDeleteModal"
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir esta reunião? Esta ação não pode ser desfeita."
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
import { useMeetingsStore } from '../stores/meetings'
import { useStudentsStore } from '../stores/students'
import { useProfessorsStore } from '../stores/professors'
import { useAuthStore } from '../stores/auth'
import Modal from '../components/modals/Modal.vue'

const meetingsStore = useMeetingsStore()
const studentsStore = useStudentsStore()
const professorsStore = useProfessorsStore()
const authStore = useAuthStore()

const studentFilter = ref('')
const statusFilter = ref('')
const dateFromFilter = ref('')
const dateToFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const editingMeeting = ref(null)
const viewingMeeting = ref(null)

const meetingForm = ref({
  studentId: '',
  title: '',
  description: '',
  date: '',
  time: '',
  duration: 60,
  status: 'agendada',
  notes: ''
})

const meetings = computed(() => meetingsStore.meetings)
const students = computed(() => studentsStore.students)
const professors = computed(() => professorsStore.professors)

const filteredMeetings = computed(() => {
  let filtered = meetings.value

  if (studentFilter.value) {
    filtered = filtered.filter(meeting => meeting.studentId === parseInt(studentFilter.value))
  }

  if (statusFilter.value) {
    filtered = filtered.filter(meeting => meeting.status === statusFilter.value)
  }

  if (dateFromFilter.value) {
    filtered = filtered.filter(meeting => meeting.date >= dateFromFilter.value)
  }

  if (dateToFilter.value) {
    filtered = filtered.filter(meeting => meeting.date <= dateToFilter.value)
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const getStudentName = (studentId) => {
  const student = students.value.find(s => s.id === studentId)
  return student ? student.name : 'Aluno não encontrado'
}

const getProfessorName = (professorId) => {
  const professor = professors.value.find(p => p.id === professorId)
  return professor ? professor.name : 'Professor não encontrado'
}

const getStatusClass = (status) => {
  const classes = {
    agendada: 'bg-blue-100 text-blue-800',
    realizada: 'bg-green-100 text-green-800',
    cancelada: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('pt-BR')
}

const viewMeeting = (meeting) => {
  viewingMeeting.value = meeting
  showViewModal.value = true
}

const editMeeting = (meeting) => {
  editingMeeting.value = meeting
  meetingForm.value = { ...meeting }
  showEditModal.value = true
}

const deleteMeeting = (meeting) => {
  editingMeeting.value = meeting
  showDeleteModal.value = true
}

const saveMeeting = () => {
  const meetingData = {
    ...meetingForm.value,
    professorId: authStore.user.id // Professor logado
  }

  if (showAddModal.value) {
    meetingsStore.addMeeting(meetingData)
  } else {
    meetingsStore.updateMeeting(editingMeeting.value.id, meetingData)
  }
  closeModal()
}

const confirmDelete = () => {
  meetingsStore.deleteMeeting(editingMeeting.value.id)
  showDeleteModal.value = false
  editingMeeting.value = null
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingMeeting.value = null
  meetingForm.value = {
    studentId: '',
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    status: 'agendada',
    notes: ''
  }
}
</script>
