import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfessorSuggestionsStore = defineStore('professorSuggestions', () => {
    const suggestions = ref([
        {
            id: 1,
            studentId: 1, // Ana Silva
            professor1Id: 1, // Dr. João Silva
            professor2Id: 2, // Dra. Maria Santos
            status: 'pending', // pending, approved, rejected
            createdAt: '2024-02-15',
            updatedAt: '2024-02-15'
        },
        {
            id: 2,
            studentId: 2, // Carlos Oliveira
            professor1Id: 2, // Dra. Maria Santos
            professor2Id: 3, // Dr. Pedro Costa
            status: 'pending',
            createdAt: '2024-02-20',
            updatedAt: '2024-02-20'
        },
        {
            id: 3,
            studentId: 3, // Mariana Costa
            professor1Id: 1, // Dr. João Silva
            professor2Id: 4, // Dra. Ana Oliveira
            status: 'pending',
            createdAt: '2024-03-01',
            updatedAt: '2024-03-01'
        }
    ])

    // Lista de professores disponíveis para avaliação (definida pelo coordenador)
    const availableProfessors = ref([
        { id: 1, name: 'Dr. João Silva', department: 'Ciência da Computação', specialization: 'Desenvolvimento Web' },
        { id: 2, name: 'Dra. Maria Santos', department: 'Engenharia de Software', specialization: 'Arquitetura de Software' },
        { id: 3, name: 'Dr. Pedro Costa', department: 'Sistemas de Informação', specialization: 'Banco de Dados' },
        { id: 4, name: 'Dra. Ana Oliveira', department: 'Ciência da Computação', specialization: 'Inteligência Artificial' },
        { id: 5, name: 'Dr. Carlos Mendes', department: 'Engenharia de Software', specialization: 'Testes de Software' },
        { id: 6, name: 'Dra. Fernanda Lima', department: 'Sistemas de Informação', specialization: 'Gestão de Projetos' },
        { id: 7, name: 'Dr. Roberto Alves', department: 'Ciência da Computação', specialization: 'Redes de Computadores' },
        { id: 8, name: 'Dra. Juliana Ferreira', department: 'Engenharia de Software', specialization: 'Engenharia de Requisitos' },
        { id: 9, name: 'Dr. Marcelo Souza', department: 'Sistemas de Informação', specialization: 'Segurança da Informação' },
        { id: 10, name: 'Dra. Patricia Rocha', department: 'Ciência da Computação', specialization: 'Computação Gráfica' }
    ])

    const getSuggestionsByStudent = (studentId) => {
        return suggestions.value.find(suggestion => suggestion.studentId === studentId)
    }

    const getSuggestionsByProfessor = (professorId) => {
        return suggestions.value.filter(suggestion =>
            suggestion.professor1Id === professorId || suggestion.professor2Id === professorId
        )
    }

    const addSuggestion = (suggestionData) => {
        const newSuggestion = {
            id: Date.now(),
            ...suggestionData,
            status: 'pending',
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        }
        suggestions.value.push(newSuggestion)
        return newSuggestion
    }

    const updateSuggestion = (id, suggestionData) => {
        const index = suggestions.value.findIndex(suggestion => suggestion.id === id)
        if (index !== -1) {
            suggestions.value[index] = {
                ...suggestions.value[index],
                ...suggestionData,
                updatedAt: new Date().toISOString().split('T')[0]
            }
            return suggestions.value[index]
        }
        return null
    }

    const deleteSuggestion = (id) => {
        const index = suggestions.value.findIndex(suggestion => suggestion.id === id)
        if (index !== -1) {
            suggestions.value.splice(index, 1)
            return true
        }
        return false
    }

    const getAvailableProfessors = () => {
        return availableProfessors.value
    }

    const updateAvailableProfessors = (professors) => {
        availableProfessors.value = professors
    }

    const isProfessorSuggestedByStudent = (studentId, professorId) => {
        const suggestion = getSuggestionsByStudent(studentId)
        if (!suggestion) return false
        return suggestion.professor1Id === professorId || suggestion.professor2Id === professorId
    }

    const getSuggestedProfessorsForStudent = (studentId) => {
        const suggestion = getSuggestionsByStudent(studentId)
        if (!suggestion) return []

        return availableProfessors.value.filter(professor =>
            professor.id === suggestion.professor1Id || professor.id === suggestion.professor2Id
        )
    }

    return {
        suggestions,
        availableProfessors,
        getSuggestionsByStudent,
        getSuggestionsByProfessor,
        addSuggestion,
        updateSuggestion,
        deleteSuggestion,
        getAvailableProfessors,
        updateAvailableProfessors,
        isProfessorSuggestedByStudent,
        getSuggestedProfessorsForStudent
    }
})
