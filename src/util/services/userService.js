import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { dateFromStringToMsUTC } from "../dateUtils";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const [getToken, setToken, removeToken] = useLocalStorage("authToken")

const getUserInfo = async () => {
    console.log("get user info token", getToken());
    
    const response = await axios.get(`${API_URL}/api/user/info`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    if(response.status == 200){
        return response.data;
    }
}

const updateUserInfo = async (user) => {
    console.log("get user info token", getToken());
    console.log("updating user ", user);
    
    user.fechaNacimiento = dateFromStringToMsUTC(user.fechaNacimiento)

    const endpoint = user.tipoUsuario === 'ESTUDIANTE' ? 'estudiantes' : 'profesores'

    const response = await axios.put(`${API_URL}/api/${endpoint}`, 
        user, 
        {
            headers: {
                'Authorization': `Bearer ${getToken()}`,

            },
        })
    const responseOut = {
        ok: response.status === 200,
        data: response.data,
        status: response.status,
    }
    return responseOut
}

export {
    getUserInfo,
    updateUserInfo
}