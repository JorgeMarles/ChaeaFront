import React, { useState, useEffect } from 'react';
import { CForm, CCol, CFormInput, CFormSelect, CButton } from '@coreui/react';
import Swal from 'sweetalert2';
import './botonActualizar.css';
import { updateUserInfo } from '../../../util/services/userService';
import { useNavigate, useOutletContext } from 'react-router-dom';

const ActualizarCuentaProfesor = () => {
  const user = useOutletContext();
  const navigate = useNavigate();

  // Estado y funciones de manejadores
  const [formData, setFormData] = useState({
    codigo: user.codigo,
    carrera: user.carrera,
  });

  const clearForm = () => {
    setFormData({
      codigo: '',
      carrera: '',
    });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!formData.codigo || !formData.carrera) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        icon: 'warning'
      });
      return;
    }

    console.log('Form data submitted:', formData);
    
    // Simulación de llamada al backend
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
          throw new Error('Error al actualizar la cuenta: ');
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: error,
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
          type="number"  // Modificado para aceptar solo números
          id="inputCodigoNumber"
          label="Código de Profesor"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
        />
      </CCol>
      <CCol md={6}>
        <CFormSelect
          id="inputCarrera"
          label="Carrera"
          name="carrera"
          value={formData.carrera}
          onChange={handleChange}
        >
          <option value="">Choose...</option>
          <option value="109">109 - Ingeniería Electromecánica</option>
          <option value="111">111 - Ingeniería Civil</option>
          <option value="112">112 - Ingeniería Mecánica</option>
          <option value="115">115 - Ingeniería de Sistemas</option>
          <option value="116">116 - Ingeniería Electrónica</option>
          <option value="118">118 - Ingeniería de Minas</option>
          <option value="119">119 - Ingeniería Industrial</option>
          <option value="161">161 - Ingeniería Biotecnológica</option>
          <option value="162">162 - Ingeniería Agronómica</option>
          <option value="163">163 - Ingeniería Pecuaria</option>
          <option value="164">164 - Ingeniería Agroindustrial</option>
          <option value="165">165 - Ingeniería Ambiental</option>
        </CFormSelect>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit" className="custom-warning-button">Actualizar cuenta</CButton>
      </CCol>
    </CForm>
  );
};

export default ActualizarCuentaProfesor;