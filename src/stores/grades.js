import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGradesStore = defineStore('grades', () => {
    const grades = ref([
        {
            id: 1,
            studentId: 1,
            professorId: 1,
            phase: 'proposta',
            criteria: {
                relevancia: 8.5,
                metodologia: 7.0,
                estrutura: 8.0,
                linguagem: 7.5,
                bibliografia: 8.0
            },
            totalGrade: 7.8,
            comments: 'Boa proposta, mas precisa melhorar a metodologia.',
            submittedAt: '2024-03-10',
            evaluatedAt: '2024-03-12'
        },
        {
            id: 2,
            studentId: 1,
            professorId: 2,
            phase: 'proposta',
            criteria: {
                relevancia: 9.0,
                metodologia: 8.0,
                estrutura: 8.5,
                linguagem: 8.0,
                bibliografia: 8.5
            },
            totalGrade: 8.4,
            comments: 'Excelente proposta, muito bem estruturada.',
            submittedAt: '2024-03-10',
            evaluatedAt: '2024-03-13'
        },
        {
            id: 3,
            studentId: 2,
            professorId: 1,
            phase: 'reelaboracao_proposta',
            criteria: {
                relevancia: 8.0,
                metodologia: 8.5,
                estrutura: 8.0,
                linguagem: 7.0,
                bibliografia: 8.0
            },
            totalGrade: 7.9,
            comments: 'Melhorias significativas na metodologia.',
            submittedAt: '2024-04-10',
            evaluatedAt: '2024-04-12'
        }
    ])

    const getGradesByStudent = (studentId) => {
        return grades.value.filter(grade => grade.studentId === studentId)
    }

    const getGradesByProfessor = (professorId) => {
        return grades.value.filter(grade => grade.professorId === professorId)
    }

    const getGradesByPhase = (phase) => {
        return grades.value.filter(grade => grade.phase === phase)
    }

    const getGradeByStudentAndPhase = (studentId, phase) => {
        return grades.value.find(grade => grade.studentId === studentId && grade.phase === phase)
    }

    const addGrade = (gradeData) => {
        const newGrade = {
            id: Date.now(),
            ...gradeData,
            evaluatedAt: new Date().toISOString().split('T')[0]
        }

        // Calcular nota total baseada nos critérios
        const criteriaValues = Object.values(newGrade.criteria)
        newGrade.totalGrade = (criteriaValues.reduce((sum, grade) => sum + grade, 0) / criteriaValues.length).toFixed(1)

        grades.value.push(newGrade)
        return newGrade
    }

    const updateGrade = (id, gradeData) => {
        const index = grades.value.findIndex(grade => grade.id === id)
        if (index !== -1) {
            const updatedGrade = { ...grades.value[index], ...gradeData }

            // Recalcular nota total se os critérios foram alterados
            if (gradeData.criteria) {
                const criteriaValues = Object.values(updatedGrade.criteria)
                updatedGrade.totalGrade = (criteriaValues.reduce((sum, grade) => sum + grade, 0) / criteriaValues.length).toFixed(1)
            }

            grades.value[index] = updatedGrade
            return updatedGrade
        }
        return null
    }

    const deleteGrade = (id) => {
        const index = grades.value.findIndex(grade => grade.id === id)
        if (index !== -1) {
            grades.value.splice(index, 1)
            return true
        }
        return false
    }

    return {
        grades,
        getGradesByStudent,
        getGradesByProfessor,
        getGradesByPhase,
        getGradeByStudentAndPhase,
        addGrade,
        updateGrade,
        deleteGrade
    }
})
