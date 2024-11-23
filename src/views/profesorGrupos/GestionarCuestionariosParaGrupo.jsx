import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CAlert,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormSwitch,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CSpinner
} from '@coreui/react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getGroupById } from '../../util/services/grupoService';
import { listarCuestionarios, obtenerCuestionariosPorGrupo, asignarCuestionarioAGrupo, obtenerCuestionario } from '../../util/services/cuestionarioService';
import './ModalVistaPreguntas.css';

// Función para formatear la fecha
const dateFromMsToString = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // Ajusta el formato según sea necesario
};

const ResultadosGrupo = () => {
  const user = useOutletContext();
  const { id } = useParams();
  const currentGrupoId = id;
  const [grupo, setGrupo] = useState({ cuestionarios: [] });
  const [bloqueados, setBloqueados] = useState({});
  const [cuestionarios, setCuestionarios] = useState([]);
  const [selectedCuestionario, setSelectedCuestionario] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [questionsModalVisible, setQuestionsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDatos = async () => {
    try {
      console.log(`Fetching data for group ID: ${currentGrupoId}`);
      
      const grupoData = await getGroupById(currentGrupoId);
      console.log('Group data received:', grupoData);
      
      const cuestionariosData = await obtenerCuestionariosPorGrupo(currentGrupoId);
      console.log('Cuestionarios data received:', cuestionariosData);

      setGrupo({ ...grupoData, cuestionarios: cuestionariosData });
      
      const allCuestionarios = await listarCuestionarios();
      setCuestionarios(allCuestionarios);
    } catch (error) {
      console.error('Error fetching datos:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchDatos();
  }, [currentGrupoId]);

  const handleToggleBloqueo = (cuestionarioId) => {
    setBloqueados((prev) => ({
      ...prev,
      [cuestionarioId]: !prev[cuestionarioId],
    }));
  };

  const handleAsignar = async () => {
    if (selectedCuestionario) {
      // Comprobar si el cuestionario ya está asignado al grupo
      const cuestionarioAsignado = grupo.cuestionarios.some((item) => item.cuestionario.id === selectedCuestionario.id);

      if (cuestionarioAsignado) {
        Swal.fire(
          'Advertencia',
          'El cuestionario ya está asignado a este grupo.',
          'warning'
        );
        return;
      }

      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas asignar el cuestionario "${selectedCuestionario.nombre}" al grupo "${grupo.nombre}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, asignar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            console.log('Asignando cuestionario:', selectedCuestionario.id, 'al grupo:', currentGrupoId);
            await asignarCuestionarioAGrupo(selectedCuestionario.id, currentGrupoId);
            Swal.fire(
              'Asignado!',
              `El cuestionario "${selectedCuestionario.nombre}" ha sido asignado al grupo "${grupo.nombre}".`,
              'success'
            );
            setModalVisible(false);
            // Refresh data after assigning
            fetchDatos();
          } catch (error) {
            console.error('Error asignando cuestionario:', error);
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
        'Por favor, selecciona un cuestionario.',
        'warning'
      );
    }
  };

  const handleViewDetails = async (id) => {
    setLoading(true);
    try {
      const data = await obtenerCuestionario(id);
      console.log('Cuestionario details:', data);
      setSelectedCuestionario(data);
      setDetailsModalVisible(true);
      setLoading(false);
    } catch (error) {
      console.error('Error obteniendo detalles del cuestionario:', error);
      setLoading(false);
    }
  };

  const handleViewQuestions = () => {
    setDetailsModalVisible(false);
    setQuestionsModalVisible(true);
  };

  return (
    <CRow className="justify-content-center mt-4">
      <CCol xs={12}>
        {grupo ? (
          <>
            <CAlert
              color="info"
              className="mb-2 d-flex justify-content-between align-items-center"
              style={{ backgroundColor: '#d3d3d3', border: '#d3d3d3', color: 'black', padding: '0.5rem', margin: '0' }}
            >
              <span>Profesor {user.nombre} - Grupo {grupo.nombre}</span>
              <CButton color="secondary" className="ml-auto" onClick={() => navigate('/grupos/')}>
                Volver
              </CButton>
            </CAlert>
            {grupo.cuestionarios.length > 0 ? (
              <CCard className="mt-4">
                <CCardHeader className="d-flex justify-content-between align-items-center">
                  <span>CUESTIONARIOS ASIGNADOS A {grupo.nombre}</span>
                  <CButton
                    color="success"
                    size="XL"
                    onClick={() => setModalVisible(true)}
                    style={{color:"white"}}
                  >
                    {' '}
                    Asignar Nuevo Cuestionario{' '}
                  </CButton>
                </CCardHeader>
                <CCardBody>
                  <CTable hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Nombre</CTableHeaderCell>
                        <CTableHeaderCell>Fecha de Asignación</CTableHeaderCell>
                        <CTableHeaderCell>Disponible</CTableHeaderCell>
                        <CTableHeaderCell>Ver Resultados</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {grupo.cuestionarios.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{item.cuestionario.nombre}</CTableDataCell>
                          <CTableDataCell>
                            Asignado el: {dateFromMsToString(item.fechaAplicacion)}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CFormSwitch
                              className={'mx-1'}
                              variant={'3d'}
                              color={'danger'}
                              checked={bloqueados[item.cuestionario.id] || false}
                              onChange={() => handleToggleBloqueo(item.cuestionario.id)}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="warning" onClick={() => navigate(`/resultado/${item.cuestionario.id}`)}>
                              Ver Resultados
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            ) : (
              <CCardBody className="text-center">
                <p>No hay cuestionarios asignados a este grupo.</p>
              </CCardBody>
            )}
          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader onClose={() => setModalVisible(false)}>
              <CModalTitle>Asignar Cuestionario</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormSelect
                id="cuestionario"
                value={selectedCuestionario ? selectedCuestionario.id : ''}
                onChange={(e) => {
                  const selected = cuestionarios.find(q => q.id === parseInt(e.target.value));
                  setSelectedCuestionario(selected);
                }}
              >
                <option value="">Selecciona un cuestionario</option>
                {cuestionarios.map((cuestionario) => (
                  <option key={cuestionario.id} value={cuestionario.id}>
                    {cuestionario.nombre}
                  </option>
                ))}
              </CFormSelect>
              {selectedCuestionario && (
                <div className="mt-3">
                  <p><strong>Número de Preguntas:</strong> {selectedCuestionario.numPreguntas}</p>
                  <p><strong>Autor:</strong> {selectedCuestionario.autor}</p>
                  <CButton 
                    color="info" 
                    size="sm" 
                    onClick={() => handleViewDetails(selectedCuestionario.id)} 
                    style={{ marginTop: '10px', backgroundColor: '#d3d3d3', borderColor:'#d3d3d3', color:'black'}}
                  >
                    Ver Detalles
                  </CButton>
                </div>
              )}
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                Cancelar
              </CButton>
              <CButton color="primary" onClick={handleAsignar}>
                Asignar Cuestionario
              </CButton>
            </CModalFooter>
          </CModal>

          <CModal visible={detailsModalVisible} onClose={() => setDetailsModalVisible(false)}>
            <CModalHeader onClose={() => setDetailsModalVisible(false)}>
              <CModalTitle>Detalles del Cuestionario</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {loading ? (
                <CSpinner />
              ) : (
                selectedCuestionario && (
                  <div>
                    <p><strong>Título:</strong> {selectedCuestionario.nombre}</p>
                    <p><strong>Autor:</strong> {selectedCuestionario.autor}</p>
                    <p><strong>Versión:</strong> {selectedCuestionario.version}</p>
                    <p><strong>Número de Preguntas:</strong> {selectedCuestionario.preguntas?.length || 0}</p>
                    <p><strong>Descripción:</strong> {selectedCuestionario.descripcion}</p>
                    <CButton color="info" size="sm" onClick={handleViewQuestions} style={{ marginTop: '10px',backgroundColor: '#d3d3d3', borderColor:'#d3d3d3', color:'black'}}>
                      Ver Preguntas
                    </CButton>
                  </div>
                )
              )}
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setDetailsModalVisible(false)}>Cerrar</CButton>
            </CModalFooter>
          </CModal>

          <CModal visible={questionsModalVisible} onClose={() => setQuestionsModalVisible(false)} size='xl' className="questions-modal" portal={true}>
            <CModalHeader onClose={() => setQuestionsModalVisible(false)} className="modal-header">
              <CModalTitle className="modal-title">Preguntas del Cuestionario</CModalTitle>
            </CModalHeader>
            <CModalBody className="modal-body">
              {loading ? (
                <CSpinner />
              ) : (
                selectedCuestionario && selectedCuestionario.preguntas && (
                  <div className="questions-container">
                    {selectedCuestionario.preguntas.map((pregunta, index) => (
                      <div key={index} className="question-item">
                        <p className="question-text">
                          <span className="question-number">{index + 1}.</span> 
                          {pregunta.pregunta}
                        </p>
                        <ul className="options-list">
                          {pregunta.opciones.map((opcion, opcionIndex) => (
                            <li key={opcionIndex} className="option-item">
                              {opcion.respuesta}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="learning-styles-section">
                      <h5 className="section-title">Estilos de Aprendizaje:</h5>
                      <ul className="categories-list">
                        {selectedCuestionario.categorias.map((categoria, index) => (
                          <li key={index} className="category-item">{categoria.nombre}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              )}
            </CModalBody>
            <CModalFooter className="modal-footer">
              <CButton color="secondary" onClick={() => setQuestionsModalVisible(false)} className="close-button">
                Cerrar
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      ) : (
        <div className="text-center">
          <p>Cargando datos del grupo...</p>
        </div>
      )}
    </CCol>
  </CRow>
);
};

export default ResultadosGrupo;
  