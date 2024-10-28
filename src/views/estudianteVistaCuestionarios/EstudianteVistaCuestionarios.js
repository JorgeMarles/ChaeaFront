import React from 'react';
import { CAlert, CCard, CCardBody, CCardTitle, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CButton } from '@coreui/react';
import { useState } from 'react';

const EstudianteVistaCuestionario = () => {
  const estudianteLogueado = {
    email: "omar@ufps.edu.co",
    nombre: "Omar Villamizar",
    codigo: "1152239"
  };

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <CAlert color="info" className="mb-4">
        Bienvenid@ Estudiante {estudianteLogueado.nombre}
      </CAlert>

      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink
            active={activeTab === 0}
            onClick={() => setActiveTab(0)}
          >
            Pendientes
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeTab === 1}
            onClick={() => setActiveTab(1)}
          >
            Resueltos
          </CNavLink>
        </CNavItem>
      </CNav>

      <CTabContent>
        <CTabPane visible={activeTab === 0}>
          <CRow className="gy-4">
            <CCol xs={12} md={6} lg={4}>
              <CCard className="mb-4">
                <CCardBody>
                  <CCardTitle>Cuestionario Seminario II</CCardTitle>
                  <p>Profesor: Claudia Gomez</p>
                  <p>Cuestionario: CHAEA Honey</p>
                  <div className="text-center mt-3">
                    <CButton style={{ backgroundColor: '#b9d2fa', borderColor: '#b9d2fa' }}>Iniciar Cuestionario</CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={12} md={6} lg={4}>
              <CCard className="mb-4">
                <CCardBody>
                  <CCardTitle>Cuestionario Web</CCardTitle>
                  <p>Profesor: Carlos Angarita</p>
                  <p>Cuestionario: Honey Alonso</p>
                  <div className="text-center mt-3">
                    <CButton style={{ backgroundColor: '#b9d2fa', borderColor: '#b9d2fa' }}>Iniciar Cuestionario</CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>

        <CTabPane visible={activeTab === 1}>
          <CRow className="gy-4">
            <CCol xs={12} md={6} lg={4}>
              <CCard className="mb-4">
                <CCardBody>
                  <CCardTitle>Base de datos</CCardTitle>
                  <p>Profesor: Carlos Angarita</p>
                  <p>Cuestionario: Honey Alonso</p>
                  <div className="text-center mt-3">
                    <CButton style={{ backgroundColor: '#9df2c6', borderColor: '#9df2c6' }}>Ver Resultados</CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>
    </div>
  );
};

export default EstudianteVistaCuestionario;