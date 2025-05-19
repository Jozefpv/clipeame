import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ApiGateway } from '../gateways/api.gateway'

export default function ProtectedRoute() {
  const [authStatus, setAuthStatus] = useState<boolean | null>(null)
  const gateway = new ApiGateway()

  useEffect(() => {
    const verify = async () => {
      try {
        const ok = await gateway.checkAuth()
        setAuthStatus(ok)
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
