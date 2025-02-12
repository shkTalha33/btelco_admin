import axios from "axios"

// export const baseURL = 'https://btelco-backend.vercel.app/api/'
export const baseURL = 'http://localhost:5000/api/'

export const token = localStorage.getItem('btelco_admin_panel');

export const axiosInstance = axios.create({
  baseURL: baseURL
})