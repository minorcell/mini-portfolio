import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/2048-game',
        name: '2048-game',
        component: () => import('../pages/2048.vue'),
    },
    {
        path: '/paint-board',
        name: 'paint-board',
        component: () => import('../pages/PaintBoard.vue'),
    },
    {
        path: "/image-convert",
        name: "image-convert",
        component: () => import('../pages/ImageConvert.vue')
    },
    {
        path: "/qrcode",
        name: "qrcode",
        component: () => import('../pages/QRCode.vue')
    },
    {
        path: "/file-convert",
        name: "file-convert",
        component: () => import('../pages/FileConvert.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;