import { useParams } from "react-router-dom";


const ResponderCuestionario = () => {
    const {id} = useParams();
    //con el id se puede llamar al endpoint, pero como no existe, queda en veremos
    //TO DO: lean el modelo de datos para que vean como queda mas o menos el modelo de JSON
    //para cuando haga el endpoint y devuelva el json, no quede tan diferente :p
    return <>
        <h1>Holaaaaaaaaaa responder cuestionario {id}</h1>
    </>
}

export default ResponderCuestionario;