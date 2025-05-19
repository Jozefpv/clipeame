import playIcon from "../../assets/images/playIcon.png"

import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCompass } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineLineChart } from "react-icons/ai";
import { AiOutlineTag } from "react-icons/ai";


export default function MainSideBar() {
  const navigate = useNavigate()

  return (
    <aside
      id="logo-sidebar"
      className="
        fixed top-0 left-0 z-40      /* fijo al viewport */
       w-22 h-screen                /* ancho y altura full */
       bg-black border-r border-gray-700
      "
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col justify-between items-center py-4">
        <div className="flex justify-center">
          <img src={playIcon} alt="Clipeame logo" className="w-12" />
        </div>

        <ul className="flex flex-col items-center space-y-1">
          <li>
            <button className="p-3 pr-5 pl-5 rounded-lg text-gray-400 hover:text-white cursor-pointer hover:bg-gray-800 transition" onClick={()=> navigate('/welcome')}>
              <AiOutlineHome size={25} />
            </button>
          </li>
          <li>
            <button className="p-3 pr-5 pl-5 rounded-lg text-gray-400 hover:text-white cursor-pointer hover:bg-gray-800 transition" onClick={()=> navigate('/config')}>
              <AiOutlineSearch size={25} />
            </button>
          </li>
          <li>
            <button className="p-3 pr-5 pl-5 rounded-lg text-gray-400 cursor-pointer hover:text-white hover:bg-gray-800 transition" onClick={()=> navigate('/dashboard')}>
              <AiOutlineCompass size={25} />
            </button>
          </li>
          <li>
            <button className="p-3 pr-5 pl-5 rounded-lg text-gray-400 hover:text-white cursor-pointer hover:bg-gray-800 transition" onClick={()=> navigate('/')}>
              <AiOutlineMessage size={25} />
            </button>
          </li>
          <li>
            <button className="p-3 pr-5 pl-5 rounded-lg text-gray-400 hover:text-white cursor-pointer hover:bg-gray-800 transition">
              <AiOutlineBell size={25} />
            </button>
          </li>
          <li>
            <button className="p-3 pr-5 pl-5 rounded-lg text-gray-400 hover:text-white cursor-pointer hover:bg-gray-800 transition">
              <AiOutlineLineChart size={25} />
            </button>
          </li>
          <li>
            <button className="p-3 pr-5 pl-5 rounded-lg text-gray-400 cursor-pointer hover:text-white hover:bg-gray-800 transition">
              <AiOutlineTag size={25} />
            </button>
          </li>
          <li>
            <button className="p-2.5 pr-4 pl-4 rounded-lg text-gray-400 cursor-pointer hover:text-white hover:bg-gray-800 transition" onClick={()=> navigate('/config')}>
              <img className="w-8 h-8 rounded-full object-cover border-2 border-gray cursor-pointer" src="https://s3.ap-south-1.amazonaws.com/assets.ynos.in/investor-profile-photos/I_7000682.jpg" alt="" />
            </button>
          </li> 
        </ul>

        <ul className="flex flex-col items-center space-y-6">
        </ul>
      </div>
    </aside>
  )
}

