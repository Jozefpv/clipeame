import playIcon from "../../assets/images/playIcon.png"
import {
  BsCompass,
  BsPersonFill,
  BsGraphUp,
} from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsBrightnessHighFill } from "react-icons/bs";

export default function SideBar() {
  return (
    <aside
      id="logo-sidebar"
      className="
        fixed top-0 left-0 z-40
        w-20 h-screen
        bg-black border-r border-gray-700
        transform -translate-x-full
        sm:relative sm:translate-x-0
      "
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col justify-between items-center py-4">
        <div className="flex justify-center">
          <img src={playIcon} alt="Clipeame logo" className="w-12" />
        </div>

        <ul className="flex flex-col items-center space-y-6">
          <li>
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition">
              <BsCompass size={20} />
            </button>
          </li>
          <li>
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition">
              <BsPersonFill size={20} />
            </button>
          </li>
          <li>
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition">
              <BsGraphUp size={20} />
            </button>
          </li>
        </ul>

        <ul className="flex flex-col items-center space-y-6">
          <li>
            <button className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-600 transition">
              <AiOutlineQuestionCircle size={20} />
            </button>
          </li>
          <li>
            <button className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-600 transition">
              <BsBrightnessHighFill size={20} />
            </button>
          </li>
          <li>
            <button className="h-8 w-8 rounded-full text-white font-medium hover:bg-gray-600 transition">
              ES
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}

