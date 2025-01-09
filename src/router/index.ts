import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/2048',
        component: () => import('../pages/2048.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router