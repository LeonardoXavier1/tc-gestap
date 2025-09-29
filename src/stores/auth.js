import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const userRole = computed(() => user.value?.role || null)

  const login = async (email, password) => {
    try {
      const resp = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      })
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}))
        return { success:false, error: err.detail || 'Credenciais inválidas' }
      }
      const data = await resp.json()
      user.value = data.user
      token.value = data.token
      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('token', token.value)
      return { success:true, user: data.user }
    } catch (e) {
      return { success:false, error:'Falha na requisição' }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser)
      token.value = savedToken
    }
  }

  return { user, token, isAuthenticated, userRole, login, logout, initializeAuth }
})
