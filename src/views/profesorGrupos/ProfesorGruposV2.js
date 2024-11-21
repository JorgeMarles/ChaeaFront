import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Autosuggest from 'react-autosuggest'
import Papa from 'papaparse'

import {
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CButtonGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAlert,
} from '@coreui/react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  getGroups,
  getProfesores,
  getEstudiantes,
  deleteGrupo,
  createGrupo,
  addStudentsToGroup,
  deleteStudentFromGroup,
  getGroupById,
} from '../../util/services/grupoService'

const ProfesorGrupos = () => {
  const user = useOutletContext()
  const [nombre, setNombre] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [grupos, setGrupos] = useState([])
  const [expandedGrupoId, setExpandedGrupoId] = useState(null)
  const [profesores, setProfesores] = useState([])
  const [selectedProfesor, setSelectedProfesor] = useState(null)
  const [emails, setEmails] = useState('')
  const [selectedGrupo, setSelectedGrupo] = useState(null)
  const [students, setStudents] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [profesor, setProfesor] = useState(null)
  const [profesorSuggestions, setProfesorSuggestions] = useState([])
  const [modalAddStudentVisible, setModalAddStudentVisible] = useState(false)
  const [currentGrupoId, setCurrentGrupoId] = useState(null)
  const [newStudentEmail, setNewStudentEmail] = useState('')
  const [selectedNewStudents, setSelectedNewStudents] = useState([])
  const navigate = useNavigate()

  /////////////////////////NO SIRVEEEEE (desarrollarlos desde grupoService y ponerles el token (guiarse de userService))
  useEffect(() => {
    getGroups()
      .then((data) => setGrupos(data))
      .catch((error) => {
        console.error('Error fetching grupos:', error)
      })
  }, [])

  useEffect(() => {
    getProfesores()
      .then((data) => setProfesores(data))
      .catch((error) => {
        console.error('Error fetching profesores:', error)
      })
  }, [])

  useEffect(() => {
    getEstudiantes()
      .then((data) => setStudents(data))
      .catch((error) => {
        console.error('Error fetching estudiantes:', error)
      })
  }, [])

  const toggleExpand = (grupoId) => {
    setExpandedGrupoId(expandedGrupoId === grupoId ? null : grupoId)
  }

  const handleDelete = (grupo) => {
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el grupo ${grupo.nombre} con ${grupo.numEstudiantes} estudiantes?`,
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGrupo(grupo.id)
          .then(() => {
            setGrupos(grupos.filter((g) => g.id !== grupo.id))
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El grupo ha sido eliminado.',
              icon: 'success',
            })
          })
          .catch((error) => {
            console.error('Error deleting grupo:', error)
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al eliminar el grupo.',
              icon: 'error',
            })
          })
      }
    })
  }

  const handleFileChangeAddStudents = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    const updatedNewStudents = []
    const file = e.target.files[0]

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const emailsArray = result.data
            .map((row) => row.correo || row.email)
            .filter((email) => email)
          const uniqueCsvStudents = emailsArray.filter(
            (email) => !updatedNewStudents.includes(email),
          )
          setSelectedNewStudents(uniqueCsvStudents)
          console.log('Estudiantes agregados desde CSV:', uniqueCsvStudents) // Verificar correos añadidos desde CSV
        },
        header: true,
      })
    }
  }

  const handleFileChangeCreateGroup = (e) => {
    const updatedStudents = []

    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    handleFileUpload(e.target.files[0], updatedStudents)
  }

  const handleFileUpload = (file, updatedStudents) => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const emailsArray = result.data
            .map((row) => {
              return { email: row.email ?? row.correo, nombre: row.nombre }
            })
            .filter((email) => email.email)
          const csvStudents = emailsArray.map((email) => ({
            email: email.email,
            fromCSV: true,
            nombre: email.nombre,
          }))

          const uniqueCsvStudents = csvStudents.filter(
            (csvStudent) =>
              !updatedStudents.some(
                (selectedStudent) => selectedStudent.email === csvStudent.email,
              ),
          )

          setSelectedStudents(uniqueCsvStudents)
          console.log('Estudiantes agregados desde CSV:', uniqueCsvStudents) // Verificar correos añadidos desde CSV
        },
        header: true,
      })
    }
  }

  const handleCreateGroup = (e) => {
    e.preventDefault()
    if (!nombre) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        icon: 'warning',
      })
      return
    }

    const emailsArray = selectedStudents.map((student) => {
      return { email: student.email, nombre: student.nombre }
    })
    const grupoDTO = {
      nombre: nombre,
      profesorEmail: user.email,
      estudiantes: emailsArray,
    }

    console.log('grupoDTO:', grupoDTO) // Verificar el objeto grupoDTO

    getGroups()
      .then((res) => {
        const grupoExistente = res.find(
          (grupo) => grupo.nombre.toLowerCase() === nombre.toLowerCase(),
        )
        if (grupoExistente) {
          Swal.fire({
            title: 'Conflicto',
            text: 'Ya existe un grupo con este nombre.',
            icon: 'error',
          })
        } else {
          createGrupo(grupoDTO)
            .then((response) => {
              Swal.fire({
                title: '¡Grupo creado exitosamente!',
                text: 'El grupo ha sido creado con éxito.',
                icon: 'success',
              })
              setModalVisible(false)
              console.log(response);
              const x = {...response, numEstudiantes: response.estudiantes.length}
              setGrupos([...grupos, x])
              clearForm() // Limpiar la lista de estudiantes seleccionados y otros campos del formulario
            })
            .catch((error) => {
              console.error('Error creando el grupo:', error.message || error)
              Swal.fire({
                title: 'Error',
                text: error.message || 'Hubo un error al crear el grupo.',
                icon: 'error',
              })
            })
        }
      })
      .catch((error) => {
        console.error(
          'Error verificando el nombre del grupo:',
          error.message || error,
        )
        Swal.fire({
          title: 'Error',
          text:
            error.message || 'Hubo un error al verificar el nombre del grupo.',
          icon: 'error',
        })
      })
  }

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : students.filter(
          (student) =>
            student.email.toLowerCase().includes(inputValue),
        )
  }

  const getSuggestionValue = (suggestion) => suggestion.email

  const renderSuggestion = (suggestion) => <div>{suggestion.email}</div>

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const onSuggestionSelected = (event, { suggestion }) => {
    if (
      !selectedStudents.some((student) => student.email === suggestion.email)
    ) {
      setSelectedStudents([...selectedStudents, suggestion])
    }
    setEmails('') // Limpiar el campo de búsqueda después de seleccionar un estudiante
  }

  const clearForm = () => {
    setNombre('')
    setEmails('')
    setSelectedStudents([])
    document.getElementById('file').value = null // Limpiar el input del archivo CSV
  }

  const handleAddStudentsToGroup = (e) => {
    e.preventDefault()
    console.log('Correo ingresado:', newStudentEmail) // Verificar el correo ingresado
    console.log('ID del Grupo:', currentGrupoId) // Verificar la ID del grupo

    if (selectedNewStudents.length === 0) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, ingresa al menos un correo de estudiante.',
        icon: 'warning',
      })
      return
    }

    console.log(
      'Enviando solicitud para añadir estudiantes:',
      selectedNewStudents,
    ) // Verificar estudiantes seleccionados
    addStudentsToGroup(currentGrupoId, selectedNewStudents)
      .then((response) => {
        console.log('Respuesta del servidor:', response) // Verificar respuesta del servidor

        // Hacer una solicitud adicional para obtener la información actualizada del grupo
        getGroupById(currentGrupoId)
          .then((updatedGrupo) => {
            setGrupos((prevGrupos) =>
              prevGrupos.map((grupo) =>
                grupo.id === currentGrupoId ? updatedGrupo : grupo,
              ),
            )
            setSelectedNewStudents([])
            setModalAddStudentVisible(false)
            Swal.fire({
              title: '¡Añadidos!',
              text: 'Los estudiantes han sido añadidos.',
              icon: 'success',
            })
          })
          .catch((groupError) => {
            console.error(
              'Error al obtener la información del grupo:',
              groupError,
            )
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al obtener la información del grupo.',
              icon: 'error',
            })
          })
      })
      .catch((error) => {
        console.error('Error añadiendo estudiantes:', error)
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al añadir los estudiantes.',
          icon: 'error',
        })
      })
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CAlert color="info" className="mb-4">
            Bienvenid@ Profesor {user.nombre}
          </CAlert>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <span>Listado de Grupos</span>
              <CButtonGroup
                role="group"
                aria-label="Basic mixed styles example"
              >
                <CButton color="success" onClick={() => setModalVisible(true)}>
                  {' '}
                  +{' '}
                </CButton>
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
                      <CTableHeaderCell>Número de Estudiantes</CTableHeaderCell>
                      <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {grupos.map((grupo) => (
                      <React.Fragment key={grupo.id}>
                        <CTableRow
                          onClick={() => navigate(`/grupos/${grupo.id}`)}
                          style={{ cursor: 'pointer' }}
                        >
                          <CTableDataCell>{grupo.nombre}</CTableDataCell>
                          <CTableDataCell>
                            {grupo.numEstudiantes}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(grupo)
                              }}
                            >
                              {' '}
                              -{' '}
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      </React.Fragment>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
          clearForm()
        }}
      >
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
            <CFormLabel htmlFor="buscarEstudiantes">
              Buscar estudiantes
            </CFormLabel>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={{
                placeholder: 'Escribe un correo electrónico',
                value: emails,
                onChange: (e, { newValue }) => setEmails(newValue),
              }}
              onSuggestionSelected={onSuggestionSelected}
            />

            <CFormLabel htmlFor="file" className="mt-3">
              Subir archivo CSV (Columnas: correo, nombre)
            </CFormLabel>
            <CFormInput
              type="file"
              id="file"
              accept=".csv"
              onChange={handleFileChangeCreateGroup}
            />

            <CFormLabel className="mt-3">Estudiantes seleccionados</CFormLabel>
            <ul>
              {selectedStudents.map((student) => (
                <li key={student.email}>{student.email}</li>
              ))}
            </ul>
            <CButton type="submit" color="primary">
              Crear Grupo
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={modalAddStudentVisible}
        onClose={() => setModalAddStudentVisible(false)}
      >
        <CModalHeader onClose={() => setModalAddStudentVisible(false)}>
          <CModalTitle>Agregar Estudiantes</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddStudentsToGroup}>
            <CFormLabel htmlFor="newStudentEmail">
              Correo del Estudiante
            </CFormLabel>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={{
                id: 'newStudentEmail', // Asegúrate de que esto coincida con el "for" del label
                placeholder: 'Escribe un correo electrónico',
                value: newStudentEmail,
                onChange: (e, { newValue }) => setNewStudentEmail(newValue),
              }}
              onSuggestionSelected={(event, { suggestion }) => {
                if (!selectedNewStudents.includes(suggestion.email)) {
                  setSelectedNewStudents([
                    ...selectedNewStudents,
                    suggestion.email,
                  ])
                }
                setNewStudentEmail('')
              }}
            />
            <CFormLabel htmlFor="file" className="mt-3">
              Subir archivo CSV (Columna: correo/email)
            </CFormLabel>
            <CFormInput
              type="file"
              id="file"
              accept=".csv"
              onChange={(e) =>
                handleFileChangeAddStudents(
                  e,
                  setSelectedNewStudents,
                  selectedNewStudents,
                )
              }
            />
          </CForm>
          <ul>
            {selectedNewStudents.map((email) => (
              <li key={email}>{email}</li>
            ))}
          </ul>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setModalAddStudentVisible(false)}
          >
            Cancelar
          </CButton>
          <CButton
            color="primary"
            type="submit"
            onClick={handleAddStudentsToGroup}
          >
            Agregar Estudiantes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ProfesorGrupos
