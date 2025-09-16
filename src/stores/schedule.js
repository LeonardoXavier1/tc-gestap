import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
    const schedule = ref({
        id: 1,
        semester: '2024.1',
        proposalDeadline: '2024-03-15',
        proposalRevisionDeadline: '2024-04-15',
        tcDeadline: '2024-06-15',
        tcRevisionDeadline: '2024-07-15',
        proposalEvaluationDays: 7,
        proposalRevisionEvaluationDays: 7,
        tcEvaluationDays: 14,
        tcRevisionEvaluationDays: 14,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    })

    const evaluationCommittee = ref({
        id: 1,
        professor1Id: 1,
        professor2Id: 2,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    })

    const getDeadlineStatus = computed(() => {
        const now = new Date()
        const deadlines = {
            proposal: new Date(schedule.value.proposalDeadline),
            proposalRevision: new Date(schedule.value.proposalRevisionDeadline),
            tc: new Date(schedule.value.tcDeadline),
            tcRevision: new Date(schedule.value.tcRevisionDeadline)
        }

        const status = {}
        Object.keys(deadlines).forEach(key => {
            const deadline = deadlines[key]
            const diffTime = deadline - now
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

            if (diffDays < 0) {
                status[key] = { status: 'overdue', days: Math.abs(diffDays) }
            } else if (diffDays <= 7) {
                status[key] = { status: 'warning', days: diffDays }
            } else {
                status[key] = { status: 'ok', days: diffDays }
            }
        })

        return status
    })

    const updateSchedule = (scheduleData) => {
        schedule.value = {
            ...schedule.value,
            ...scheduleData,
            updatedAt: new Date().toISOString().split('T')[0]
        }
        return schedule.value
    }

    const updateEvaluationCommittee = (committeeData) => {
        evaluationCommittee.value = {
            ...evaluationCommittee.value,
            ...committeeData,
            updatedAt: new Date().toISOString().split('T')[0]
        }
        return evaluationCommittee.value
    }

    return {
        schedule,
        evaluationCommittee,
        getDeadlineStatus,
        updateSchedule,
        updateEvaluationCommittee
    }
})
