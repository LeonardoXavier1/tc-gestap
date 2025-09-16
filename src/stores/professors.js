import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfessorsStore = defineStore('professors', () => {
    const professors = ref([
        {
            id: 1,
            name: 'Dr. João Silva',
            email: 'joao.silva@universidade.edu.br',
            department: 'Ciência da Computação',
            specialization: 'Desenvolvimento Web',
            status: 'ativo',
            createdAt: '2024-01-01'
        },
        {
            id: 2,
            name: 'Dra. Maria Santos',
            email: 'maria.santos@universidade.edu.br',
            department: 'Engenharia de Software',
            specialization: 'Arquitetura de Software',
            status: 'ativo',
            createdAt: '2024-01-01'
        },
        {
            id: 3,
            name: 'Dr. Pedro Costa',
            email: 'pedro.costa@universidade.edu.br',
            department: 'Sistemas de Informação',
            specialization: 'Banco de Dados',
            status: 'ativo',
            createdAt: '2024-01-01'
        },
        {
            id: 4,
            name: 'Dra. Ana Oliveira',
            email: 'ana.oliveira@universidade.edu.br',
            department: 'Ciência da Computação',
            specialization: 'Inteligência Artificial',
            status: 'ativo',
            createdAt: '2024-01-01'
        }
    ])

    const getProfessorById = (id) => {
        return professors.value.find(professor => professor.id === id)
    }

    const addProfessor = (professorData) => {
        const newProfessor = {
            id: Date.now(),
            ...professorData,
            status: 'ativo',
            createdAt: new Date().toISOString().split('T')[0]
        }
        professors.value.push(newProfessor)
        return newProfessor
    }

    const updateProfessor = (id, professorData) => {
        const index = professors.value.findIndex(professor => professor.id === id)
        if (index !== -1) {
            professors.value[index] = { ...professors.value[index], ...professorData }
            return professors.value[index]
        }
        return null
    }

    const deleteProfessor = (id) => {
        const index = professors.value.findIndex(professor => professor.id === id)
        if (index !== -1) {
            professors.value.splice(index, 1)
            return true
        }
        return false
    }

    return {
        professors,
        getProfessorById,
        addProfessor,
        updateProfessor,
        deleteProfessor
    }
})
