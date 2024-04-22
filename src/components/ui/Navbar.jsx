import { BiSolidMovie } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function NavBar() {
  const listLi = [
    {
      id: "generos",
      label: "Generos",
      href: "#",
    },
    {
      id: "directores",
      label: "Directores",
      href: "#",
    },
    {
      id: "productoras",
      label: "Productoras",
      href: "#",
    },
    {
      id: "tipos",
      label: "Tipos",
      href: "#",
    },
    {
      id: "series",
      label: "Series y Peliculas",
      href: "#",
    },
  ];

  return (
    <nav className="bg-[#202020]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4 ">
          <div className="text-[#d2d2d2] flex items-center cursor-pointer">
            <BiSolidMovie size={35} />
            <a className="text-xl font-bold ml-2" href="#">
              NATMOVIE
            </a>
          </div>
          <button
            className="block lg:hidden border border-gray-500 px-3 py-2 rounded text-[#d2d2d2]"
            type="button"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div className="hidden lg:flex lg:items-center lg:w-auto">
            <ul className="flex flex-col lg:flex-row list-none">
              {listLi.map((item) => (
                <li className="nav-item" key={item.id}>
                  <Link
                    className="px-3 py-2 text-[#b4b4b4] hover:text-[#f8f8f8] font-semibold duration-300"
                    to={`/${item.id}`} // Establece la ruta correspondiente
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
