import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
  CHeader,
  CHeaderBrand,
  CFooter,
} from '@coreui/react'
import googleIcon from 'src/assets/images/google.png'
import logoUfps from 'src/assets/images/logo_ufps.png'
import ingSistemas from 'src/assets/images/ingSistemas.png'
import chaealogo from 'src/assets/images/chaealogo.png'
import Swal from 'sweetalert2'
import { decodeJwt } from 'jose'
import { useLocalStorage } from '../../../util/hooks/useLocalStorage'
import { useAuth } from '../../../util/auth/AuthProvider'
import './login.css'

const HOST = import.meta.env.VITE_BACKEND_URL

const Login = () => {
  const [baseurl, setBaseurl] = useState('')
  const auth = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    const error = searchParams.get('error')

    if (error) {
      Swal.fire('Error', error, 'error')
      navigate('/login')
    } else if (token) {
      const info = decodeJwt(token)
      auth.signin(token, () => navigate('/'))
    }

    setBaseurl(
      window.location.protocol + '//' + window.location.host + '/' + 'login',
    )
  }, [searchParams, navigate])

  const LoginButton = ({ userType, title, description }) => (
    <CCard
      className={`h-100 ${userType === 'estudiante' ? 'p-4' : 'text-white bg-primary py-5 p-4'}`}
    >
      <CCardBody className="d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="text-center">
            <h2>{title}</h2>
            <p
              className={`${userType === 'estudiante' ? 'text-body-secondary' : 'text-white'}`}
            >
              {description}
            </p>
          </div>
          <div className="mt-auto">
            <CRow>
              <CCol xs={12} className="text-center">
                <a
                  href={`${HOST}/oauth2/authorization/google?userType=${userType}&redirect_to=${baseurl}`}
                  className="btn btn-light px-4"
                  style={{
                    color: '#DB4437',
                    backgroundColor: 'white',
                    border: '1px solid #DB4437',
                  }}
                >
                  <img
                    src={googleIcon}
                    alt="Google Logo"
                    className="me-2"
                    style={{ width: '20px' }}
                  />
                  Iniciar Sesión como {title}
                </a>
              </CCol>
            </CRow>
          </div>
        </div>
      </CCardBody>
    </CCard>
  )

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-column">
      <CHeader>
        <CContainer fluid>
          <CHeaderBrand className="header-brand d-flex align-items-center justify-content-between w-100">
            <img
              src={logoUfps}
              alt="UFPS Logo"
              className="img-fluid"
              style={{ width: '90px', height: '90px', objectFit: 'contain' }}
            />
            <img
              src={ingSistemas}
              alt="Ingeniería de Sistemas"
              className="img-fluid mx-3"
              style={{ width: '90px', height: '90px', objectFit: 'contain' }}
            />
            <h1 className="text-center mx-3 my-0 flex-grow-1">
              APP Web Perfiles de Aprendizaje
            </h1>
            <img
              src={chaealogo}
              alt="CHAEA Logo"
              className="img-fluid"
              style={{ width: '160px', height: '160px', objectFit: 'contain' }}
            />
          </CHeaderBrand>
        </CContainer>
      </CHeader>

      <CContainer className="flex-grow-1 d-flex align-items-center">
        <CRow className="w-100 justify-content-center">
          <CCol md={10} lg={8}>
            <CCardGroup className="h-100 card-group">
              <LoginButton
                userType="estudiante"
                title="Estudiante"
                description="Entra y resuelve los cuestionarios de perfiles de aprendizaje asignados por tu profesor"
              />
              <LoginButton
                userType="profesor"
                title="Profesor"
                description="Entra y crea grupos, asígnales cuestionarios y analiza sus resultados"
              />
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>

      <CFooter className="bg-light p-3">
        <CContainer fluid>
          <CRow>
            <CCol className="text-center">
              <p className="text-muted mb-0">
                © {new Date().getFullYear()} Aplicativo Web para la Gestión de
                Cuestionarios
              </p>
            </CCol>
          </CRow>
        </CContainer>
      </CFooter>
    </div>
  )
}

export default Login
