import React, { useState, useEffect } from 'react';
import { CForm, CCol, CFormInput, CFormSelect, CButton } from '@coreui/react';
import Swal from 'sweetalert2';
import './botonActualizar.css';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { dateFromMsToString } from '../../../util/dateUtils';
import { updateUserInfo } from '../../../util/services/userService';

const ActualizarEstudiante = () => {
  // Estado y funciones de manejadores
  const user = useOutletContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    codigo: user.codigo,
    fechaNacimiento: dateFromMsToString(user.fechaNacimiento),
    genero: user.genero,
  });

  const clearForm = () => {
    setFormData({
      codigo: '',
      fechaNacimiento: '',
      genero: '',
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!formData.codigo || !formData.fechaNacimiento || !formData.genero) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        icon: 'warning'
      });
      return;
    }

    console.log('Form data submitted:', formData);
    const userUpd = {...user, ...formData};
    // Simulación de llamada al backend
    updateUserInfo(userUpd)
      .then(response => {        
        if (response.ok) {
          Swal.fire({
            title: '¡Cuenta actualizada!',
            text: 'Los datos de la cuenta han sido actualizados correctamente.',
            icon: 'success'
          });
        } else {
          throw new Error('Error al actualizar la cuenta');
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error'
        });
      });
  };

  // Simulación de llamada al backend (debes reemplazar esto con tu lógica real)
  const fakeBackendCall = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true });
      }, 1000);
    });
  };

  // useEffect para manejar efectos secundarios si es necesario
  useEffect(() => {
    // cargar datos iniciales si es necesario
  }, []);

  return (
    <CForm className="row g-3" onSubmit={handleSubmit}>
      <CCol md={6}>
        <CFormInput
          type="number"
          id="inputCodigoNumber"
          label="Código de Estudiante"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
        />
      </CCol>
      <CCol md={6}>
        <CFormInput
          type="date"
          id="inputFechaNacimiento"
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
        />
      </CCol>
      <CCol md={6}>
        <CFormSelect
          id="inputGenero"
          label="Género"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
        >
          <option value="">Choose...</option>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMENINO">Femenino</option>
          <option value="NO_DECIR">Prefiero no decirlo</option>
        </CFormSelect>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit" className="custom-warning-button">Actualizar cuenta</CButton>
      </CCol>
    </CForm>
  );
};

export default ActualizarEstudiante;