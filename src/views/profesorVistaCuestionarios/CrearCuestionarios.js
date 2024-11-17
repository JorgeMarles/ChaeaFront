import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CButton, CCard, CCardBody,CCardHeader,CForm,CFormLabel,CFormInput,CRow,CCol, CListGroup, CListGroupItem, CCollapse,CTable,CTableHead, CTableBody, CTableRow,CTableHeaderCell,CTableDataCell,CFormSelect,} from '@coreui/react';
import Swal from 'sweetalert2';

const CrearCuestionario = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [siglas, setSiglas] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [autor, setAutor] = useState('');
  const [version, setVersion] = useState('');
  const [categoriaNombre, setCategoriaNombre] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [preguntaTitulo, setPreguntaTitulo] = useState('');
  const [preguntaCategoria, setPreguntaCategoria] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const [opciones, setOpciones] = useState([{ id: 1, titulo: '' }]);
  const [expandedPreguntaId, setExpandedPreguntaId] = useState(null);


  const handleBack = () => {
    navigate('/administrar-cuestionarios');
  };

  const handleAddCategoria = () => {
    if (categoriaNombre.trim() !== '') {
      const newId = categorias.length + 1;
      setCategorias([...categorias, { id: newId, nombre: categoriaNombre }]);
      setCategoriaNombre('');
    }
  };

  const handleDeletePregunta = (id) => {
    setPreguntas(preguntas.filter((pregunta) => pregunta.id !== id));
  };

  const handleAddOpcion = () => {
    setOpciones([...opciones, { id: opciones.length + 1, titulo: '', valor: 1, categoriaId: null }]); 
  };
  
  const handleOpcionChange = (index, field, value) => {
    const newOpciones = [...opciones];
    newOpciones[index][field] = value;
    setOpciones(newOpciones);
  };

  const handleCrearCuestionario = () => {
    // Verificar que los campos principales no estén vacíos
    if (
      nombre.trim() === '' ||
      siglas.trim() === '' ||
      descripcion.trim() === '' ||
      autor.trim() === '' ||
      version.trim() === '' ||
      preguntas.length === 0
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, asegúrate de que todos los campos estén llenos y que exista al menos una pregunta.'
      });
      return;
    }
  
    // Mostrar alerta de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Vas a crear el cuestionario, una vez creado no será editable, ¿estás seguro que terminaste?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear'
    }).then((result) => {
      if (result.isConfirmed) {
        // Crear objeto de cuestionario
        const cuestionario = {
          nombre,
          siglas,
          descripcion,
          autor,
          version,
          preguntas: preguntas.map((pregunta, index) => ({
            pregunta: pregunta.titulo,
            orden: index + 1,
            opciones: pregunta.opciones.map((opcion, i) => ({
              orden: i + 1,
              respuesta: opcion.titulo,
              valor: opcion.valor,
              categoriaId: opcion.categoriaId
            }))
          })),
          categorias: categorias.map((categoria) => ({
            nombre: categoria.nombre,
            id: categoria.id
          }))
        };
  
        console.log("Cuestionario generado:", JSON.stringify(cuestionario, null, 2));
        // Lógica para enviar el cuestionario al endpoint irá aquí
  
        // Mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Cuestionario Creado',
          text: `El cuestionario "${nombre}" ha sido creado con éxito.`
        });
  
        // Reiniciar los campos
        setNombre('');
        setSiglas('');
        setDescripcion('');
        setAutor('');
        setVersion('');
        setPreguntaTitulo('');
        setPreguntaCategoria('');
        setOpciones([{ id: 1, titulo: '', valor: 0, categoriaId: null }]);
        setPreguntas([]);
        setCategorias([]);
      }
    });
  };

  const handleDeleteCategoria = (id) => {
    setCategorias(categorias.filter(categoria => categoria.id !== id));
  };
  
  const handleDeleteOpcion = (index) => {
    const newOpciones = opciones.filter((_, i) => i !== index);
    setOpciones(newOpciones);
  };

  const handleAddPregunta = () => {
    if (
      preguntaTitulo.trim() !== '' && // Verificar que el título de la pregunta no esté vacío
      opciones.every((opcion) => opcion.titulo.trim() !== '' && opcion.categoriaId !== undefined && opcion.valor !== undefined) // Verificar que cada opción tenga título, categoría y valor
    ) {
      const newPregunta = {
        id: preguntas.length + 1,
        titulo: preguntaTitulo,
        opciones: opciones.filter((opcion) => opcion.titulo.trim() !== '') // Filtrar solo las opciones con título
      };
      setPreguntas([...preguntas, newPregunta]);
      // Reiniciar campos
      setPreguntaTitulo('');
      setOpciones([{ id: 1, titulo: '', valor: 0, categoriaId: null }]);
    } else {
      // Mostrar una alerta utilizando SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Campos incompletos, asegúrate de que hay título de pregunta y que los campos de opción están completos.'
      });
    }
  };
  
  const toggleExpand = (id) => {
    setExpandedPreguntaId(expandedPreguntaId === id ? null : id);
  };

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <h3>Crear Nuevo Cuestionario</h3>
        <CButton color="secondary" onClick={handleBack}>Volver</CButton>
      </CCardHeader>
      <CCardBody>
        <CForm>
          {/* Información del cuestionario */}
          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel htmlFor="nombre">Nombre del Cuestionario</CFormLabel>
              <CFormInput
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre del cuestionario"
              />
            </CCol>
            <CCol md="6">
              <CFormLabel htmlFor="siglas">Siglas</CFormLabel>
              <CFormInput
                id="siglas"
                value={siglas}
                onChange={(e) => setSiglas(e.target.value)}
                placeholder="Ingrese las siglas del cuestionario"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel htmlFor="descripcion">Descripción corta</CFormLabel>
              <CFormInput
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingrese una descripción del cuestionario"
              />
            </CCol>
            <CCol md="6">
              <CFormLabel htmlFor="autor">Autor</CFormLabel>
              <CFormInput
                id="autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="Ingrese el nombre del autor"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel htmlFor="version">Versión</CFormLabel>
              <CFormInput
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="Ingrese la versión del cuestionario"
              />
            </CCol>
          </CRow>

            {/* Categorías */}
            <hr />
            <h5>Categorías</h5>
            <CRow className="mb-3">
              <CCol md="6">
                <CFormLabel htmlFor="categoriaNombre">Nombre de la Categoría</CFormLabel>
                <CFormInput
                  id="categoriaNombre"
                  value={categoriaNombre}
                  onChange={(e) => setCategoriaNombre(e.target.value)}
                  placeholder="Ingrese el nombre de la categoría"
                />
              </CCol>
              <CCol md="6" className="d-flex align-items-end">
                <CButton color="primary" onClick={handleAddCategoria}>
                  Agregar Categoría
                </CButton>
              </CCol>
            </CRow>

            <CListGroup className="mb-3">
              {categorias.map((categoria) => (
                <CListGroupItem key={categoria.id} className="d-flex justify-content-between align-items-center">
                  {categoria.nombre}
                  <CButton color="danger" size="sm" onClick={() => handleDeleteCategoria(categoria.id)}>X</CButton>
                </CListGroupItem>
              ))}
            </CListGroup>

  
          {/* Preguntas */}
          <hr />
          <h5>Preguntas</h5>
          <CRow className="mb-3">
            <CCol md="12">
              <CFormLabel htmlFor="preguntaTitulo">Título de la Pregunta</CFormLabel>
              <CFormInput
                id="preguntaTitulo"
                value={preguntaTitulo}
                onChange={(e) => setPreguntaTitulo(e.target.value)}
                placeholder="Ingrese el título de la pregunta"
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
              <CCol md="6">
                {opciones.map((opcion, index) => (
                  <div key={opcion.id} className="d-flex align-items-center mb-2">
                    <CFormLabel className="me-2" style={{ minWidth: '100px' }}>Opción {index + 1}</CFormLabel>
                    <CFormInput
                      value={opcion.titulo}
                      onChange={(e) => handleOpcionChange(index, "titulo", e.target.value)}
                      placeholder={`Ingrese la opción ${index + 1}`}
                      className="me-2"
                    />
                    <CFormInput
                      type="number"
                      value={opcion.valor}
                      onChange={(e) => handleOpcionChange(index, "valor", parseFloat(e.target.value))}
                      placeholder="Valor"
                      className="me-2"
                      style={{ width: "80px" }}
                    />
                    <select
                      className="form-select me-2"
                      value={opcion.categoriaId || ""}
                      onChange={(e) => handleOpcionChange(index, "categoriaId", parseInt(e.target.value))}
                    >
                      <option value="">Seleccione Categoría</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                    <CButton
                      color="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleDeleteOpcion(index)}
                    >
                      X
                    </CButton>
                  </div>
                ))}
                <CButton color="primary" onClick={handleAddOpcion}>
                  Agregar Opción
                </CButton>
              </CCol>
            </CRow>

  
          <CButton color="success" onClick={handleAddPregunta}>
            Finalizar Pregunta
          </CButton>
  
          {/* Lista de preguntas */}
          <CTable hover responsive className="mt-3">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Orden</CTableHeaderCell>
                        <CTableHeaderCell>Título de la Pregunta</CTableHeaderCell>
                        <CTableHeaderCell>Opciones</CTableHeaderCell>
                        <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
          {preguntas.map((pregunta) => (
            <React.Fragment key={pregunta.id}>
              <CTableRow onClick={() => toggleExpand(pregunta.id)} style={{ cursor: "pointer" }}>
                <CTableDataCell>{pregunta.id}</CTableDataCell>
                <CTableDataCell>{pregunta.titulo}</CTableDataCell>
                <CTableDataCell>{pregunta.opciones.length}</CTableDataCell>
                <CTableDataCell className="text-end">
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que el evento se propague
                      handleDeletePregunta(pregunta.id);
                    }}
                  >
                    -
                  </CButton>
                </CTableDataCell>
              </CTableRow>
              {expandedPreguntaId === pregunta.id && (
                <CTableRow>
                  <CTableDataCell colSpan="4">
                    <CCollapse visible={expandedPreguntaId === pregunta.id}>
                      <CTable hover>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell>Orden</CTableHeaderCell>
                            <CTableHeaderCell>Opción</CTableHeaderCell>
                            <CTableHeaderCell>Categoría</CTableHeaderCell>
                            <CTableHeaderCell>Valor</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {pregunta.opciones.map((opcion, index) => (
                            <CTableRow key={opcion.id}>
                              <CTableDataCell>{index + 1}</CTableDataCell>
                              <CTableDataCell>{opcion.titulo}</CTableDataCell>
                              <CTableDataCell>
                                {categorias.find((cat) => cat.id === opcion.categoriaId)?.nombre || "Sin categoría"}
                              </CTableDataCell>
                              <CTableDataCell>{opcion.valor}</CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CCollapse>
                  </CTableDataCell>
                </CTableRow>
              )}
            </React.Fragment>
          ))}
        </CTableBody>
          </CTable>
          <CButton color="success" onClick={handleCrearCuestionario}>
            Crear Cuestionario
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );  
};

export default CrearCuestionario;