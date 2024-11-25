import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getUserInfo } from '../services/userService'

const AuthContext = React.createContext({ user: null, signin: () => {}, signout: () => {} })

function AuthProvider({ children }) {
  let [getToken, setToken, removeToken] = useLocalStorage('authToken')
  const [user, setUser] = useState(null)

  let signin = (token, callback) => {
    setToken(token);
    getUserInfo().then(data => {
      setUser(data)
      callback();
    })
  };

  let signout = (callback) => {
    removeToken();
    setUser(null);
    callback();
  };

  let getUser = async () => {
    try{
      return await getUserInfo();
    }catch(error){
      console.error("Error in getUser from authprovider ", error);
      return null;
    }
  }
 

  let value = { getUser, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  return React.useContext(AuthContext)
}

export default AuthProvider
export { AuthContext, useAuth }
