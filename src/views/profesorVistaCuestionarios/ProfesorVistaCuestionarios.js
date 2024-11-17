import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { CAlert, CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton, CCol, CRow, CButtonGroup, CSpinner } from '@coreui/react';

const ProfesorVistaCuestionarios = () => {
  const user = useOutletContext();
  const navigate = useNavigate();
  const [cuestionarios, setCuestionarios] = useState([{ id: 1, nombre: 'CHAEA', preguntas: 80 }]);
  const [loading, setLoading] = useState(false);

  const handleCreateCuestionario = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/crear-cuestionarios/');
    }, 1000); // Duración de la animación de carga en milisegundos (2 segundos)
  };

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <span>Lista de Cuestionarios Creados</span>
              <CButtonGroup role="group" aria-label="Basic mixed styles example">
                <CButton color="success" onClick={handleCreateCuestionario}> + </CButton>
              </CButtonGroup>
            </CCardHeader>
            <CCardBody>
              {loading ? (
                <div className="d-flex justify-content-center">
                  <CSpinner color="primary" />
                </div>
              ) : (
                cuestionarios.length === 0 ? (
                  <p>No hay cuestionarios disponibles</p>
                ) : (
                  <CTable hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Nombre del Cuestionario</CTableHeaderCell>
                        <CTableHeaderCell>Número de Preguntas</CTableHeaderCell>
                        <CTableHeaderCell></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {cuestionarios.map(cuestionario => (
                        <CTableRow key={cuestionario.id}>
                          <CTableDataCell>{cuestionario.nombre}</CTableDataCell>
                          <CTableDataCell>{cuestionario.preguntas} preguntas</CTableDataCell>
                          <CTableDataCell>
                            <CButton color="primary" size="sm">Ver Detalles</CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                )
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ProfesorVistaCuestionarios;