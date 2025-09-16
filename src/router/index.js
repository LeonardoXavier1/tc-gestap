import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        component: () => import('../layouts/MainLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('../views/Dashboard.vue')
            },
            {
                path: '/alunos',
                name: 'Alunos',
                component: () => import('../views/Students.vue'),
                meta: { roles: ['coordenador', 'professor'] }
            },
            {
                path: '/professores',
                name: 'Professores',
                component: () => import('../views/Professors.vue'),
                meta: { roles: ['coordenador'] }
            },
            {
                path: '/cronograma',
                name: 'Cronograma',
                component: () => import('../views/Schedule.vue'),
                meta: { roles: ['coordenador'] }
            },
            {
                path: '/banca',
                name: 'Banca',
                component: () => import('../views/Committee.vue'),
                meta: { roles: ['coordenador'] }
            },
            {
                path: '/notas',
                name: 'Notas',
                component: () => import('../views/Grades.vue'),
                meta: { roles: ['professor', 'coordenador'] }
            },
            {
                path: '/reunioes',
                name: 'Reuniões',
                component: () => import('../views/Meetings.vue'),
                meta: { roles: ['professor', 'coordenador'] }
            },
            {
                path: '/meu-tc',
                name: 'MeuTC',
                component: () => import('../views/MyTC.vue'),
                meta: { roles: ['aluno'] }
            },
            {
                path: '/meus-comentarios',
                name: 'MeusComentarios',
                component: () => import('../views/MyComments.vue'),
                meta: { roles: ['aluno'] }
            },
            {
                path: '/sugerir-professores',
                name: 'ProfessorSuggestions',
                component: () => import('../views/ProfessorSuggestions.vue'),
                meta: { roles: ['aluno'] }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // Se a rota requer autenticação
    if (to.meta.requiresAuth !== false) {
        if (!authStore.isAuthenticated) {
            next('/login')
            return
        }

        // Verificar se o usuário tem permissão para acessar a rota
        if (to.meta.roles && !to.meta.roles.includes(authStore.userRole)) {
            next('/')
            return
        }
    }

    // Se já está autenticado e tenta acessar login, redirecionar para dashboard
    if (to.name === 'Login' && authStore.isAuthenticated) {
        next('/')
        return
    }

    next()
})

export default router
