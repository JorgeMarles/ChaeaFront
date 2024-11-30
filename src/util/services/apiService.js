import axios from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'

const API_URL = import.meta.env.VITE_BACKEND_URL

const [getToken, setToken, removeToken] = useLocalStorage('authToken')

export const callTest = async (url, body, method) => {
  if (method === 'POST') {
    const response = await axios.post(`${API_URL}/api/${url}`, body, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response
  } else if (method === 'GET') {
    const response = await axios.get(`${API_URL}/api/${url}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response
  } else if (method === 'DELETE') {
    const response = await axios.delete(`${API_URL}/api/${url}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response
  } else if (method === 'PUT') {
    const response = await axios.put(`${API_URL}/api/${url}`, body, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response
  } else throw `Metodo ${method} invalido`
}
