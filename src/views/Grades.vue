<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Notas</h1>
        <p class="mt-2 text-sm text-gray-700">
          Gerencie as notas dos alunos por fase e critérios
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
          Lançar Nota
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
          <label for="phase" class="form-label">Fase</label>
          <select id="phase" v-model="phaseFilter" class="form-input">
            <option value="">Todas</option>
            <option value="proposta">Proposta</option>
            <option value="reelaboracao_proposta">Reelaboração Proposta</option>
            <option value="tc">TC Final</option>
            <option value="reelaboracao_tc">Reelaboração TC</option>
          </select>
        </div>
        <div>
          <label for="professor" class="form-label">Professor</label>
          <select id="professor" v-model="professorFilter" class="form-input">
            <option value="">Todos</option>
            <option v-for="professor in professors" :key="professor.id" :value="professor.id">
              {{ professor.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="search" class="form-label">Buscar</label>
          <input
            id="search"
            v-model="searchTerm"
            type="text"
            placeholder="Comentários..."
            class="form-input"
          />
        </div>
      </div>
    </div>

    <!-- Grades Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Notas Lançadas</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Visualize e gerencie todas as notas lançadas pelos professores
        </p>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aluno
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fase
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Professor
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nota Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data Avaliação
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="grade in filteredGrades" :key="grade.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ getStudentName(grade.studentId) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getPhaseClass(grade.phase)">
                  {{ getPhaseLabel(grade.phase) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getProfessorName(grade.professorId) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-900">{{ grade.totalGrade }}</span>
                  <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div class="bg-primary-600 h-2 rounded-full" :style="{ width: `${(grade.totalGrade / 10) * 100}%` }"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(grade.evaluatedAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewGrade(grade)"
                  class="text-primary-600 hover:text-primary-900 mr-3"
                >
                  Ver Detalhes
                </button>
                <button
                  @click="editGrade(grade)"
                  class="text-yellow-600 hover:text-yellow-900 mr-3"
                >
                  Editar
                </button>
                <button
                  @click="deleteGrade(grade)"
                  class="text-red-600 hover:text-red-900"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Grade Modal -->
    <Modal
      :show="showAddModal || showEditModal"
      :title="showAddModal ? 'Lançar Nota' : 'Editar Nota'"
      type="info"
      size="xl"
      @close="closeModal"
    >
      <div class="space-y-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label for="student" class="form-label">Aluno</label>
            <select id="student" v-model="gradeForm.studentId" class="form-input" required>
              <option value="">Selecione um aluno</option>
              <option v-for="student in students" :key="student.id" :value="student.id">
                {{ student.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="phase" class="form-label">Fase</label>
            <select id="phase" v-model="gradeForm.phase" class="form-input" required>
              <option value="">Selecione uma fase</option>
              <option value="proposta">Proposta</option>
              <option value="reelaboracao_proposta">Reelaboração Proposta</option>
              <option value="tc">TC Final</option>
              <option value="reelaboracao_tc">Reelaboração TC</option>
            </select>
          </div>
        </div>

        <div class="border-t pt-4">
          <h4 class="text-lg font-medium text-gray-900 mb-4">Critérios de Avaliação</h4>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="relevancia" class="form-label">Relevância (0-10)</label>
              <input
                id="relevancia"
                v-model.number="gradeForm.criteria.relevancia"
                type="number"
                min="0"
                max="10"
                step="0.1"
                class="form-input"
                required
              />
            </div>
            <div>
              <label for="metodologia" class="form-label">Metodologia (0-10)</label>
              <input
                id="metodologia"
                v-model.number="gradeForm.criteria.metodologia"
                type="number"
                min="0"
                max="10"
                step="0.1"
                class="form-input"
                required
              />
            </div>
            <div>
              <label for="estrutura" class="form-label">Estrutura (0-10)</label>
              <input
                id="estrutura"
                v-model.number="gradeForm.criteria.estrutura"
                type="number"
                min="0"
                max="10"
                step="0.1"
                class="form-input"
                required
              />
            </div>
            <div>
              <label for="linguagem" class="form-label">Linguagem (0-10)</label>
              <input
                id="linguagem"
                v-model.number="gradeForm.criteria.linguagem"
                type="number"
                min="0"
                max="10"
                step="0.1"
                class="form-input"
                required
              />
            </div>
            <div>
              <label for="bibliografia" class="form-label">Bibliografia (0-10)</label>
              <input
                id="bibliografia"
                v-model.number="gradeForm.criteria.bibliografia"
                type="number"
                min="0"
                max="10"
                step="0.1"
                class="form-input"
                required
              />
            </div>
            <div class="flex items-end">
              <div class="w-full">
                <label class="form-label">Nota Total</label>
                <div class="text-2xl font-bold text-primary-600">
                  {{ calculateTotalGrade }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label for="comments" class="form-label">Comentários</label>
          <textarea
            id="comments"
            v-model="gradeForm.comments"
            rows="3"
            class="form-input"
            placeholder="Comentários sobre a avaliação..."
          ></textarea>
        </div>
      </div>
      
      <template #actions>
        <button
          type="button"
          class="btn-primary"
          @click="saveGrade"
        >
          {{ showAddModal ? 'Lançar Nota' : 'Salvar' }}
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

    <!-- View Grade Modal -->
    <Modal
      :show="showViewModal"
      title="Detalhes da Nota"
      type="info"
      size="lg"
      @close="showViewModal = false"
    >
      <div v-if="viewingGrade" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-500">Aluno</label>
            <p class="text-sm text-gray-900">{{ getStudentName(viewingGrade.studentId) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Fase</label>
            <p class="text-sm text-gray-900">{{ getPhaseLabel(viewingGrade.phase) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Professor</label>
            <p class="text-sm text-gray-900">{{ getProfessorName(viewingGrade.professorId) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Data</label>
            <p class="text-sm text-gray-900">{{ formatDate(viewingGrade.evaluatedAt) }}</p>
          </div>
        </div>

        <div class="border-t pt-4">
          <h4 class="text-lg font-medium text-gray-900 mb-4">Critérios</h4>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Relevância:</span>
              <span class="text-sm font-medium">{{ viewingGrade.criteria.relevancia }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Metodologia:</span>
              <span class="text-sm font-medium">{{ viewingGrade.criteria.metodologia }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Estrutura:</span>
              <span class="text-sm font-medium">{{ viewingGrade.criteria.estrutura }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Linguagem:</span>
              <span class="text-sm font-medium">{{ viewingGrade.criteria.linguagem }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Bibliografia:</span>
              <span class="text-sm font-medium">{{ viewingGrade.criteria.bibliografia }}</span>
            </div>
            <div class="border-t pt-2 flex justify-between">
              <span class="text-sm font-medium text-gray-900">Nota Total:</span>
              <span class="text-lg font-bold text-primary-600">{{ viewingGrade.totalGrade }}</span>
            </div>
          </div>
        </div>

        <div v-if="viewingGrade.comments">
          <label class="text-sm font-medium text-gray-500">Comentários Gerais</label>
          <p class="text-sm text-gray-900 mt-1">{{ viewingGrade.comments }}</p>
        </div>

        <!-- Comentários por Critério -->
        <div class="border-t pt-4">
          <CriteriaComments 
            :grade-id="viewingGrade.id"
            :student-id="viewingGrade.studentId"
            :can-add-comment="authStore.userRole === 'professor' || authStore.userRole === 'coordenador'"
          />
        </div>
      </div>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal
      :show="showDeleteModal"
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir esta nota? Esta ação não pode ser desfeita."
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
import { useGradesStore } from '../stores/grades'
import { useStudentsStore } from '../stores/students'
import { useProfessorsStore } from '../stores/professors'
import { useAuthStore } from '../stores/auth'
import Modal from '../components/modals/Modal.vue'
import CriteriaComments from '../components/CriteriaComments.vue'

const gradesStore = useGradesStore()
const studentsStore = useStudentsStore()
const professorsStore = useProfessorsStore()
const authStore = useAuthStore()

const searchTerm = ref('')
const studentFilter = ref('')
const phaseFilter = ref('')
const professorFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const editingGrade = ref(null)
const viewingGrade = ref(null)

const gradeForm = ref({
  studentId: '',
  professorId: '',
  phase: '',
  criteria: {
    relevancia: 0,
    metodologia: 0,
    estrutura: 0,
    linguagem: 0,
    bibliografia: 0
  },
  comments: ''
})

const grades = computed(() => gradesStore.grades)
const students = computed(() => studentsStore.students)
const professors = computed(() => professorsStore.professors)

const filteredGrades = computed(() => {
  let filtered = grades.value

  if (studentFilter.value) {
    filtered = filtered.filter(grade => grade.studentId === parseInt(studentFilter.value))
  }

  if (phaseFilter.value) {
    filtered = filtered.filter(grade => grade.phase === phaseFilter.value)
  }

  if (professorFilter.value) {
    filtered = filtered.filter(grade => grade.professorId === parseInt(professorFilter.value))
  }

  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(grade => 
      grade.comments.toLowerCase().includes(search)
    )
  }

  return filtered
})

const calculateTotalGrade = computed(() => {
  const criteria = gradeForm.value.criteria
  const values = Object.values(criteria)
  const total = values.reduce((sum, grade) => sum + grade, 0) / values.length
  return total.toFixed(1)
})

const getStudentName = (studentId) => {
  const student = students.value.find(s => s.id === studentId)
  return student ? student.name : 'Aluno não encontrado'
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

const getPhaseClass = (phase) => {
  const classes = {
    proposta: 'bg-blue-100 text-blue-800',
    reelaboracao_proposta: 'bg-yellow-100 text-yellow-800',
    tc: 'bg-green-100 text-green-800',
    reelaboracao_tc: 'bg-purple-100 text-purple-800'
  }
  return classes[phase] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const viewGrade = (grade) => {
  viewingGrade.value = grade
  showViewModal.value = true
}

const editGrade = (grade) => {
  editingGrade.value = grade
  gradeForm.value = { ...grade }
  showEditModal.value = true
}

const deleteGrade = (grade) => {
  editingGrade.value = grade
  showDeleteModal.value = true
}

const saveGrade = () => {
  const gradeData = {
    ...gradeForm.value,
    professorId: authStore.user.id // Professor logado
  }

  if (showAddModal.value) {
    gradesStore.addGrade(gradeData)
  } else {
    gradesStore.updateGrade(editingGrade.value.id, gradeData)
  }
  closeModal()
}

const confirmDelete = () => {
  gradesStore.deleteGrade(editingGrade.value.id)
  showDeleteModal.value = false
  editingGrade.value = null
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingGrade.value = null
  gradeForm.value = {
    studentId: '',
    professorId: '',
    phase: '',
    criteria: {
      relevancia: 0,
      metodologia: 0,
      estrutura: 0,
      linguagem: 0,
      bibliografia: 0
    },
    comments: ''
  }
}
</script>
