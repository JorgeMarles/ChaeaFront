import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CForm, CFormLabel, CFormInput, CButton, CButtonGroup, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'

const AdministrarGrupos = () => {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [grupos, setGrupos] = useState([])
  const [expandedGrupoId, setExpandedGrupoId] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:8091/api/grupos')
      .then(response => {
        setGrupos(response.data)
      })
      .catch(error => {
        console.error('Error fetching grupos:', error)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Nombre del Grupo:', nombre)
    console.log('Descripción:', descripcion)
    setModalVisible(false) // Cerrar el modal después de agregar el grupo
  }

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
          <CForm onSubmit={handleSubmit}>
            <CFormLabel htmlFor="nombre">Nombre del Grupo</CFormLabel>
            <CFormInput
              type="text"
              id="nombre"
              placeholder="Ingrese el nombre del grupo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <CFormLabel htmlFor="descripcion" className="mt-3">Descripción</CFormLabel>
            <CFormInput
              type="text"
              id="descripcion"
              placeholder="Ingrese una descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancelar</CButton>
          <CButton color="primary" onClick={handleSubmit}>Crear Grupo</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AdministrarGrupos