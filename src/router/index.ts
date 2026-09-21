import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ProductList from '@/views/ProductList.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/product-list',
        name: 'ProductList',
        component: ProductList
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router