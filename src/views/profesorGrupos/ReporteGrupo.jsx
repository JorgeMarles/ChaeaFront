import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';

const ReporteGrupo = () => {
  return (
    <CRow className="justify-content-center mt-4">
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <h4>Reporte de Cuestionarios por Grupo</h4>
          </CCardHeader>
          <CCardBody>
            {/* Aquí puedes agregar el contenido del reporte */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ReporteGrupo;