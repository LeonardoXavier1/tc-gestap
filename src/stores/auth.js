import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)

    const isAuthenticated = computed(() => !!user.value && !!token.value)

    const userRole = computed(() => user.value?.role || null)

    const login = async (email, password) => {
        // Mock de autenticação - em produção seria uma chamada à API
        const mockUsers = [
            {
                id: 1,
                name: 'João Silva',
                email: 'coordenador@tc.com',
                password: '123456',
                role: 'coordenador'
            },
            {
                id: 2,
                name: 'Maria Santos',
                email: 'professor@tc.com',
                password: '123456',
                role: 'professor'
            },
            {
                id: 3,
                name: 'Pedro Costa',
                email: 'aluno@tc.com',
                password: '123456',
                role: 'aluno'
            }
        ]

        const foundUser = mockUsers.find(u => u.email === email && u.password === password)

        if (foundUser) {
            const { password, ...userWithoutPassword } = foundUser
            user.value = userWithoutPassword
            token.value = 'mock-token-' + Date.now()
            localStorage.setItem('token', token.value)
            localStorage.setItem('user', JSON.stringify(userWithoutPassword))
            return { success: true, user: userWithoutPassword }
        }

        return { success: false, error: 'Credenciais inválidas' }
    }

    const logout = () => {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    const initializeAuth = () => {
        const savedUser = localStorage.getItem('user')
        const savedToken = localStorage.getItem('token')

        if (savedUser && savedToken) {
            user.value = JSON.parse(savedUser)
            token.value = savedToken
        }
    }

    return {
        user,
        token,
        isAuthenticated,
        userRole,
        login,
        logout,
        initializeAuth
    }
})
