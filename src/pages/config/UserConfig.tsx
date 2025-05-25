import React, { useState, ChangeEvent, JSX, useContext } from "react";
import {
  FaUserCircle,
  FaPlug,
  FaLock,
  FaCreditCard,
  // FaWallet,
  // FaHistory,
  // FaStar,
  // FaLifeRing,
  // FaExclamationTriangle,
  FaTrashAlt,
} from "react-icons/fa";
//import Toggle from "../../components/Toggle";
import { AuthGateway } from "../../gateways/auth.gateway";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import  { AvatarModal } from "../../components/AvatarModal";
import { Profile } from "../../models/Profile";

interface Tab {
  id: string;
  label: string;
  icon: JSX.Element;
}

const tabs: Tab[] = [
  { id: "general",    label: "General",                icon: <FaUserCircle /> },
  { id: "conectadas", label: "Cuentas conectadas",     icon: <FaPlug /> },
  { id: "privacidad", label: "Seguridad y privacidad",  icon: <FaLock /> },
  { id: "pagos",      label: "Métodos de pago",        icon: <FaCreditCard /> },
  // { id: "saldo",      label: "Saldo",                  icon: <FaWallet /> },
  // { id: "historial",  label: "Historial de facturación",icon: <FaHistory /> },
  // { id: "membresias", label: "Membresías",             icon: <FaStar /> },
  // { id: "resolucion", label: "Centro de resolución",   icon: <FaLifeRing /> },
  // { id: "peligro",    label: "Zona de peligro",         icon: <FaExclamationTriangle /> },
];

const UserConfig: React.FC = () => {
  const { setProfile, profile } = useContext(AuthContext);
  
  const gateway = new AuthGateway();
  const [activeTab, setActiveTab] = useState<string>("general");
  const [isModalOpen, setModalOpen] = useState(false)

  const navigate = useNavigate()
  
  const [form, setForm] = useState<Partial<Profile>>({
    profileName: profile.profileName,
    //biografia: "",
    profileUsername: profile.profileUsername,
    email: profile.email,
    avatarUrl: profile.avatarUrl,
    phone: profile.phone?? 0,
  });

  const handleLogOut = async () => {

    await gateway.logOut()
    navigate('/login')
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleToggle = (field: keyof FormState) => {
  //   setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await gateway.saveProfileConfig(form)
    setProfile({
        ...profile,
        ...form,
      });
  };


  // useEffect(()=>{

  // },[isModalOpen])

  return (
    <div className="flex h-full text-gray-300">
      <nav className="w-60 bg-zinc-900 border-r border-gray-700 p-4 space-y-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center w-full p-2 rounded-lg transition cursor-pointer \
              ${
                activeTab === t.id
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-800"
              }`}
          >
            <span className="mr-3 text-lg">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}

        <button
          type="button"
          className="flex items-center w-full p-2 text-red-500 cursor-pointer hover:bg-red-800/30 rounded-lg transition"
          onClick={handleLogOut}
          >
          <FaTrashAlt className="mr-3" />
          Cerrar sesión
        </button>
      </nav>

      <div className="flex-1 overflow-auto bg-zinc-900 p-6">
        {activeTab === "general" && (
          <>
            <h1 className="text-2xl font-semibold text-white mb-6">
              Configuración de la cuenta
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
              className="relative inline-block cursor-pointer group"
              onClick={() => setModalOpen(true)}
            >
              <img
                src={profile.avatarUrl}
                alt="Avatar"
                className="
                  w-20 h-20
                  rounded-full
                  object-cover
                  border-2 border-gray-600

                  transition-all duration-200
                  group-hover:brightness-75
                "
              />
              <div
                className="
                  absolute inset-0
                  flex items-center justify-center
                  rounded-full
                  bg-black/50
                  opacity-0
                  transition-opacity duration-200
                  group-hover:opacity-100
                "
              >
                <span className="text-white text-center text-sm font-medium">
                  Cambiar avatar
                </span>
              </div>
            </div>

              <AvatarModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                currentUrl={profile.avatarUrl}
              />
              <div className="flex flex-col gap-6">
                  <div className="w-full md:w-1/2">
                    <label className="block mb-1">Nombre</label>
                    <input
                      name="profileName"
                      value={form.profileName}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                {/* <div className="md:col-span-2">
                  <label className="block mb-1">Biografía</label>
                  <textarea
                    name="biografia"
                    value={form.biografia}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div> */}
                <div className="w-full md:w-1/2"> 
                  <label className="block mb-1">Nombre de usuario</label>
                  <input
                    name="profileUsername"
                    value={form.profileUsername}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block mb-1">Correo electrónico</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled
                    className="w-full bg-gray-700 border cursor-not-allowed border-gray-600 rounded px-3 py-2"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block mb-1">Número de teléfono</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-700">
                {/* <Toggle
                  label="Whops unidos"
                  checked={form.showJoined}
                  onChange={() => handleToggle("showJoined")}
                />
                <Toggle
                  label="Whops propiedad"
                  checked={form.showOwned}
                  onChange={() => handleToggle("showOwned")}
                />
                <Toggle
                  label="Ubicación aproximada"
                  checked={form.showLocation}
                  onChange={() => handleToggle("showLocation")}
                /> */}
                <p className="text-sm text-gray-400">
                  Todo lo que ocultes aquí no será visible para otros — y tú tampoco lo verás en los perfiles de otros.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-400 px-6 py-2 rounded text-white transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </>
        )}

        {activeTab !== "general" && (
          <div className="text-gray-500 italic">
            {tabs.find((t) => t.id === activeTab)?.label} aún no implementado.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserConfig;
