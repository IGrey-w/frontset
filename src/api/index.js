import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    timeout: 10000
})

// 请求拦截器：自动携带用户信息标识（如需 Token 可在此添加）
api.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (user) {
        // 如果后续接入 JWT，可在此设置 Authorization header
        // config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
})

// 响应拦截器
api.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api