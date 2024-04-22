import { useState } from 'react'
import { deleteProductoras, postProductoras, putProductoras } from '../../services/Productoras';
import toast from 'react-hot-toast';

export const ProductoraForm = ({ toggleForm, genero = null }) => {
  const [nombre, setNombre] = useState(genero ? genero.nombre : "");
  const [descripcion, setDescripcion] = useState(
    genero ? genero.descripcion : ""
  );
  const [imagenUrl, setImagenUrl] = useState(genero ? genero.imagen : "");
  const [slogan, setSlogan] = useState(genero ? genero.slogan : "");
  const [estado, setEstado] = useState(genero ? genero.estado : false );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (genero._id) {
        await putProductoras(genero._id, {nombre, descripcion, imagen: imagenUrl, estado, slogan});
        toast.success(`Has actualizado el género ${nombre} con éxito`, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        await postProductoras({ nombre, descripcion, imagen: imagenUrl, estado, slogan });
        toast.success(`Has creado el género ${nombre} con éxito`, {
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

  const handleDeleteProductora = async (id) => {
    try {
      await deleteProductoras(id)
      toast.success(`Has Eliminado ${nombre} con éxito`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      toggleForm()
    } catch (error) {
      toast.error(`Lo siento, hubo un error: ${error.response.data.message}`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="bg-[#202020] w-[30rem] p-4 rounded-lg">
        <h2 className="text-white text-xl mb-4">
          {genero._id ? "Actualizar Productora" : "Crear Nuevo Productora"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-white mb-2">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#101010] text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imagenUrl" className="block text-white mb-2">
              Eslogan:
            </label>
            <input
              type="text"
              id="slogan"
              name="slogan"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
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
            <label htmlFor="descripcion" className="block text-white mb-2">
              Descripción:
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#101010] text-white"
            />
          </div>
          <div>
            <label className="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value={estado} checked={estado} className="sr-only peer" onChange={(e) => setEstado(e.target.checked)}/>
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{estado? "Deshabilitar" : "Habilitar"}</span>
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
                  ? genero
                    ? "Actualizando..."
                    : "Creando..."
                  : genero._id
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
            {genero._id &&            
              <div>
                <button
                  type="button"
                  onClick={() => handleDeleteProductora(genero._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            }
          </div>
        </form>
      </div>
    </div>
  );
}
