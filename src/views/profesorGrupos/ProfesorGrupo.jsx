import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addStudentsToGroup,
  deleteStudentFromGroup,
  getEstudiantes,
  getGroupById,
} from '../../util/services/grupoService'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Autosuggest from 'react-autosuggest'
import Swal from 'sweetalert2'

const ProfesorGrupo = () => {
  const { id } = useParams()
  const [grupo, setGrupo] = useState({ estudiantes: [] })
  const [modalAddStudentVisible, setModalAddStudentVisible] = useState(false)
  const currentGrupoId = id
  const [suggestions, setSuggestions] = useState([])

  const [nombre, setNombre] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [grupos, setGrupos] = useState([])
  const [students, setStudents] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [newStudentEmail, setNewStudentEmail] = useState('')
  const [selectedNewStudents, setSelectedNewStudents] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getGroupById(id).then((el) => {
      console.log(el)
      
      setGrupo(el)


      getEstudiantes().then(el => setStudents(el))
    })
  }, [])

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

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : students.filter((student) =>
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

  const handleDeleteEstudiante = (estudianteEmail, grupoId) => {
    deleteStudentFromGroup(grupoId, estudianteEmail)
      .then(() => {
        setGrupo({
          ...grupo,
          estudiantes: grupo.estudiantes.filter(
            (est) => est.email !== estudianteEmail,
          ),
        })
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El estudiante ha sido eliminado.',
          icon: 'success',
        })
      })
      .catch((error) => {
        console.error('Error eliminando estudiante:', error)
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al eliminar el estudiante.',
          icon: 'error',
        })
      })
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
      <div className="d-flex justify-content-start">
      <CButton color="secondary" onClick={() => navigate('/grupos')} >Volver</CButton> 
      </div>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <span>Lista de Estudiantes {grupo.nombre}</span>
          <CButton
            color="success"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setModalAddStudentVisible(true)
            }}
          >
            {' '}
            +{' '}
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Correo</CTableHeaderCell>
                <CTableHeaderCell>Eliminar</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {grupo.estudiantes.map((estudiante) => (
                <CTableRow key={estudiante.email}>
                  <CTableDataCell>{estudiante.nombre}</CTableDataCell>
                  <CTableDataCell>{estudiante.email}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() =>
                        handleDeleteEstudiante(estudiante.email, grupo.id)
                      }
                    >
                      {' '}
                      -{' '}
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
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
              Subir archivo CSV (Columnas: correo, nombre)
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

export default ProfesorGrupo
