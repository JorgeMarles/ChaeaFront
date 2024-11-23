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

// Obtener Cuestionarios por Grupo
export const obtenerCuestionariosPorGrupo = async (idGrupo) => {
  try {
    const response = await axios.get(`${API_URL}/api/cuestionarios/reporte/grupo/${idGrupo}`, {
    //api/cuestionarios/reporte/grupo/25
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


// Asignar Cuestionario a Grupo
export const asignarCuestionarioAGrupo = async (idCuestionario, idGrupo) => {
  try {
    console.log(`Llamada al endpoint para asignar cuestionario ${idCuestionario} al grupo ${idGrupo}`);
    const response = await axios.post(
      `${API_URL}/api/cuestionarios/${idCuestionario}/asignargrupo/${idGrupo}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    console.log('Respuesta del servidor:', response);
    return response.status === 201;
  } catch (error) {
    console.error('Error en asignarCuestionarioAGrupo:', error);
    throw error.response.data;
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
    console.log(response)
    return response.status === 201
  } catch (error) {
    console.log(error)
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

export const obtenerReporteGrupo = async (idCuestionario, idGrupo) => {
  if (!idCuestionario || !idGrupo) {
    console.error('Error: Los parámetros idCuestionario o idGrupo no están definidos.');
    throw new Error('Los parámetros idCuestionario e idGrupo son obligatorios.');
  }

  try {
    console.log(`Obteniendo reporte para cuestionario ${idCuestionario} y grupo ${idGrupo}`);
    const response = await axios.get(
      `${API_URL}/api/cuestionarios/reporte/${idCuestionario}/grupo/${idGrupo}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    console.log('Reporte obtenido:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el reporte:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
      throw new Error(
        error.response.data.message || 'Error al obtener el reporte del grupo.'
      );
    } else {
      throw new Error('Error desconocido al comunicarse con el servidor.');
    }
  }
};

export const getCuestionarioResultado = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/cuestionarios/mis-cuestionarios/resuelto/${id}`,
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