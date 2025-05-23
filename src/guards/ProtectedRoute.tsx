import React, { useState, useEffect, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ApiGateway } from '../gateways/api.gateway'
import { AuthGateway } from '../gateways/auth.gateway'
import { AuthContext } from '../context/AuthContext'

export default function ProtectedRoute() {
  const [authStatus, setAuthStatus] = useState<boolean | null>(null)
  const { setProfile } = useContext(AuthContext);
  const gateway = new ApiGateway()
  const authGateway = new AuthGateway()

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await gateway.checkAuth();
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        res.status === 200 ? setAuthStatus(true) : setAuthStatus(false)

        if(res.status === 200){
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          const response = await authGateway.getProfile(res.data.user.id)
          setProfile(response)
        }
      } catch {
        setAuthStatus(false)
      }
    }

    verify()
  }, [])

  if (authStatus === null) {
    return <div className="text-white">Comprobando sesión…</div>
  }

  return authStatus
    ? <Outlet />
    : <Navigate to="/begin" replace />
}
