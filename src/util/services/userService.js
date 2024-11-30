import axios from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { dateFromStringToMsUTC } from '../dateUtils'

const API_URL = import.meta.env.VITE_BACKEND_URL

const [getToken, setToken, removeToken] = useLocalStorage('authToken')

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/user/info`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    if (response.status == 200) {
      return response.data
    } else {
      throw response.message
    }
  } catch (error) {
    throw error.response.data
  }
}

export const updateUserInfo = async (user) => {
  try {
    user.fechaNacimiento = dateFromStringToMsUTC(user.fechaNacimiento)

    const endpoint =
      user.tipoUsuario === 'ESTUDIANTE' ? 'estudiantes' : 'profesores'

    const response = await axios.put(`${API_URL}/api/${endpoint}`, user, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
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
