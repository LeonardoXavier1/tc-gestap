import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStudentsStore = defineStore('students', () => {
    const students = ref([
        {
            id: 1,
            name: 'Ana Silva',
            email: 'ana.silva@email.com',
            registration: '2021001',
            course: 'Ciência da Computação',
            advisorId: 1,
            status: 'ativo',
            createdAt: '2024-01-15',
            tcTitle: 'Sistema de Gestão Acadêmica',
            tcDescription: 'Desenvolvimento de um sistema web para gestão de atividades acadêmicas'
        },
        {
            id: 2,
            name: 'Carlos Oliveira',
            email: 'carlos.oliveira@email.com',
            registration: '2021002',
            course: 'Engenharia de Software',
            advisorId: 2,
            status: 'ativo',
            createdAt: '2024-01-20',
            tcTitle: 'Aplicativo Mobile para Delivery',
            tcDescription: 'Desenvolvimento de aplicativo mobile para serviços de delivery'
        },
        {
            id: 3,
            name: 'Mariana Costa',
            email: 'mariana.costa@email.com',
            registration: '2021003',
            course: 'Sistemas de Informação',
            advisorId: 1,
            status: 'ativo',
            createdAt: '2024-02-01',
            tcTitle: 'Plataforma de E-commerce',
            tcDescription: 'Desenvolvimento de plataforma completa de e-commerce'
        }
    ])

    const getStudentById = (id) => {
        return students.value.find(student => student.id === id)
    }

    const getStudentsByAdvisor = (advisorId) => {
        return students.value.filter(student => student.advisorId === advisorId)
    }

    const addStudent = (studentData) => {
        const newStudent = {
            id: Date.now(),
            ...studentData,
            status: 'ativo',
            createdAt: new Date().toISOString().split('T')[0]
        }
        students.value.push(newStudent)
        return newStudent
    }

    const updateStudent = (id, studentData) => {
        const index = students.value.findIndex(student => student.id === id)
        if (index !== -1) {
            students.value[index] = { ...students.value[index], ...studentData }
            return students.value[index]
        }
        return null
    }

    const deleteStudent = (id) => {
        const index = students.value.findIndex(student => student.id === id)
        if (index !== -1) {
            students.value.splice(index, 1)
            return true
        }
        return false
    }

    return {
        students,
        getStudentById,
        getStudentsByAdvisor,
        addStudent,
        updateStudent,
        deleteStudent
    }
})
