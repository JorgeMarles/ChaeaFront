import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Autosuggest from 'react-autosuggest'

import { CCard, CCardBody, CCol, CCardHeader, CRow, CForm, CFormLabel, CFormInput, CButton, CButtonGroup, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'

const AdministrarGrupos = () => {
  const [nombre, setNombre] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [grupos, setGrupos] = useState([])
  const [expandedGrupoId, setExpandedGrupoId] = useState(null)
  const [profesores, setProfesores] = useState([])
  const [selectedProfesor, setSelectedProfesor] = useState(null)
  const [emails, setEmails] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8091/api/grupos')
      .then(response => {
        setGrupos(response.data)
      })
      .catch(error => {
        console.error('Error fetching grupos:', error)
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8091/api/profesores')
      .then(response => {
        setProfesores(response.data)
      })
      .catch(error => {
        console.error('Error fetching profesores:', error)
      })
  }, [])
  
  const toggleExpand = (grupoId) => {
    setExpandedGrupoId(expandedGrupoId === grupoId ? null : grupoId)
  }

  const handleDelete = (grupo) => {
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el grupo ${grupo.nombre} con ${grupo.estudiantes.length} estudiantes?`,
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8091/api/grupos/${grupo.id}`)
          .then(response => {
            setGrupos(grupos.filter(g => g.id !== grupo.id))
            Swal.fire({
              title: "¡Eliminado!",
              text: "El grupo ha sido eliminado.",
              icon: "success"
            })
          })
          .catch(error => {
            console.error('Error deleting grupo:', error)
            Swal.fire({
              title: "Error",
              text: "Hubo un error al eliminar el grupo.",
              icon: "error"
            })
          })
      }
    })
  }

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      Papa.parse(e.target.files[0], {
        complete: (result) => {
          const emailsArray = result.data.map((row) => row.email).filter((email) => email)
          setEmails(emailsArray.join(', '))
        },
        header: true
      })
    }
  }
  
  const handleCreateGroup = (e) => {
    e.preventDefault()
    if (!selectedProfesor || !nombre) {
      alert('Por favor, completa todos los campos.')
      return
    }
    const emailsArray = emails.split(',').map(email => email.trim()).filter(email => email !== '')
    const grupoDTO = {
      nombre: nombre,
      profesorEmail: selectedProfesor,
      correosEstudiantes: emailsArray.length > 0 ? emailsArray : null
    }
    axios.post('http://localhost:8091/api/grupos', grupoDTO)
      .then(response => {
        alert('Grupo creado exitosamente.')
        setModalVisible(false)
        // Actualiza la lista de grupos si es necesario
        setGrupos([...grupos, response.data])
      })
      .catch(error => {
        console.error('Error creando el grupo:', error)
        alert('Error creando el grupo.')
      })
  }
  
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <span>Listado de Grupos</span>
              <CButtonGroup role="group" aria-label="Basic mixed styles example">
                <CButton color="success" onClick={() => setModalVisible(true)}> + </CButton>
              </CButtonGroup>
            </CCardHeader>
            <CCardBody>
              {grupos.length === 0 ? (
                <p>No hay grupos disponibles</p>
              ) : (
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Nombre</CTableHeaderCell>
                      <CTableHeaderCell>Profesor</CTableHeaderCell>
                      <CTableHeaderCell>Número de Estudiantes</CTableHeaderCell>
                      <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {grupos.map(grupo => (
                      <React.Fragment key={grupo.id}>
                        <CTableRow>
                          <CTableDataCell>{grupo.nombre}</CTableDataCell>
                          <CTableDataCell>{grupo.profesor.nombre}</CTableDataCell>
                          <CTableDataCell onClick={() => toggleExpand(grupo.id)} style={{ cursor: 'pointer' }}>
                            {grupo.estudiantes.length}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="danger" size="sm" onClick={() => handleDelete(grupo)}> - </CButton>
                          </CTableDataCell>

                        </CTableRow>
                        {expandedGrupoId === grupo.id && (
                          <CTableRow>
                            <CTableDataCell colSpan="4">
                              <ul>
                                {grupo.estudiantes.map(estudiante => (
                                  <li key={estudiante.email}>
                                    {estudiante.nombre} ({estudiante.email})
                                  </li>
                                ))}
                              </ul>
                            </CTableDataCell>
                          </CTableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader onClose={() => setModalVisible(false)}>
          <CModalTitle>Crear Nuevo Grupo</CModalTitle>
        </CModalHeader>
        <CModalBody>
  <CForm onSubmit={handleCreateGroup}>
    <CFormLabel htmlFor="nombre">Nombre del Grupo</CFormLabel>
    <CFormInput
      type="text"
      id="nombre"
      placeholder="Ingrese el nombre del grupo"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
    />
    <CFormLabel htmlFor="profesor" className="mt-3">Selecciona un Profesor</CFormLabel>
    <select
      className="mt-1 block w-full p-2 border border-gray-300 rounded"
      value={selectedProfesor ?? ''}
      onChange={e => setSelectedProfesor(e.target.value)}
    >
      <option value="" disabled>Selecciona un profesor</option>
      {profesores.map(profesor => (
        <option key={profesor.email} value={profesor.email}>
          {profesor.nombre}
        </option>
      ))}
    </select>
    <CFormLabel htmlFor="emails" className="mt-3">Correos de Estudiantes (separados por comas)</CFormLabel>
    <CFormInput
      type="text"
      id="emails"
      placeholder="Ingresa los correos de los estudiantes"
      value={emails}
      onChange={(e) => setEmails(e.target.value)}
    />
    <CFormLabel htmlFor="file" className="mt-3">Subir archivo CSV</CFormLabel>
    <CFormInput
      type="file"
      id="file"
      accept=".csv"
      onChange={handleFileUpload}
    />
  </CForm>
</CModalBody>
<CModalFooter>
  <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancelar</CButton>
  <CButton color="primary" onClick={handleCreateGroup}>Crear Grupo</CButton>
    </CModalFooter>

      </CModal>
    </>
  )
}

export default AdministrarGrupos