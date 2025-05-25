import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import playIcon from "../../assets/images/playIcon.png"
import { AuthGateway } from '../../gateways/auth.gateway'

interface RegisterForm {
  email: string
  password: string
}

export default function VerifyEmail() {
  const navigate = useNavigate()
  const location = useLocation()
  const gateway = new AuthGateway()

  const form = location.state as RegisterForm | null
  const email = form?.email

  useEffect(() => {
    if (!form) {
      navigate('/register')
    }
  }, [form, navigate])

  const [code, setCode] = useState<string[]>(Array(6).fill(''))
  const [activeIndex, setActiveIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputRefs.current[activeIndex]?.focus()
  }, [activeIndex])

  const handleChange = (value: string, idx: number) => {
    const digit = value.replace(/\D/, '')
    if (!digit) return
    const newCode = [...code]
    newCode[idx] = digit
    setCode(newCode)
    if (idx < code.length - 1) {
      setActiveIndex(idx + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      const newCode = [...code]
      if (newCode[idx]) {
        newCode[idx] = ''
        setCode(newCode)
        setActiveIndex(idx)
      } else if (idx > 0) {
        setActiveIndex(idx - 1)
      }
    }
  }

  const isCodeComplete = code.every(digit => digit !== '')

  const submitCode = async (fullCode: string) => {
    setError(null)
    try {
      const res = await gateway.verifyOtp(email!, fullCode)
      if (res) {
        throw new Error('Verificación fallida')
      }
      navigate('/choose', { state: form })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message)
      setCode(Array(6).fill(''))
      setActiveIndex(0)
    }
  }

  return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="flex items-center justify-center">
          <img src={playIcon} alt="Clipeame logo" className="w-14" />
        </div>

        <h1 className="text-white text-2xl font-semibold">
          Verifica tu correo electrónico
        </h1>

        <p className="text-gray-400">
          Se ha enviado un código de 6 dígitos a{' '}
          <span className="font-medium text-white">{email}</span>.
          Introduce el código para completar la verificación.
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-center space-x-2">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={el => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e.target.value, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              className="w-12 h-12 bg-zinc-800 text-white text-center text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          ))}
        </div>

        <button
          disabled={!isCodeComplete}
          onClick={() => submitCode(code.join(''))}
          className={`mt-4 w-full bg-blue-600 hover:bg-blue-400 text-white font-medium py-2 rounded-full transition ${
            !isCodeComplete ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          Verificar
        </button>

        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <button onClick={() => {/* implementar reenvío */}} className="underline hover:text-gray-300">
            Reenviar código
          </button>
          <button onClick={() => navigate('/register')} className="underline hover:text-gray-300">
            Cambiar correo electrónico
          </button>
        </div>
      </div>
    </div>
  )
}