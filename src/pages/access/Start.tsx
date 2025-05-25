import playIcon from "../../assets/images/playIcon.png"
import bigIcon from "../../assets/images/bigIcon.png"
import { Link, useNavigate } from "react-router-dom";


export default function Start() {
    const navigate = useNavigate()

  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent px-4">
      <div className="flex flex-col md:flex-row items-center md:justify-center gap-12 lg:gap-36">
        <div className="flex flex-col items-center space-y-6">
          <img
            src={bigIcon}
            alt="Clipeame logo"
            className="w-32 h-auto md:w-64 lg:w-80"
          />
          <p className="text-white text-2xl md:text-4xl font-semibold text-center">
            La app que convierte contenido en <br/> viral y visitas en ingresos.
          </p>
        </div>

        <div className="bg-zinc-800 border border-zinc-600 rounded-2xl p-8 w-full max-w-sm text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <img
              src={playIcon}
              alt="Clipeame logo"
              className="w-14 m-0 p-0"
            />
            <h1 className="text-white text-2xl font-bold m-0 p-0">
              Clipeame
            </h1>
          </div>
  
          <p className="text-gray-300">
            Crea una cuenta y descubre campañas para generar ingresos.
          </p>
  
          <hr className="border-gray-700" />
  
          <button className="w-full bg-blue-600 hover:bg-blue-400 cursor-pointer text-white font-medium py-2 rounded-full transition"
            onClick={()=> navigate("/register")}
          >
            Registrarse
          </button>
  
          <Link
            to="/login"
            className="text-gray-400 hover:underline block"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
