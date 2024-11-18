import React, { useEffect, useState } from 'react'
import { Link, useOutletContext, useSearchParams } from 'react-router-dom'

import {
  CAlert,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CButton,
} from '@coreui/react'
import { getMisCuestionarios } from '../../util/services/cuestionarioService'
import { dateFromMsToString } from '../../util/dateUtils'

const EstudianteVistaCuestionario = () => {
  const user = useOutletContext()
  const [activeTab, setActiveTab] = useState(0)
  const [pendientes, setPendientes] = useState([
    {
      id: 0,
      cuestionario: {},
      estudiante: {},
      fechaAplicacion: null,
      fechaResolucion: null,
    },
  ])
  const [resueltos, setResueltos] = useState([
    {
      id: 0,
      cuestionario: {},
      estudiante: {},
      fechaAplicacion: null,
      fechaResolucion: null,
    },
  ])

  useEffect(() => {
    getMisCuestionarios()
      .then((response) => {
        if (response.ok) {
          setPendientes(response.data.pendientes)
          setResueltos(response.data.resueltos)
          console.log(response.data)
        } else {
          throw response
        }
      })
      .catch((error) => {
        console.error('Error fetching cuestionarios:', error)
      })
  }, [])

  return (
    <div>
      <CAlert color="info" className="mb-4">
        Bienvenid@ Estudiante {user.nombre}
      </CAlert>

      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeTab === 0} onClick={() => setActiveTab(0)}>
            Pendientes
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)}>
            Resueltos
          </CNavLink>
        </CNavItem>
      </CNav>

      <CTabContent>
        <CTabPane visible={activeTab === 0}>
          <CRow className="gy-4" xs={{ cols: 1 }} sm={{ cols: 2 }}>
            {pendientes.map((el, id) => (
              <CCol key={id + 'pendiente'} xs={12} md={6} lg={4}>
                <CCard className="mb-4">
                  <CCardBody>
                    <CCardTitle>{el.cuestionario.nombre}</CCardTitle>
                    <p>Preguntas: {el.cuestionario.numPreguntas}</p>
                    <p>Asignado el: {dateFromMsToString(el.fechaAplicacion)}</p>
                    <div className="text-center mt-3">
                      <Link to={`/cuestionarios/${el.id}/resolver`}>
                      <CButton
                        style={{
                          backgroundColor: '#b9d2fa',
                          borderColor: '#b9d2fa',
                        }}
                      >
                        Iniciar Cuestionario
                      </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CTabPane>

        <CTabPane visible={activeTab === 1}>
          <CRow className="gy-4" xs={{ cols: 1 }} sm={{ cols: 2 }}>
            {resueltos.map((el, id) => (
              <CCol key={id + 'resuelto'} xs={12} md={6} lg={4}>
                <CCard className="mb-4">
                  <CCardBody>
                    <CCardTitle>{el.cuestionario.nombre}</CCardTitle>
                    <p>Preguntas: {el.cuestionario.numPreguntas}</p>
                    <p>Asignado el: {dateFromMsToString(el.fechaAplicacion)}</p>
                    <p>Resuelto el: {dateFromMsToString(el.fechaResolucion)}</p>
                    <div className="text-center mt-3">
                      <Link to={`/cuestionario/${el.id}/resultado`}>
                        <CButton
                          style={{
                            backgroundColor: '#b9d2fa',
                            borderColor: '#b9d2fa',
                          }}
                        >
                          Ver resultados
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CTabPane>
      </CTabContent>
    </div>
  )
}

export default EstudianteVistaCuestionario
