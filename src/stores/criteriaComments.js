import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCriteriaCommentsStore = defineStore('criteriaComments', () => {
    const comments = ref([
        {
            id: 1,
            studentId: 1,
            gradeId: 1,
            criteria: 'relevancia',
            comment: 'O tema é muito relevante para a área de computação, mas poderia ter uma abordagem mais inovadora.',
            authorId: 1,
            authorRole: 'professor',
            authorName: 'Dr. João Silva',
            createdAt: '2024-03-12T10:30:00Z',
            updatedAt: '2024-03-12T10:30:00Z'
        },
        {
            id: 2,
            studentId: 1,
            gradeId: 1,
            criteria: 'metodologia',
            comment: 'A metodologia está bem estruturada, mas seria interessante incluir mais detalhes sobre a coleta de dados.',
            authorId: 1,
            authorRole: 'professor',
            authorName: 'Dr. João Silva',
            createdAt: '2024-03-12T10:35:00Z',
            updatedAt: '2024-03-12T10:35:00Z'
        },
        {
            id: 3,
            studentId: 1,
            gradeId: 2,
            criteria: 'estrutura',
            comment: 'Excelente organização do documento. A estrutura está muito clara e bem definida.',
            authorId: 2,
            authorRole: 'professor',
            authorName: 'Dra. Maria Santos',
            createdAt: '2024-03-13T14:20:00Z',
            updatedAt: '2024-03-13T14:20:00Z'
        },
        {
            id: 4,
            studentId: 1,
            gradeId: 1,
            criteria: 'relevancia',
            comment: 'Concordo com o professor João. O tema é relevante, mas precisa de mais inovação.',
            authorId: 1,
            authorRole: 'coordenador',
            authorName: 'Dr. João Silva',
            createdAt: '2024-03-14T09:15:00Z',
            updatedAt: '2024-03-14T09:15:00Z'
        }
    ])

    // Obter comentários por aluno
    const getCommentsByStudent = (studentId) => {
        return comments.value.filter(comment => comment.studentId === studentId)
    }

    // Obter comentários por critério específico de uma nota
    const getCommentsByGradeAndCriteria = (gradeId, criteria) => {
        return comments.value.filter(comment =>
            comment.gradeId === gradeId && comment.criteria === criteria
        )
    }

    // Obter comentários por nota
    const getCommentsByGrade = (gradeId) => {
        return comments.value.filter(comment => comment.gradeId === gradeId)
    }

    // Obter comentários por autor
    const getCommentsByAuthor = (authorId) => {
        return comments.value.filter(comment => comment.authorId === authorId)
    }

    // Adicionar novo comentário
    const addComment = (commentData) => {
        const newComment = {
            id: Date.now(),
            ...commentData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        comments.value.push(newComment)
        return newComment
    }

    // Atualizar comentário
    const updateComment = (id, commentData) => {
        const index = comments.value.findIndex(comment => comment.id === id)
        if (index !== -1) {
            comments.value[index] = {
                ...comments.value[index],
                ...commentData,
                updatedAt: new Date().toISOString()
            }
            return comments.value[index]
        }
        return null
    }

    // Excluir comentário
    const deleteComment = (id) => {
        const index = comments.value.findIndex(comment => comment.id === id)
        if (index !== -1) {
            comments.value.splice(index, 1)
            return true
        }
        return false
    }

    // Obter estatísticas de comentários por aluno
    const getCommentStatsByStudent = (studentId) => {
        const studentComments = getCommentsByStudent(studentId)
        const stats = {
            total: studentComments.length,
            byCriteria: {},
            byAuthor: {}
        }

        studentComments.forEach(comment => {
            // Contar por critério
            if (!stats.byCriteria[comment.criteria]) {
                stats.byCriteria[comment.criteria] = 0
            }
            stats.byCriteria[comment.criteria]++

            // Contar por autor
            if (!stats.byAuthor[comment.authorName]) {
                stats.byAuthor[comment.authorName] = 0
            }
            stats.byAuthor[comment.authorName]++
        })

        return stats
    }

    // Verificar se o usuário pode editar/excluir o comentário
    const canEditComment = (commentId, userId, userRole) => {
        const comment = comments.value.find(c => c.id === commentId)
        if (!comment) return false

        // Coordenador pode editar qualquer comentário
        if (userRole === 'coordenador') return true

        // Professor pode editar apenas seus próprios comentários
        if (userRole === 'professor' && comment.authorId === userId) return true

        return false
    }

    return {
        comments,
        getCommentsByStudent,
        getCommentsByGradeAndCriteria,
        getCommentsByGrade,
        getCommentsByAuthor,
        addComment,
        updateComment,
        deleteComment,
        getCommentStatsByStudent,
        canEditComment
    }
})
