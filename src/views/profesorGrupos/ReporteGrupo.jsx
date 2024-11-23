import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CContainer,
  CAlert,
  CButton
} from '@coreui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerReporteGrupo } from '../../util/services/cuestionarioService';
import { CChartBar, CChartRadar } from '@coreui/react-chartjs';
import Swal from 'sweetalert2'; // Asegúrate de importar Swal si lo estás utilizando

const ReporteGrupo = () => {
  // Extraemos los parámetros de la URL, cambiamos a los nombres correctos
  const { id1, id2 } = useParams(); // Aquí usamos id1 y id2 según la ruta
  const navigate = useNavigate();

  // Estado para manejar el reporte, error y carga
  const [reporte, setReporte] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto para cargar el reporte cuando los parámetros estén disponibles
  useEffect(() => {
    console.log('ID Cuestionario:', id1);  // Verifica los valores extraídos
    console.log('ID Grupo:', id2);

    if (!id1 || !id2) {
      console.error('Parámetros faltantes.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontraron los parámetros requeridos para generar el reporte.',
      });
      navigate('/'); // Redirige al usuario si los parámetros no son válidos
    } else {
      // Llamar al servicio para obtener el reporte con los parámetros de la URL
      obtenerReporteGrupo(id1, id2)
        .then((data) => {
          setReporte(data); // Guardamos el reporte en el estado
          setLoading(false); // Cambiamos el estado de carga a false
        })
        .catch((error) => {
          setError('Hubo un error al obtener el reporte.'); // Manejo de errores
          setLoading(false);
          console.error('Error al obtener reporte:', error);
        });
    }
  }, [id1, id2, navigate]);

  // Mostrar mensaje de error si ocurre
  if (error) {
    return (
      <CAlert color="danger">
        <p>{error}</p>
        <CButton color="secondary" onClick={() => navigate('/grupos')}>
          Volver
        </CButton>
      </CAlert>
    );
  }

  // Mostrar mensaje de carga mientras se obtiene el reporte
  if (loading) {
    return <CAlert color="info">Cargando reporte...</CAlert>;
  }

  // Renderizar el reporte una vez cargado
  if (!reporte) {
    return (
      <CAlert color="warning">
        <p>No se encontraron datos para mostrar.</p>
        <CButton color="secondary" onClick={() => navigate('/grupos')}>
          Volver
        </CButton>
      </CAlert>
    );
  }

  return (
    <CContainer>
      <CAlert color="info" className="mb-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#d3d3d3', border:'#d3d3d3', color:'black',padding: '0.5rem' ,margin: '0 0.6rem 0 0.6rem'}}>
        <span className='fw-semibold text-black'>REPORTE DE RESULTADOS GRUPO </span>
        <CButton color="secondary" className="ml-auto" onClick={() => navigate(`/resultado/${id2}/`)}>
          Volver
        </CButton>
      </CAlert>
      <CRow className="mt-4">
        <CCol md={12}>
          <CCard>
            <CCardHeader>
              <h4>Reporte de Grupo: {reporte.grupo.nombre}</h4>
              <p>
                <strong>Cuestionario:</strong> {reporte.cuestionario.nombre}
              </p>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <h5>Estadísticas Generales</h5>
                  <p>
                    <strong>Fecha de Aplicación:</strong>{' '}
                    {new Date(reporte.fechaAplicacion).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total Estudiantes:</strong>{' '}
                    {reporte.estudiantesResuelto.length + reporte.estudiantesNoResuelto.length}
                  </p>
                  <p>
                    <strong>Estudiantes que resolvieron:</strong>{' '}
                    {reporte.estudiantesResuelto.length}
                  </p>
                  <p>
                    <strong>Estudiantes que no resolvieron:</strong>{' '}
                    {reporte.estudiantesNoResuelto.length}
                  </p>
                </CCol>
                <CCol md={6}>
                  <CChartBar
                    data={{
                      labels: reporte.categorias.map((c) => c.nombre),
                      datasets: [
                        {
                          label: 'Promedio por Categoría',
                          backgroundColor: '#36A2EB',
                          data: reporte.categorias.map((c) => c.valor),
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: Math.max(
                            ...reporte.categorias.map((c) => c.valorMaximo)
                          ),
                        },
                      },
                    }}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol md={12}>
                  <CChartRadar
                    data={{
                      labels: reporte.categorias.map((c) => c.nombre),
                      datasets: [
                        {
                          label: 'Promedio por Categoría',
                          data: reporte.categorias.map((c) => c.valor),
                          backgroundColor: 'rgba(75,192,192,0.2)',
                          borderColor: 'rgba(75,192,192,1)',
                          pointBackgroundColor: 'rgba(75,192,192,1)',
                        },
                      ],
                    }}
                    options={{
                      scales: {
                        r: {
                          suggestedMin: 0,
                          suggestedMax: Math.max(
                            ...reporte.categorias.map((c) => c.valorMaximo)
                          ),
                        },
                      },
                    }}
                  />
                </CCol>
              </CRow>

              <h5 className="mt-4">Estudiantes</h5>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {reporte.estudiantesResuelto.map((estudiante, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{estudiante.nombre}</CTableDataCell>
                      <CTableDataCell>Resuelto</CTableDataCell>
                    </CTableRow>
                  ))}
                  {reporte.estudiantesNoResuelto.map((estudiante, index) => (
                    <CTableRow key={reporte.estudiantesResuelto.length + index}>
                      <CTableDataCell>
                        {reporte.estudiantesResuelto.length + index + 1}
                      </CTableDataCell>
                      <CTableDataCell>{estudiante.nombre}</CTableDataCell>
                      <CTableDataCell>No Resuelto</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ReporteGrupo;