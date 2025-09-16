<template>
  <div class="space-y-4">
    <!-- Header com botão para adicionar comentário -->
    <div class="flex justify-between items-center">
      <h4 class="text-lg font-medium text-gray-900">
        Comentários por Critério
      </h4>
      <button
        v-if="canAddComment"
        @click="showAddCommentModal = true"
        class="btn-primary text-sm"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Adicionar Comentário
      </button>
    </div>

    <!-- Lista de comentários por critério -->
    <div class="space-y-4">
      <div 
        v-for="criteria in criteriaList" 
        :key="criteria.key"
        class="border rounded-lg p-4"
      >
        <div class="flex justify-between items-center mb-3">
          <h5 class="font-medium text-gray-900">{{ criteria.label }}</h5>
          <span class="text-sm text-gray-500">
            {{ getCommentsByCriteria(criteria.key).length }} comentário(s)
          </span>
        </div>

        <!-- Comentários do critério -->
        <div v-if="getCommentsByCriteria(criteria.key).length > 0" class="space-y-3">
          <div 
            v-for="comment in getCommentsByCriteria(criteria.key)" 
            :key="comment.id"
            class="bg-gray-50 rounded-lg p-3"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-900">{{ comment.authorName }}</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" 
                      :class="getAuthorRoleClass(comment.authorRole)">
                  {{ getAuthorRoleLabel(comment.authorRole) }}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                <div v-if="canEditComment(comment.id)" class="flex space-x-1">
                  <button
                    @click="editComment(comment)"
                    class="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    Editar
                  </button>
                  <button
                    @click="deleteComment(comment)"
                    class="text-red-600 hover:text-red-800 text-xs"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-700">{{ comment.comment }}</p>
          </div>
        </div>

        <!-- Mensagem quando não há comentários -->
        <div v-else class="text-center py-4 text-gray-500 text-sm">
          Nenhum comentário para este critério
        </div>
      </div>
    </div>

    <!-- Modal para adicionar/editar comentário -->
    <Modal
      :show="showAddCommentModal || showEditCommentModal"
      :title="showAddCommentModal ? 'Adicionar Comentário' : 'Editar Comentário'"
      type="info"
      size="lg"
      @close="closeCommentModal"
    >
      <div class="space-y-4">
        <div>
          <label for="criteria" class="form-label">Critério</label>
          <select 
            id="criteria" 
            v-model="commentForm.criteria" 
            class="form-input"
            :disabled="showEditCommentModal"
            required
          >
            <option value="">Selecione um critério</option>
            <option 
              v-for="criteria in criteriaList" 
              :key="criteria.key" 
              :value="criteria.key"
            >
              {{ criteria.label }}
            </option>
          </select>
        </div>

        <div>
          <label for="comment" class="form-label">Comentário</label>
          <textarea
            id="comment"
            v-model="commentForm.comment"
            rows="4"
            class="form-input"
            placeholder="Digite seu comentário sobre este critério..."
            required
          ></textarea>
        </div>
      </div>

      <template #actions>
        <button
          type="button"
          class="btn-primary"
          @click="saveComment"
        >
          {{ showAddCommentModal ? 'Adicionar' : 'Salvar' }}
        </button>
        <button
          type="button"
          class="btn-secondary"
          @click="closeCommentModal"
        >
          Cancelar
        </button>
      </template>
    </Modal>

    <!-- Modal de confirmação para exclusão -->
    <Modal
      :show="showDeleteModal"
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita."
      type="error"
      confirm-text="Excluir"
      cancel-text="Cancelar"
      @close="showDeleteModal = false"
      @confirm="confirmDeleteComment"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCriteriaCommentsStore } from '../stores/criteriaComments'
import { useAuthStore } from '../stores/auth'
import Modal from './modals/Modal.vue'

const props = defineProps({
  gradeId: {
    type: Number,
    required: true
  },
  studentId: {
    type: Number,
    required: true
  },
  canAddComment: {
    type: Boolean,
    default: true
  }
})

const criteriaCommentsStore = useCriteriaCommentsStore()
const authStore = useAuthStore()

const showAddCommentModal = ref(false)
const showEditCommentModal = ref(false)
const showDeleteModal = ref(false)
const editingComment = ref(null)

const commentForm = ref({
  criteria: '',
  comment: ''
})

// Lista de critérios disponíveis
const criteriaList = [
  { key: 'relevancia', label: 'Relevância' },
  { key: 'metodologia', label: 'Metodologia' },
  { key: 'estrutura', label: 'Estrutura' },
  { key: 'linguagem', label: 'Linguagem' },
  { key: 'bibliografia', label: 'Bibliografia' }
]

// Obter comentários por critério específico
const getCommentsByCriteria = (criteria) => {
  return criteriaCommentsStore.getCommentsByGradeAndCriteria(props.gradeId, criteria)
}

// Verificar se pode editar comentário
const canEditComment = (commentId) => {
  return criteriaCommentsStore.canEditComment(commentId, authStore.user.id, authStore.userRole)
}

// Obter classe CSS para o papel do autor
const getAuthorRoleClass = (role) => {
  const classes = {
    professor: 'bg-blue-100 text-blue-800',
    coordenador: 'bg-purple-100 text-purple-800',
    aluno: 'bg-green-100 text-green-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

// Obter label para o papel do autor
const getAuthorRoleLabel = (role) => {
  const labels = {
    professor: 'Professor',
    coordenador: 'Coordenador',
    aluno: 'Aluno'
  }
  return labels[role] || role
}

// Formatar data
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

// Adicionar novo comentário
const addComment = () => {
  showAddCommentModal.value = true
  commentForm.value = {
    criteria: '',
    comment: ''
  }
}

// Editar comentário
const editComment = (comment) => {
  editingComment.value = comment
  commentForm.value = {
    criteria: comment.criteria,
    comment: comment.comment
  }
  showEditCommentModal.value = true
}

// Excluir comentário
const deleteComment = (comment) => {
  editingComment.value = comment
  showDeleteModal.value = true
}

// Salvar comentário
const saveComment = () => {
  if (!commentForm.value.criteria || !commentForm.value.comment.trim()) {
    return
  }

  const commentData = {
    studentId: props.studentId,
    gradeId: props.gradeId,
    criteria: commentForm.value.criteria,
    comment: commentForm.value.comment.trim(),
    authorId: authStore.user.id,
    authorRole: authStore.userRole,
    authorName: authStore.user.name
  }

  if (showAddCommentModal.value) {
    criteriaCommentsStore.addComment(commentData)
  } else {
    criteriaCommentsStore.updateComment(editingComment.value.id, commentData)
  }

  closeCommentModal()
}

// Confirmar exclusão
const confirmDeleteComment = () => {
  criteriaCommentsStore.deleteComment(editingComment.value.id)
  showDeleteModal.value = false
  editingComment.value = null
}

// Fechar modal
const closeCommentModal = () => {
  showAddCommentModal.value = false
  showEditCommentModal.value = false
  editingComment.value = null
  commentForm.value = {
    criteria: '',
    comment: ''
  }
}
</script>
