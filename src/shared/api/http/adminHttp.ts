import axios from "axios";

export const $adminHost = axios.create({
    baseURL: 'http://localhost:5000/'
})

const adminInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$adminHost.interceptors.request.use(adminInterceptor)