import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMeetingsStore = defineStore('meetings', () => {
    const meetings = ref([
        {
            id: 1,
            studentId: 1,
            professorId: 1,
            title: 'Reunião de Orientação - Proposta',
            description: 'Discussão sobre a estrutura da proposta de TC',
            date: '2024-02-15',
            time: '14:00',
            duration: 60,
            status: 'realizada',
            documents: [
                {
                    id: 1,
                    name: 'proposta_inicial.pdf',
                    url: '/documents/proposta_inicial.pdf',
                    uploadedAt: '2024-02-15T14:30:00'
                }
            ],
            notes: 'Aluno apresentou ideia inicial. Orientador sugeriu melhorias na metodologia.',
            createdAt: '2024-02-10',
            updatedAt: '2024-02-15'
        },
        {
            id: 2,
            studentId: 1,
            professorId: 1,
            title: 'Reunião de Orientação - Desenvolvimento',
            description: 'Acompanhamento do desenvolvimento do projeto',
            date: '2024-03-20',
            time: '15:00',
            duration: 45,
            status: 'agendada',
            documents: [],
            notes: '',
            createdAt: '2024-03-15',
            updatedAt: '2024-03-15'
        },
        {
            id: 3,
            studentId: 2,
            professorId: 2,
            title: 'Reunião de Orientação - Revisão',
            description: 'Revisão da reelaboração da proposta',
            date: '2024-04-05',
            time: '10:00',
            duration: 30,
            status: 'realizada',
            documents: [
                {
                    id: 2,
                    name: 'proposta_revisada.pdf',
                    url: '/documents/proposta_revisada.pdf',
                    uploadedAt: '2024-04-05T10:15:00'
                }
            ],
            notes: 'Proposta revisada está muito melhor. Pronto para submissão.',
            createdAt: '2024-04-01',
            updatedAt: '2024-04-05'
        }
    ])

    const getMeetingsByStudent = (studentId) => {
        return meetings.value.filter(meeting => meeting.studentId === studentId)
    }

    const getMeetingsByProfessor = (professorId) => {
        return meetings.value.filter(meeting => meeting.professorId === professorId)
    }

    const getMeetingsByStatus = (status) => {
        return meetings.value.filter(meeting => meeting.status === status)
    }

    const getUpcomingMeetings = () => {
        const today = new Date().toISOString().split('T')[0]
        return meetings.value.filter(meeting =>
            meeting.date >= today && meeting.status === 'agendada'
        ).sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    const addMeeting = (meetingData) => {
        const newMeeting = {
            id: Date.now(),
            ...meetingData,
            status: 'agendada',
            documents: [],
            notes: '',
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        }
        meetings.value.push(newMeeting)
        return newMeeting
    }

    const updateMeeting = (id, meetingData) => {
        const index = meetings.value.findIndex(meeting => meeting.id === id)
        if (index !== -1) {
            meetings.value[index] = {
                ...meetings.value[index],
                ...meetingData,
                updatedAt: new Date().toISOString().split('T')[0]
            }
            return meetings.value[index]
        }
        return null
    }

    const addDocumentToMeeting = (meetingId, document) => {
        const meeting = meetings.value.find(m => m.id === meetingId)
        if (meeting) {
            const newDocument = {
                id: Date.now(),
                ...document,
                uploadedAt: new Date().toISOString()
            }
            meeting.documents.push(newDocument)
            meeting.updatedAt = new Date().toISOString().split('T')[0]
            return newDocument
        }
        return null
    }

    const deleteMeeting = (id) => {
        const index = meetings.value.findIndex(meeting => meeting.id === id)
        if (index !== -1) {
            meetings.value.splice(index, 1)
            return true
        }
        return false
    }

    return {
        meetings,
        getMeetingsByStudent,
        getMeetingsByProfessor,
        getMeetingsByStatus,
        getUpcomingMeetings,
        addMeeting,
        updateMeeting,
        addDocumentToMeeting,
        deleteMeeting
    }
})
