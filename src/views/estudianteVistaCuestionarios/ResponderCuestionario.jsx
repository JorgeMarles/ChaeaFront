import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CCard,CCardBody,CCardHeader,CButton,CSpinner,CRow,CCol,CFormCheck,
} from '@coreui/react';
import Swal from 'sweetalert2';
import { obtenerCuestionario, responderCuestionario } from '../../util/services/cuestionarioService';

const ResponderCuestionario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cuestionario, setCuestionario] = useState(null);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortByOrder = (a, b) => a.orden - b.orden;

  useEffect(() => {
    const fetchCuestionario = async () => {
      try {
        const data = await obtenerCuestionario(id);
        // Ordenar preguntas y sus opciones
        data.preguntas.sort(sortByOrder);
        data.preguntas.forEach((pregunta) => {
          pregunta.opciones.sort(sortByOrder);
        });
  
        setCuestionario(data);
        setRespuestasSeleccionadas(data.preguntas.map(() => null)); // Inicializar con null
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cuestionario:', error);
        setLoading(false);
      }
    };
  
    fetchCuestionario();
  }, [id]);
  
  const handleChange = (preguntaIndex, opcionId) => {
    const nuevasRespuestas = [...respuestasSeleccionadas];
    nuevasRespuestas[preguntaIndex] = opcionId;
    setRespuestasSeleccionadas(nuevasRespuestas);
  };

  const handleSubmit = async () => {
    if (respuestasSeleccionadas.some((respuesta) => respuesta === null)) {
      Swal.fire('Advertencia', 'Debes seleccionar una opción para cada pregunta.', 'warning');
      return;
    }

    const respuestasDTO = {
      cuestionarioId: parseInt(id), // Convertir id a número
      opcionesSeleccionadasId: respuestasSeleccionadas.filter(Boolean), // Excluir respuestas nulas
    };

    try {
      await responderCuestionario(respuestasDTO);
      Swal.fire('¡Enviado!', 'Tu cuestionario ha sido enviado.', 'success').then(() => {
        navigate('/cuestionarios');
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Hubo un problema al enviar el cuestionario.', 'error');
    }
  };

  return (
    <CRow className="justify-content-center mt-4">
      <CCol md={10} lg={8}>
        <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
              <div className="mx-auto">
                <h3>{loading ? 'Cargando cuestionario' : cuestionario ? cuestionario.nombre : 'null'}</h3>
              </div>
              <CButton onClick={() => navigate('/cuestionarios')} color="secondary" className="ml-auto">
                Volver
              </CButton>
            </CCardHeader>
          <CCardBody>
            {loading ? (
              <div className="text-center">
                <CSpinner color="primary" />
                <p>Cargando cuestionario...</p>
              </div>
            ) : cuestionario ? (
              <>
                <div className="mb-4 text-center">
                  <h4>{cuestionario.titulo}</h4>
                  <p className="text-muted">{cuestionario.descripcion}</p>
                </div>
                {cuestionario.preguntas.map((pregunta, preguntaIndex) => (
                  <CCard key={pregunta.id} className="mb-3">
                    <CCardBody>
                      <h5 className="mb-3">{pregunta.pregunta}</h5>
                      {pregunta.opciones.map((opcion) => (
                        <CFormCheck
                          key={opcion.id}
                          type="radio"
                          name={`pregunta-${preguntaIndex}`}
                          id={`pregunta-${preguntaIndex}-opcion-${opcion.id}`}
                          value={opcion.id}
                          label={opcion.respuesta}
                          checked={respuestasSeleccionadas[preguntaIndex] === opcion.id}
                          onChange={() => handleChange(preguntaIndex, opcion.id)}
                          className="mb-2"
                        />
                      ))}
                    </CCardBody>
                  </CCard>
                ))}
                <div className="text-center">
                  <CButton color="success" size="lg" onClick={handleSubmit}>
                    Enviar Respuestas
                  </CButton>
                </div>
              </>
            ) : (
              <p className="text-center text-danger">Error al cargar el cuestionario.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ResponderCuestionario;
