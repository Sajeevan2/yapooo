import axios from 'axios'


const API = axios.create({baseURL:'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const getUser = (id) => API.get(`/users/${id}`)
export const updateUser = (id,data) => API.put(`/users/${id}`,data)
export const getAllUser = () =>API.get('/users')
export const followUser = (id,data) => API.put(`/users/${id}/follow`,data)
export const unFollowUser = (id,data) => API.put(`/users/${id}/unfollow`,data)