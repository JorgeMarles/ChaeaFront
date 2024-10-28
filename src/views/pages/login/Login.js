import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react';
import googleIcon from 'src/assets/images/google.png'; // Asegúrate de que la ruta sea correcta

const HOST = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [baseurl, setBaseurl] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");
    if (error) {
      alert(error);
      navigate("/estudiante-login");
    } else if (token) {
      // Manejo de token
    }
    setBaseurl(window.location.protocol + "//" + window.location.host + import.meta.env.BASE_URL + "estudianteVistaCuestionarios");
  }, [searchParams, navigate]);

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1>Iniciar sesión como Estudiante</h1>
                  <p className="text-body-secondary">Entra y resuelve los cuestionarios de perfiles de aprendizaje asignados por tu profesor</p>
                  <CRow>
                    <CCol xs={12} className="text-center">
                      <a
                        href={`${HOST}/oauth2/authorization/google?userType=estudiante&redirect_to=${baseurl}`}
                        className="btn btn-light px-4"
                        style={{ color: '#DB4437', backgroundColor: 'white', border: '1px solid #DB4437' }}
                      >
                        <img src={googleIcon} alt="Google Logo" className="me-2" style={{ width: '20px' }} />
                        Sign in with Google
                      </a>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Logear como docente</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="light" className="mt-3" active tabIndex={-1}>
                        Docente
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;