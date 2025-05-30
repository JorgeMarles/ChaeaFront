import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useAuth } from '../util/auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { cilMenu, cilAccountLogout } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const headerRef = useRef()

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          'shadow-sm',
          document.documentElement.scrollTop > 0,
        )
    })
  }, [])

  const handleLogout = () => {
    auth.signout(() => navigate('/login'))
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav>
          <AppHeaderDropdown />

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CNavItem>
            <CNavLink href="#" onClick={handleLogout}>
              
            </CNavLink>
            
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" onClick={handleLogout}>
              <CIcon icon={cilAccountLogout} size="lg" />
            </CNavLink>
          </CNavItem>
           <CNavItem>
            <CNavLink href="#" onClick={handleLogout}>
              
            </CNavLink>
            </CNavItem>
           <CNavItem>
            <CNavLink href="#" onClick={handleLogout}>
              
            </CNavLink>
          </CNavItem>
           <CNavItem>
            <CNavLink href="#" onClick={handleLogout}>
              
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid></CContainer>
    </CHeader>
  )
}

export default AppHeader
