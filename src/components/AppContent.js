import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import { protectedRoutes } from '../routes'
import RequireAuth from '../util/auth/RequireAuth'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {protectedRoutes.map((route, idx) => (
            <Route key={idx} element={<RequireAuth roles={route.roles} />}>
              <Route
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            </Route>
          ))}

          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
