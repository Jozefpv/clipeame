import {
    AiOutlineSearch,
    AiOutlineDashboard
} from "react-icons/ai";
  import { BsThreeDots } from "react-icons/bs";
  
  export default function FooterBar() {
    return (
      <footer
        className="
          fixed bottom-0 left-0 right-0 z-50
          flex justify-around items-center
          h-16 bg-black border-t border-gray-700
          sm:hidden
        "
      >
        <button className="flex flex-col items-center text-gray-400 hover:text-white transition">
          <AiOutlineSearch size={24} />
          <span className="text-xs">Buscar</span>
        </button>
  
        <button className="flex flex-col items-center text-gray-400 hover:text-white transition">
          <AiOutlineDashboard size={24} />
          <span className="text-xs">Panel</span>
        </button>
  
        <button className="flex flex-col items-center text-gray-400 hover:text-white transition">
          <BsThreeDots size={24} />
          <span className="text-xs">Más</span>
        </button>
      </footer>
    );
  }
  