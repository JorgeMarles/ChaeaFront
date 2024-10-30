import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import { getRole, getRoleKey } from '../userUtils'

function RequireAuth({ roles }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  let auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const nuser = await auth.getUser()

      setUser(nuser)

      if (!nuser) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        navigate('/login')
      } else {
        const rol = getRole(nuser)
        console.log(
          'User ',
          nuser,
          ' with rol ',
          getRoleKey(rol),
          ' trying access resource with roles ',
          roles.map((e) => getRoleKey(e)),
        )

        if (!roles.includes(rol)) {
          navigate('/')
        }
      }
      setLoading(false)
    })()
  }, [])

  return loading ? <CSpinner variant="grow" /> : <Outlet context={user} />
}

export default RequireAuth
