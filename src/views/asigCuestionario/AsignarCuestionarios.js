import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol } from '@coreui/react';
import Swal from 'sweetalert2';
import { listarCuestionarios, asignarCuestionarioAGrupo } from '../../util/services/cuestionarioService';
import { getGroups } from '../../util/services/grupoService';

const AsignarCuestionarios = () => {
  const [cuestionarios, setCuestionarios] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [selectedCuestionario, setSelectedCuestionario] = useState('');
  const [selectedGrupo, setSelectedGrupo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cuestionariosData = await listarCuestionarios();
        const gruposData = await getGroups();
        setCuestionarios(cuestionariosData);
        setGrupos(gruposData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getNombrePorId = (id, list) => {
    const item = list.find(el => el.id === parseInt(id));
    return item ? item.nombre : 'desconocido';
  };

  const handleAsignar = () => {
    if (selectedCuestionario && selectedGrupo) {
      const nombreCuestionario = getNombrePorId(selectedCuestionario, cuestionarios);
      const nombreGrupo = getNombrePorId(selectedGrupo, grupos);

      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas asignar el cuestionario "${nombreCuestionario}" al grupo "${nombreGrupo}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, asignar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await asignarCuestionarioAGrupo(selectedCuestionario, selectedGrupo);
            Swal.fire(
              'Asignado!',
              `El cuestionario "${nombreCuestionario}" ha sido asignado al grupo "${nombreGrupo}".`,
              'success'
            );
          } catch (error) {
            Swal.fire(
              'Error!',
              'Hubo un problema asignando el cuestionario.',
              'error'
            );
          }
        }
      });
    } else {
      Swal.fire(
        'Advertencia',
        'Por favor, selecciona un cuestionario y un grupo.',
        'warning'
      );
    }
  };

  return (
    <CCard>
      <CCardHeader>
        Asignar Cuestionarios
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol md="6">
            <label htmlFor="grupo">Grupo</label>
            <select
              id="grupo"
              value={selectedGrupo}
              onChange={(e) => setSelectedGrupo(e.target.value)}
              className="form-control"
            >
              <option value="">Selecciona un grupo</option>
              {grupos.map((grupo) => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.nombre}
                </option>
              ))}
            </select>
          </CCol>
          <CCol md="6">
            <label htmlFor="cuestionario">Cuestionario</label>
            <select
              id="cuestionario"
              value={selectedCuestionario}
              onChange={(e) => setSelectedCuestionario(e.target.value)}
              className="form-control"
            >
              <option value="">Selecciona un cuestionario</option>
              {cuestionarios.map((cuestionario) => (
                <option key={cuestionario.id} value={cuestionario.id}>
                  {cuestionario.nombre}
                </option>
              ))}
            </select>
          </CCol>
        </CRow>
        <CButton color="primary" onClick={handleAsignar} style={{ marginTop: '10px' }}>
          Asignar Cuestionario
        </CButton>
      </CCardBody>
    </CCard>
  );
};

export default AsignarCuestionarios;