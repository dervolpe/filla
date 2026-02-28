import { createRouter, createWebHistory } from 'vue-router'
import MonitorView from '../views/Monitor.vue'
import AtendenteView from '../views/Atendente.vue'
import TriagemView from '../views/Triagem.vue'
import AdminView from '../views/Admin.vue'
import LoginView from '../views/Login.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiresAuth: false }
        },
        {
            path: '/monitor',
            name: 'monitor',
            component: MonitorView,
            meta: { requiresAuth: false }
        },
        {
            path: '/atendente',
            name: 'atendente',
            component: AtendenteView,
            meta: { requiresAuth: true }
        },
        {
            path: '/triagem',
            name: 'triagem',
            component: TriagemView,
            meta: { requiresAuth: false }
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView,
            meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
            path: '/',
            redirect: '/login'
        }
    ],
})

// Guards Globais
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('filas_token');
    const userStr = localStorage.getItem('filas_user');
    let user = null;

    if (userStr) {
        try { user = JSON.parse(userStr); } catch (e) { }
    }

    if (to.meta.requiresAuth && !token) {
        next('/login');
    } else if (to.meta.requiresAdmin && (!user || (user.role !== 'ADMIN' && user.role !== 'GERENTE'))) {
        alert("Acesso Negado: Você não tem permissões de Admin.");
        next('/login');
    } else if (to.path === '/login' && token) {
        if (user && (user.role === 'ADMIN' || user.role === 'GERENTE')) {
            next('/admin');
        } else {
            next('/atendente');
        }
    } else {
        next();
    }
});

export default router
