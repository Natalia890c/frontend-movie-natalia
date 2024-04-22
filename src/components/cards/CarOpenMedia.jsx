import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { getGenerosById } from "../../services/GenerosService";
import { getProductorasById } from "../../services/Productoras";
import { getDirectoresById } from "../../services/DirectoresService";
import { BsCheck2, BsFillPlayFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { getTiposById } from "../../services/TiposService";
import toast from "react-hot-toast";


export const CarOpenMedia = ({ movie, handleCloseCard, onClick }) => {
  const {
    titulo,
    imagen,
    sinopsis,
    productora,
    director,
    tipo,
    genero,
  } = movie;
  console.log(movie)
  const [tipoData, setTipoData] = useState({});
  const [generoData, setGeneroData] = useState({});
  const [productoraData, setProductoraData] = useState({});
  const [directorData, setDirectorData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typedata = await getTiposById(tipo);
        const generoData = await getGenerosById(genero);
        const productoraData = await getProductorasById(productora);
        const directorData = await getDirectoresById(director);

        setTipoData(typedata.tipos);
        setGeneroData(generoData.generos);
        setProductoraData(productoraData.productoras);
        setDirectorData(directorData.directores);
      } catch (error) {
        toast.error(`Lo siento, hubo un error: ${error.response.data.message}`, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-lg w-full">
      <div className=" relative w-full h-[20rem] flex items-start ">
        <div className="absolute w-full flex items-center justify-between px-5 h-[3rem] bg-[#202020cc]">
          <BiArrowBack
            className=" text-white/70 hover:text-blue-500 duration-300 cursor-pointer"
            size={28}
            onClick={handleCloseCard}
          />
        </div>
        <img
          src={imagen}
          alt={titulo}
          className=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="absolute bottom-0 flex justify-end bg-[#202020cc] h-[7rem] w-full px-6">
          <div className="w-[70%] flex items-center justify-between">
            <div className="flex flex-col px-5">
              <div className="flex items-center font-semibold text-white/70">
                <h2 className="text-4xl">{titulo}</h2>
              </div>
            </div>
            <div className="flex text-white/70">
              <BsFillPlayFill className="mr-6 text-3xl hover:text-blue-500 duration-300 cursor-pointer"/>
              <BsCheck2  className="mr-6 text-3xl hover:text-blue-500 duration-300 cursor-pointer"/>
              <AiFillHeart  className="mr-6 text-3xl hover:text-blue-500 duration-300 cursor-pointer"/>
              <FiMoreVertical onClick={onClick} className="mr-6 text-3xl hover:text-blue-500 duration-300 cursor-pointer"/>
            </div>
          </div>
        </div>
        <div className="absolute w-[10rem] h-[15rem] lg:w-[20rem] lg:h-[30rem] overflow-hidden rounded-lg lg:left-8 left-2 -bottom-36 lg:-bottom-72 z-20">
          <img
            src={imagen}
            alt={titulo}
            className=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="flex justify-end py-4">
        <div className="px-8 w-[70%]">
          <div className="flex mt-4 items-center font-semibold  text-white/70">
            <h2 className=" ">Director:</h2>
            <h2 className="opacity-60 ml-2">{directorData.nombre}</h2>
          </div>
          <div className="flex mt-2 items-center font-semibold  text-white/70">
            <h2 className="">Tipo:</h2>
            <h2 className="opacity-60 ml-2">{tipoData.nombre}</h2>
          </div>
          <div className="flex mt-2 items-center font-semibold  text-white/70">
            <h2 className="">Productora:</h2>
            <h2 className="opacity-60 ml-2">{productoraData.nombre}</h2>
          </div>
          <div className="flex mt-2 items-center font-semibold  text-white/70">
            <h2 className="">Genero:</h2>
            <h2 className="opacity-60 ml-2">{generoData.nombre}</h2>
          </div>
          <div className="flex mt-4 flex-col font-semibold text-white/70">
            <h2 className=" ">Sinopsis:</h2>
            <h2 className=" opacity-80">{sinopsis}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

CarOpenMedia.propTypes = {
  movie: PropTypes.object.isRequired,
  handleCloseCard: PropTypes.func.isRequired,
};
