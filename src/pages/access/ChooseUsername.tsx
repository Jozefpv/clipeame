import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { AuthGateway } from '../../gateways/auth.gateway'

interface RegisterForm {
  email: string
  password: string
}

export default function ChooseUsername() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const form = (location.state as RegisterForm) || null
  const gateway = new AuthGateway()

  useEffect(() => {
    if (!form) {
      navigate('/register')
    }
  }, [form, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!username.trim()) {
      return setError('El nombre de usuario no puede estar vacío')
    }
    try {
      const res = await gateway.login(form.email, form.password)
      if (res.verify) {
        navigate('/')
      } else {
        const { error } = await res
        setError(error)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(`Error de servidor ${err}`)
    }
  }

  return (
    <div className="min-h-screen w-full bg-transparent flex items-center justify-center px-4">
      <div className="bg-zinc-800 border border-zinc-600 rounded-2xl p-8 w-full max-w-sm text-center space-y-6">
        <div className="flex items-center justify-center">
          <h2 className="text-white text-2xl font-semibold flex items-center">
            Elige un nombre de usuario
            <IoIosInformationCircleOutline className="w-5 h-5 text-gray-400 ml-2" />
          </h2>
        </div>
        <p className="text-gray-400 text-sm">
          Elige un nombre de usuario que te guste. Puedes cambiarlo más adelante.
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full bg-zinc-900 flex items-center text-gray-200 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-600 transition">
            <span className="text-gray-400 select-none">clipeame.com/@</span>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="pedromanuel"
              className="bg-transparent flex-1 ml-1 placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-full transition"
          >
            Siguiente
          </button>
        </form>
      </div>
    </div>
  )
}
