import { useEffect, useState } from "react";
import CardGenero from "../components/cards/CardGenero";
import { getTipos } from "../services/TiposService";
import TiposForm from "../components/forms/TiposForm";

export const ListTipos = () => {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tiposToUpdate, setTiposToUpdate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await getTipos();
        setTipos(moviesData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [showForm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {error}
      </div>
    );
  }

  const toggleForm = (genero = null) => {
    setShowForm(!showForm);
    if (genero) {
      setTiposToUpdate(genero);
    } else {
      setTiposToUpdate(null);
    }
  };

  return (
    <div className="flex justify-center w-full h-full overflow-auto items-start">
      <div className="grid grid-cols-2">
        {!showForm && tipos.map((tipo) => (
          <CardGenero
            key={tipo._id}
            name={tipo.nombre}
            img={tipo.imagen}
            description={tipo.description ? tipo.description : ""}
            estado={tipo.estado}
            className="w-64 mb-4 mr-4"
            onClick={() => toggleForm(tipo)}
          />
        ))}
      </div>
      {showForm && <TiposForm toggleForm={toggleForm} tipo={tiposToUpdate} />}
      <button 
        onClick={toggleForm} 
        className="fixed bottom-20 right-10 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
      >
        {showForm ? "Cerrar Formulario" : "Crear Nuevo Género"}
      </button>
    </div>
  );
};
