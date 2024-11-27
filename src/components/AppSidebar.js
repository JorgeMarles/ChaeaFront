import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'


// sidebar nav config
import navigation from '../_nav'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../util/auth/AuthProvider'
import { getRole } from '../util/userUtils'
import CHAEA_BAR from 'src/assets/images/CHAEA_BAR.PNG';
import chaealogo from 'src/assets/images/chaealogo.png';
const AppSidebar = () => {
  const dispatch = useDispatch()
  const auth = useAuth()
  const [rol, setRol] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    ;(async () => {
      const nuser = await auth.getUser()
      if (!nuser) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        navigate('/login')
      } else {
        const rol = getRole(nuser)
        setRol(rol)
      }
    })()
  }, [])
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        
      <CSidebarBrand to="/"> 
      <img src={CHAEA_BAR} alt="CHAEA Logo" className="img-fluid" 
      style={{ height: '8vh', width:'100vw'}} /> 
      
      </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} rol={rol} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() =>
            dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })
          }
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
