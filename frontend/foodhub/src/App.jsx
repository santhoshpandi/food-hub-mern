import { Route, Routes, Outlet, Navigate, useNavigate } from 'react-router-dom'
import { Suspense, lazy, useCallback, useState } from 'react'
import './App.css'
import routes from './routes.jsx'
const Header = lazy(() => import('./components/Header'))
const Footer = lazy(() => import('./components/Footer'))
import Loading from './components/Loading'
const Authentication = lazy(() => import('./components/Authentication'))
import { BillProvider } from './contexts/BillContext'
import { UserProvider, useUser } from './contexts/UserContext'

//Context Management
function AppProvider({ children }) {

  return (
    <UserProvider>
      <BillProvider>
        {children}
      </BillProvider>
    </UserProvider>
  )
}

//Layout Management
function Layout() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}


function App() {

  return (

    <Suspense fallback={<Loading />}>
      <AppProvider>

        <ProtectedRoute />

      </AppProvider>
    </Suspense>

  )
}


function ProtectedRoute() {
  const { userData } = useUser()

  return (
    <Routes>
      {
        userData._id ?

          // if User is Logged In
          routes.map((route, index) => (
            route.layout === false ? (
              <Route key={index} path={route.path} element={route.component} />
            ) : (
              <Route key={index} element={<Layout />}>
                <Route path={route.path} element={route.component} />
              </Route>
            )
          ))
          :
          // If User not Logged in
          <Route path='*' element={<Authentication />} />

      }
    </Routes>
  )
}

export default App
