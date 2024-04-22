import { useState } from 'react'
import toast from 'react-hot-toast';
import { deleteDirectores, postDirectores, putDirectores } from '../../services/DirectoresService';


export const DirectorForm = ({ toggleForm, director = null }) => {
  const [nombre, setNombre] = useState(director ? director.nombre : "");
  const [imagenUrl, setImagenUrl] = useState(director ? director.imagen : "");
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState(director  ? director.estado : false );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (director._id) {
        await putDirectores(director._id, {
          nombre,
          imagen: imagenUrl,
          estado
        });
        toast.success(`Has actualizado el Director ${nombre} con éxito`, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        await postDirectores({ nombre, imagen: imagenUrl, estado });
        toast.success(`Has creado el Director ${nombre} con éxito`, {
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

  const handleDeleteDirector = async (id) => {
    try {
      await deleteDirectores(id)
      toast.success(`Has Eliminado el Director ${nombre} con éxito`, {
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
          {director._id ? "Actualizar Director" : "Crear Nuevo Director"}
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
          <div>
            <label className="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value={estado} checked={estado} className="sr-only peer" onClick={() => setEstado(!estado)}/>
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
                  ? director
                    ? "Actualizando..."
                    : "Creando..."
                  : director._id
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
            {director._id &&            
              <div>
                <button
                  type="button"
                  onClick={() => handleDeleteDirector(director._id)}
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
