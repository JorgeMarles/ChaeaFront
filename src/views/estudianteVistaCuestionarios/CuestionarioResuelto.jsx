import { useEffect, useState } from 'react'
import { useNavigate, useParams, useOutletContext } from 'react-router-dom'
import { getCuestionarioResultado } from '../../util/services/cuestionarioService'
import { dateFromMsToString } from '../../util/dateUtils'
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
  CButton,
  CAlert
} from '@coreui/react'
import { CChartBar, CChartRadar } from '@coreui/react-chartjs'

const ResultadoCuestionario = () => {
  const user = useOutletContext()
  const { id } = useParams()
  const navigate = useNavigate()
  const [resultado, setResultado] = useState({
    cuestionario: {
      id: 0,
      nombre: '',
      siglas: '',
      descripcion: '',
      autor: '',
      version: '',
    },
    estudiante: {
      nombre: '',
      fecha_nacimiento: 0,
    },
    preguntas: [{ pregunta: '', orden: 0, respuesta: '' }],
    categorias: [{ nombre: '', valorMinimo: 0, valorMaximo: 0, valor: 0 }],
  })

  useEffect(() => {
    getCuestionarioResultado(id)
      .then((data) => {
        if (data.ok) {
          setResultado(data.data)
        } else {
          throw new Error('Error al obtener cuestionario')
        }
      })
      .catch(() => {
        navigate('/cuestionarios')
      })
  }, [id, navigate])

  return (
    <>
      <CAlert color="info" className="mb-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#d3d3d3', border:'#d3d3d3', color:'black',padding: '0.5rem' ,margin: '0 0.6rem 0 0.6rem'}}>
        <span className='fw-semibold text-black'>Estudiante {user.nombre}</span>
        <CButton color="secondary" className="ml-auto" onClick={() => navigate('/cuestionarios/')}>
          Volver
        </CButton>
      </CAlert>
    <CContainer>
      <CRow>
        <CCol md={12}>
          <CCard>
            <CCardHeader>
              <h5>Resultado del Cuestionario</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {/* Información del Cuestionario */}
                <CCol md={6}>
                  <h6>Cuestionario</h6>
                  <p>
                    <strong>Nombre:</strong> {resultado.cuestionario.nombre}
                  </p>
                  <p>
                    <strong>Siglas:</strong> {resultado.cuestionario.siglas}
                  </p>
                  <p>
                    <strong>Descripción:</strong>{' '}
                    {resultado.cuestionario.descripcion}
                  </p>
                  <p>
                    <strong>Autor:</strong> {resultado.cuestionario.autor}
                  </p>
                  <p>
                    <strong>Versión:</strong> {resultado.cuestionario.version}
                  </p>
                </CCol>
                {/* Información del Estudiante */}
                <CCol md={6}>
                  <h6>Estudiante</h6>
                  <p>
                    <strong>Nombre:</strong> {resultado.estudiante.nombre}
                  </p>
                  <p>
                    <strong>Fecha de Nacimiento:</strong>{' '}
                    {dateFromMsToString(resultado.estudiante.fecha_nacimiento)}
                  </p>
                </CCol>
              </CRow>

              <CRow>
                <CCol>
                  <CChartBar
                    data={{
                      labels: resultado.categorias.map((e) => e.nombre),
                      datasets: [
                        {
                          label: resultado.estudiante.nombre,
                          backgroundColor: '#f87979',
                          data: resultado.categorias.map((e) => e.valor),
                        },
                      ],
                    }}
                    labels="months"
                  />
                </CCol>
                <CCol>
                  <CChartRadar
                    data={{
                      labels: resultado.categorias.map((e) => e.nombre),
                      datasets: [
                        {
                          label: resultado.estudiante.nombre,
                          backgroundColor: 'rgba(220, 220, 220, 0.2)',
                          borderColor: 'rgba(220, 220, 220, 1)',
                          pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                          pointBorderColor: '#fff',
                          pointHighlightFill: '#fff',
                          pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                          data: resultado.categorias.map((e) => e.valor),
                        },
                      ],
                    }}

                    options={{
                        angleLines: {
                            display: false
                        },
                        scales: {
                            r: {
                                suggestedMax: Math.max(...resultado.categorias.map(e => e.valorMaximo)),
                                suggestedMin: Math.min(...resultado.categorias.map(e => e.valorMinimo)),
                            }
                        }
                    }}
                  />
                </CCol>
              </CRow>

              <h6 className="mt-4">Preguntas</h6>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Pregunta</CTableHeaderCell>
                    <CTableHeaderCell>Respuesta</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {resultado.preguntas
                    .sort((a, b) => a.orden - b.orden)
                    .map((pregunta) => (
                      <CTableRow key={pregunta.orden}>
                        <CTableDataCell>{pregunta.orden}</CTableDataCell>
                        <CTableDataCell>{pregunta.pregunta}</CTableDataCell>
                        <CTableDataCell>
                          Respondiste: {pregunta.respuesta}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    </>
  )
}

export default ResultadoCuestionario
