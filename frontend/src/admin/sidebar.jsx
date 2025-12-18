import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext } from "react";
import { FaBookReader } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const SidebarContext = createContext();

export default function Sidebar({ expanded, setExpanded }) {
  return (
    <aside className="h-screen fixed top-0 left-0 z-50">
      <nav className="h-full flex flex-col bg-gray-900 border-r border-gray-700 shadow-xl">
        {/* Header dan Tombol Toggle */}
        <div
          className={`py-4 pr-2 pl-10 flex items-center text-white transition-all duration-300
    ${expanded ? "justify-between pl-12" : "justify-center pl-0"}
  `}
        >
          {expanded && (
            <span className="whitespace-nowrap transition-all duration-300 font-bold text-2xl pl-5">
              Miaw Family
            </span>
          )}

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors "
            aria-label={expanded ? "Tutup Sidebar" : "Buka Sidebar"}
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>
        {/* Konten Menu Utama */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 py-2 space-y-2">
            {/* Button 1 */}
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <FaBookReader size={20} />
                {expanded && (
                  <span className="whitespace-nowrap transition-all duration-300">
                    Dashboard
                  </span>
                )}
              </button>
            </li>

            {/* Button 2 */}
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <FiLogOut size={20} />
                {expanded && (
                  <span className="whitespace-nowrap transition-all duration-300">
                    Log out
                  </span>
                )}
              </button>
            </li>
          </ul>
        </SidebarContext.Provider>
        {/* Footer Admin Pengguna */}
        <div className="border-t border-gray-700 flex p-3 text-white">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4 text-sm">
              <h4 className="font-semibold">Andhika</h4>
              <span className="text-xs text-gray-400">
                Cowok_Klaten@gmail.com
              </span>
            </div>
            <MoreVertical
              size={20}
              className="text-gray-400 hover:text-white cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </aside>
  );
}
export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={onClick} // Tambahkan fungsi onClick jika diperlukan
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
          ? "bg-gradient-to-tr from-indigo-500 to-indigo-400 text-white"
          : "hover:bg-gray-700 text-gray-300" // Warna kontras untuk tema gelap
        }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded-full bg-indigo-400 ${expanded ? "" : "top-2"
            }`}
        />
      )}

      {/* Tooltip untuk Sidebar yang disembunyikan */}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-600 text-white text-sm whitespace-nowrap
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

// Ekspor Context untuk digunakan di komponen lain (jika diperlukan)
export { SidebarContext };
