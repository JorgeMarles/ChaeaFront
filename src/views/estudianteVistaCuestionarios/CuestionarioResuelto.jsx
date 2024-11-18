import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCuestionarioResultado } from "../../util/services/cuestionarioService";


const ResultadoCuestionario = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        getCuestionarioResultado(id).then(data => {
            if(data.ok){

            }else{
                throw new Error('Error al obtener cuestionario')
            }
        }).catch(err => {
            navigate('/cuestionarios')
        })
    }, [])
    //con el id se puede llamar al endpoint, pero como no existe, queda en veremos
    //TO DO: lean el modelo de datos para que vean como queda mas o menos el modelo de JSON
    //para cuando haga el endpoint y devuelva el json, no quede tan diferente :p
    return <>
        <h1>Holaaaaaaaaaa resultado cuestionario {id}</h1>
    </>
}

export default ResultadoCuestionario;