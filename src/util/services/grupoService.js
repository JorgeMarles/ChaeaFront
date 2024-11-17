import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const [getToken, setToken, removeToken] = useLocalStorage('authToken');

// Obtener información de los grupos
export const getGroups = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/api/grupos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw response.message;
    }
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener información de los profesores
export const getProfesores = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/api/profesores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw response.message;
    }
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener información de los estudiantes
export const getEstudiantes = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/api/estudiantes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw response.message;
    }
  } catch (error) {
    throw error.response.data;
  }
};

// Eliminar un grupo
export const deleteGrupo = async (grupoId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/api/grupos/${grupoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw response.message;
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const createGrupo = async (grupoDTO) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_URL}/api/grupos`, grupoDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Failed to create group: ${response.statusText || response.status}`);
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Error inesperado al crear el grupo');
      } else if (error.request) {
        throw new Error('Error de red: No se recibió respuesta del servidor');
      } else {
        throw new Error(`Error inesperado: ${error.message}`);
      }
    }
  };
  
// Añadir estudiantes a un grupo
export const addStudentsToGroup = async (grupoId, estudiantes) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/api/grupos/${grupoId}/estudiantes`, estudiantes, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw response.message;
    }
  } catch (error) {
    throw error.response.data;
  }
};

// Eliminar un estudiante de un grupo
export const deleteStudentFromGroup = async (grupoId, estudianteEmail) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/api/grupos/${grupoId}/estudiantes/${estudianteEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw response.message;
    }
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener la información de un grupo actualizado
export const getGroupById = async (grupoId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/api/grupos/${grupoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw response.message;
    }
  } catch (error) {
    throw error.response.data;
  }
};