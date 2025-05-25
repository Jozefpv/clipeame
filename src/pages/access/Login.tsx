import playIcon from "../../assets/images/playIcon.png"
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaDiscord } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthGateway } from "../../gateways/auth.gateway";

export default function Login() {

  const [form, setForm]     = useState({ email: '', password: '' })
  const [error, setError]   = useState<string | null>(null)
  const navigate            = useNavigate()
  const gateway = new AuthGateway();

  
  const handleGoogleLogin = () => {
    window.location.href = gateway.getGoogleAuthUrl();
  }

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await gateway.login(form.email, form.password)
      if (res.verify) {
        navigate('/')
      } else {
        const { error } = await res.json()
        setError(error)
      }
    } catch (err) {
      setError(`Error de servidor ${err}`)
    }
  }

  return (
    <div className="min-h-screen w-full bg-transparent flex items-center justify-center px-4">
      <div className="bg-zinc-800 border border-zinc-600 rounded-2xl p-8 w-full max-w-sm text-center space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <img src={playIcon} alt="Clipeame logo" className="w-14" />
        </div>

        <h2 className="text-white text-2xl font-semibold">
          Inicia sesión en Clipeame
        </h2>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

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
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-400 text-white font-medium py-2 rounded-full transition"
          >
            Continuar
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <span className="block w-full h-px bg-gray-700"></span>
          <span className="text-gray-500 text-sm">o</span>
          <span className="block w-full h-px bg-gray-700"></span>
        </div>

        <div className="flex items-center justify-center w-full space-x-3">
            <button className="w-20 flex items-center justify-center p-2 bg-zinc-800 border border-zinc-600 rounded-lg cursor-pointer hover:bg-gray-700 transition" onClick={handleGoogleLogin}>
                <FcGoogle size={20} />
            </button>
            <button className="w-20 flex items-center justify-center p-2 bg-zinc-800 border border-zinc-600 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                <FaApple size={20} className="text-white"/>
            </button>
            <button className="w-20 flex items-center justify-center p-2 bg-zinc-800 border border-zinc-600 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                <FaDiscord size={20} className="text-white"/>
            </button>
            <button className="w-20 flex items-center justify-center p-2 bg-zinc-800 border border-zinc-600 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                <RiTwitterXLine size={20} className="text-white"/>
            </button>
        </div>

        <p className="text-xs text-gray-500">
          Al iniciar sesión, aceptas nuestros{" "}
          <a href="#" className="underline">
            Términos
          </a>{" "}
          y{" "}
          <a href="#" className="underline">
            Política de Privacidad
          </a>
          .
        </p>

        <p className="text-sm text-gray-400">
          ¿Nuevo en Clipeame?{" "}
          <a onClick={()=>navigate('/register')} className="text-blue-500 hover:underline">
            Crea una cuenta
          </a>
        </p>
      </div>
    </div>
  );
}
