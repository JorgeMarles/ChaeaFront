import axios from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'

const API_URL = import.meta.env.VITE_BACKEND_URL

const [getToken, setToken, removeToken] = useLocalStorage('authToken')

export const crearCuestionario = async (cuestionario) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/cuestionarios`,
      cuestionario,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    const responseOut = {
      ok: response.status === 200,
      data: response.data,
      status: response.status,
    }
    return responseOut
  } catch (error) {
    throw error.response.data
  }
}
