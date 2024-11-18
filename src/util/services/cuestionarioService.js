import axios from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'

const API_URL = import.meta.env.VITE_BACKEND_URL

const [getToken, setToken, removeToken] = useLocalStorage('authToken')

// Crear Cuestionario
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

// Listar Cuestionarios
export const listarCuestionarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/cuestionarios`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Obtener Cuestionario por ID
export const obtenerCuestionario = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/cuestionarios/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Eliminar Cuestionario
export const eliminarCuestionario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/cuestionarios/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.status === 204
  } catch (error) {
    throw error.response.data
  }
}

// Asignar Cuestionario a Grupo
export const asignarCuestionarioAGrupo = async (idCuestionario, idGrupo) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/cuestionarios/${idCuestionario}/asignargrupo/${idGrupo}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    return response.status === 201
  } catch (error) {
    throw error.response.data
  }
}

// Asignar Cuestionario a Estudiante
export const asignarCuestionarioAEstudiante = async (
  idCuestionario,
  estudianteEmail,
) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/cuestionarios/${idCuestionario}/asignarestudiante`,
      { email: estudianteEmail },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    return response.status === 201
  } catch (error) {
    throw error.response.data
  }
}

// Responder Cuestionario
export const responderCuestionario = async (respuesta) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/cuestionarios/responder`,
      respuesta,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    return response.status === 201
  } catch (error) {
    throw error.response.data
  }
}

export const getMisCuestionarios = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/cuestionarios/mis-cuestionarios`,
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
