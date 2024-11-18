import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CButton, CSpinner } from '@coreui/react';
import Swal from 'sweetalert2';
import { obtenerCuestionario } from '../../util/services/cuestionarioService';

const ResponderCuestionario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cuestionario, setCuestionario] = useState(null);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCuestionario = async () => {
      try {
        const data = await obtenerCuestionario(id);
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
    if (respuestasSeleccionadas.some(respuesta => respuesta === null)) {
      Swal.fire('Advertencia', 'Debes seleccionar una opción para cada pregunta.', 'warning');
      return;
    }
  
    const respuestasDTO = {
      cuestionarioId: parseInt(id), // Convertir id a número
      opcionesSeleccionadasId: respuestasSeleccionadas.filter(Boolean), // Excluir respuestas nulas
    };
  
    console.log('RespuestasDTO:', respuestasDTO);
  
    // Descomentar el siguiente bloque para enviar las respuestas una vez que el endpoint esté listo
    // try {
    //   await responderCuestionario(respuestasDTO);
    //   Swal.fire('¡Enviado!', 'Tu cuestionario ha sido enviado.', 'success').then(() => {
    //     navigate('/estudiante/cuestionarios');
    //   });
    // } catch (error) {
    //   Swal.fire('Error', 'Hubo un problema al enviar el cuestionario.', 'error');
    // }
  };
  
  return (
    <CCard>
      <CCardHeader>
        Responder Cuestionario
      </CCardHeader>
      <CCardBody>
        {loading ? (
          <CSpinner color="primary" />
        ) : cuestionario ? (
          <>
            {cuestionario.preguntas.map((pregunta, preguntaIndex) => (
              <div key={pregunta.id}>
                <h5>{pregunta.pregunta}</h5>
                {pregunta.opciones.map((opcion) => (
                  <div key={opcion.id} style={{ marginBottom: '10px' }}>
                    <input
                      type="radio"
                      name={`pregunta-${preguntaIndex}`}
                      id={`pregunta-${preguntaIndex}-opcion-${opcion.id}`}
                      value={opcion.id}
                      checked={respuestasSeleccionadas[preguntaIndex] === opcion.id}
                      onChange={() => handleChange(preguntaIndex, opcion.id)}
                      style={{ marginRight: '10px' }}
                    />
                    <label htmlFor={`pregunta-${preguntaIndex}-opcion-${opcion.id}`}>{opcion.respuesta}</label>
                  </div>
                ))}
                <hr />
              </div>
            ))}
            <CButton color="primary" onClick={handleSubmit}>Enviar Respuestas</CButton>
          </>
        ) : (
          <p>Error al cargar el cuestionario.</p>
        )}
      </CCardBody>
    </CCard>
  );
};

export default ResponderCuestionario;