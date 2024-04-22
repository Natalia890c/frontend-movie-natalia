import { useEffect, useState } from "react";
import { getDirectores } from "../../services/DirectoresService";
import { getProductoras } from "../../services/Productoras";
import { getGeneros } from "../../services/GenerosService";
import { getTipos } from "../../services/TiposService";
import toast from "react-hot-toast";
import {
  deleteMedias,
  postMedias,
  putMedias,
} from "../../services/MediasService";

export const MediaForm = ({ toggleForm, media = null }) => {
  const [titulo, setTitulo] = useState(media ? media.titulo : "");
  const [serial, setSerial] = useState(media ? media.serial : "");
  const [imagenUrl, setImagenUrl] = useState(media ? media.imagen : "");
  const [estado, setEstado] = useState(media ? media.estado : false);
  const [sinopsis, setSinopsis] = useState(media ? media.sinopsis : "");
  const [url, setUrl] = useState(media ? media.url : "");
  const [genero, setGenero] = useState(media ? media.genero : "");
  const [tipo, setTipo] = useState(media ? media.tipo : "");
  const [productora, setProductora] = useState(media ? media.productora : "");
  const [director, setDirector] = useState(media ? media.director : "");
  const [añoEstreno, setAñoestreno] = useState(media ? media.añoEstreno : "");

  const [loading, setLoading] = useState(false);

  const [tipoData, setTipoData] = useState([]);
  const [generoData, setGeneroData] = useState([]);
  const [productoraData, setProductoraData] = useState([]);
  const [directorData, setDirectorData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const typedata = await getTipos();
        const generoData = await getGeneros();
        const productoraData = await getProductoras();
        const directorData = await getDirectores();

        setTipoData(typedata);
        setGeneroData(generoData);
        setProductoraData(productoraData);
        setDirectorData(directorData);
      } catch (error) {
        toast.error(
          `Lo siento, hubo un error: ${error.response.data.message}`,
          {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = {
        serial,
        titulo,
        sinopsis,
        url,
        imagen: imagenUrl,
        añoEstreno,
        genero,
        tipo,
        director,
        productora,
        estado
      };
  
      if (media && media._id) {
        await putMedias(media._id, dataToSend);
        toast.success(`Has actualizado el Director ${titulo} con éxito`, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        await postMedias(dataToSend);
        toast.success(`Has creado el Director ${titulo} con éxito`, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      toggleForm();
    } catch (error) {
      toast.error(`Lo siento, hubo un error: ${error.response.data.message}`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    setLoading(false);
  };
  

  const handleDeleteMedia = async (id) => {
    try {
      await deleteMedias(id);
      toast.success(`Has Eliminado el Director ${titulo} con éxito`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      toggleForm();
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

  return (
    <div className="flex w-full justify-center items-start my-4">
      <div className="bg-[#202020] w-[30rem] p-7 rounded-lg">
        <h2 className="text-white text-xl mb-4">
          {media._id ? "Actualizar Media" : "Crear Nuevo Media"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="max-h-[30rem] overflow-auto">
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-white mb-2">
                Serial:
              </label>
              <input
                type="text"
                id="serial"
                name="serial"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#101010] text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imagenUrl" className="block text-white mb-2">
                Titulo:
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#101010] text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-white mb-2">
                Sinopsis:
              </label>
              <textarea
                id="sinopsis"
                name="sinopsis"
                value={sinopsis}
                onChange={(e) => setSinopsis(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#101010] text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imagenUrl" className="block text-white mb-2">
                URL (Trailer):
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#101010] text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imagenUrl" className="block text-white mb-2">
                URL de la Imagen:
              </label>
              <input
                type="text"
                id="imagenUrl"
                name="imagenUrl"
                value={imagenUrl}
                onChange={(e) => setImagenUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#101010] text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imagenUrl" className="block text-white mb-2">
                Año de Estreno (Debe estar separada por "-"):
              </label>
              <input
                type="text"
                id="añoEstreno"
                name="añoEstreno"
                value={añoEstreno}
                onChange={(e) => setAñoestreno(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#101010] text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imagenUrl" className="block text-white mb-2">
                Genero:
              </label>
              <select
                id="countries"
                name="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="bg-[#101010] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#101010] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Selecciona un Genero</option>
                {generoData.map((genero) => (
                  <option key={genero._id} value={genero.nombre}>
                    {genero.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="imagenUrl" className="block text-white mb-2">
                Tipo:
              </label>
              <select
                id="countries"
                name="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="bg-[#101010] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#101010] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Selecciona un Tipo</option>
                {tipoData.map((tipo) => (
                  <option key={tipo._id} value={tipo.nombre}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="imagenUrl" className="block text-white mb-2">
                Director:
              </label>
              <select
                id="countries"
                name="director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="bg-[#101010] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#101010] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Selecciona un Director</option>
                {directorData.map((director) => (
                  <option key={director._id} value={director.nombre}>
                    {director.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="imagenUrl" className="block text-white mb-2">
                Productora:
              </label>
              <select
                id="countries"
                name="productora"
                value={productora}
                onChange={(e) => setProductora(e.target.value)}
                className="bg-[#101010] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#101010] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Selecciona una Productora</option>
                {productoraData.map((productora) => (
                  <option key={productora._id} value={productora.nombre}>
                    {productora.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                value={estado}
                checked={estado}
                className="sr-only peer"
                onChange={(e) => setEstado(e.target.checked)}
              />
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {estado ? "Deshabilitar" : "Habilitar"}
              </span>
            </label>
          </div>
          <div className="flex w-full justify-between">
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                disabled={loading}
              >
                {loading
                  ? media
                    ? "Actualizando..."
                    : "Creando..."
                  : media._id
                  ? "Actualizar"
                  : "Crear"}
              </button>
              <button
                type="button"
                onClick={toggleForm}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
            {media._id && (
              <div>
                <button
                  type="button"
                  onClick={() => handleDeleteMedia(media._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
