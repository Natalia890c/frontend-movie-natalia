import { useEffect, useState } from "react";
import { getGeneros } from "../services/GenerosService";
import CardGenero from "../components/cards/CardGenero";
import GeneroForm from "../components/forms/GeneroForm";

export const ListGeneros = () => {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [generoToUpdate, setGeneroToUpdate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await getGeneros();
        setGeneros(moviesData);
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
      setGeneroToUpdate(genero);
    } else {
      setGeneroToUpdate(null);
    }
  };

  return (
    <div className="flex justify-center w-full h-full overflow-auto items-start">
      <div className="grid grid-cols-2">
        {!showForm && generos.map((genero) => (
          <CardGenero
            key={genero._id}
            name={genero.nombre}
            description={genero.descripcion}
            img={genero.imagen}
            estado={genero.estado}
            className="w-64 mb-4 mr-4"
            onClick={() => toggleForm(genero)}
          />
        ))}
      </div>
      {showForm && <GeneroForm toggleForm={toggleForm} genero={generoToUpdate} />}
      <button 
        onClick={toggleForm} 
        className="fixed bottom-20 right-10 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
      >
        {showForm ? "Cerrar Formulario" : "Crear Nuevo Género"}
      </button>
    </div>
  );
};
