import axios from 'axios'
import { useLocalStorage } from "../hooks/useLocalStorage";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const [getToken, setToken, removeToken] = useLocalStorage("authToken")