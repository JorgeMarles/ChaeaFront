import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react';
import googleIcon from 'src/assets/images/google.png'; // Asegúrate de que la ruta sea correcta
import Swal from 'sweetalert2';
import {decodeJwt} from 'jose'
import { useLocalStorage } from '../../../util/hooks/useLocalStorage';
import { useAuth } from '../../../util/auth/AuthProvider';

const HOST = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [baseurl, setBaseurl] = useState('');
  const auth = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [,setToken,] = useLocalStorage("authToken");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");
    if (error) {
      Swal.fire("Error", error, "error")
      navigate("/login");
    } else if (token) {
      const info = decodeJwt(token);
      auth.signin(token, () =>
         navigate("/")
      );
      // Manejo de token
    }
    console.log("baseUrl",window.location.protocol + "//" + window.location.host + '/' + "login");
    console.log(window.location.protocol);
    console.log(window.location.host);
    console.log(import.meta.env.BASE_URL);
    
    console.log("host", HOST)
    setBaseurl(window.location.protocol + "//" + window.location.host +  '/' + "login");
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
                        Iniciar Sesión como Estudiante
                      </a>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5">
                <CCardBody className="text-center">
                  <div>
                    <h2>Iniciar Sesión como Profesor</h2>
                    <p>
                      Entra y crea grupos, asígnales cuestionarios y analiza sus resultados.
                    </p>
                    <CRow>
                    <CCol xs={12} className="text-center">
                      <a
                        href={`${HOST}/oauth2/authorization/google?userType=profesor&redirect_to=${baseurl}`}
                        className="btn btn-light px-4"
                        style={{ color: '#DB4437', backgroundColor: 'white', border: '1px solid #DB4437' }}
                      >
                        <img src={googleIcon} alt="Google Logo" className="me-2" style={{ width: '20px' }} />
                        Iniciar Sesión como Profesor
                      </a>
                    </CCol>
                  </CRow>
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