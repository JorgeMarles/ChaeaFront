import axios from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'

const API_URL = import.meta.env.VITE_BACKEND_URL
const [getToken] = useLocalStorage('authToken')

// Listar Profesores
export const listarProfesores = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/profesores`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Consultar Profesor por Correo
export const consultarPorCorreo = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/api/profesores/${email}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Eliminar Profesor
export const eliminarProfesor = async (email) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/profesores/deactivate/${email}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Activar Cuenta de Profesor
export const activarCuentaProfesor = async (email) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/profesores/activate/${email}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Elevar Cuenta de Profesor a Administrador
export const elevarCuentaProfesor = async (email) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/profesores/elevate/${email}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Degradar Cuenta de Administrador a Profesor
export const bajarCuentaProfesor = async (email) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/profesores/demote/${email}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Rechazar Solicitud de Cuenta de Profesor
export const rechazarSolicitudCuentaProfesor = async (email) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/profesores/reject/${email}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Actualizar Profesor
export const actualizarProfesor = async (profesorDTO) => {
  try {
    const response = await axios.put(`${API_URL}/api/profesores`, profesorDTO, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
