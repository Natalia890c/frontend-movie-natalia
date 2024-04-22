import { useEffect, useState } from "react";
import { getDirectores } from "../services/DirectoresService";
import CardDirector from "../components/cards/CardDirector";
import { DirectorForm } from "../components/forms/DirectorForm";

export const ListDirectores = () => {
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [directorToUpdate, setDirectorToUpdate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await getDirectores();
        setDirectores(moviesData);
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

  const toggleForm = (director = null) => {
    setShowForm(!showForm);
    if (director) {
      setDirectorToUpdate(director);
    } else {
      setDirectorToUpdate(null);
    }
  };

  return (
    <div className="flex w-full h-full overflow-auto items-start px-5">
      <div className="flex justify-around flex-wrap">
        {!showForm &&
          directores.map((director) => (
            <CardDirector
              key={director._id}
              name={director.nombre}
              img={director.imagen}
              estado={director.estado}
              onClick={() => toggleForm(director)}
            />
          ))}
      </div>
      {showForm && (
        <DirectorForm toggleForm={toggleForm} director={directorToUpdate} />
      )}
      <button
        onClick={toggleForm}
        className="fixed bottom-20 right-10 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
      >
        {showForm ? "Cerrar Formulario" : "Crear Nuevo Género"}
      </button>
    </div>
  );
};
