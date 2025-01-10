import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/2048-game',
        component: () => import('../pages/2048.vue'),
    },
    {
        path: '/paint-board',
        component: () => import('../pages/PaintBoard.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router