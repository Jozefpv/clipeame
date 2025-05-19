import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import playIcon from "../../assets/images/playIcon.png"
import { AuthGateway } from '../../gateways/auth.gateway'

export default function Register() {
  const [form, setForm]   = useState({ email: '', password: '', confirm: '' })
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo]   = useState<string | null>(null)
  const navigate = useNavigate()
  const gateway = new AuthGateway();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setInfo(null)

    if (form.password !== form.confirm) {
      return setError('Las contraseñas no coinciden')
    }

    try {
      const res = await gateway.register(form.email, form.password)
      const payload = res.data;
      if (res.status === 200) {
        if (payload.user) {
          setInfo(payload.message);
          setForm({ email: '', password: '', confirm: '' });
          navigate('/verify', { state: form });
        } else {
          navigate('/');
        }
      } else {
        setError(payload.error);
      }
    } catch (err) {
      setError(`Error de servidor ${err}`)
    }
  }

  return (
    <div className="min-h-screen w-full bg-transparent flex items-center justify-center px-4">
      <div className="bg-zinc-800 border border-zinc-600 rounded-2xl p-8 w-full max-w-sm text-center space-y-6">
        <div className="flex items-center justify-center">
          <img src={playIcon} alt="Clipeame logo" className="w-14" />
        </div>
        <h2 className="text-white text-2xl font-semibold">
          Crea una cuenta en Clipeame
        </h2>

        {info && <p className="text-green-400 text-sm">{info}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full bg-zinc-900 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full bg-zinc-900 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            required
          />
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Confirmar contraseña"
            className="w-full bg-zinc-900 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-full transition"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-xs text-gray-500">
          Al registrarte, aceptas nuestros{' '}
          <a href="#" className="underline">Términos</a> y{' '}
          <a href="#" className="underline">Política de Privacidad</a>.
        </p>
        <p className="text-sm text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-500 hover:underline">
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  )
}
