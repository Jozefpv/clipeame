export default function Welcome() {
   return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-white mb-2">Bienvenido a Clipeame</h1>
      <p className="text-lg text-white/70 mb-8">¿Cómo funciona?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        <div className="bg-sky-100 rounded-2xl p-8 flex flex-col h-64 transform transition-transform duration-400 ease-out hover:scale-105">
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-4xl font-semibold text-black text-center">
            Soy Creader de Contenido
          </h2>
        </div>

        <div className="flex-none flex items-center justify-center">
          <button
            type="button"
            className="px-6 py-2 border-2 border-black text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition"
          >
            Ver cómo funciona
          </button>
        </div>
      </div>

      <div className="bg-sky-100 rounded-2xl p-8 flex flex-col h-64 transform transition-transform duration-400 ease-out hover:scale-105">
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-4xl font-semibold text-black text-center">
            Soy Clipper
          </h2>
        </div>

        <div className="flex-none flex items-center justify-center">
          <button
            type="button"
            className="px-6 py-2 border-2 border-black text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition"
          >
            Ver cómo funciona
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}