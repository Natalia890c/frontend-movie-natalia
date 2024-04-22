import { useEffect, useState } from "react";
import CardProductora from "../components/cards/CardProductora";
import { getProductoras } from "../services/Productoras";
import { ProductoraForm } from "../components/forms/ProductoraForm";

export const ListProductoras = () => {
  const [productoras, setProductoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [generoToUpdate, setGeneroToUpdate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productorasData = await getProductoras();
        setProductoras(productorasData);
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

  const toggleForm = (productora = null) => {
    setShowForm(!showForm);
    if (productora) {
      setGeneroToUpdate(productora);
    } else {
      setGeneroToUpdate(null);
    }
  };

  return (
    <div className="flex justify-center w-full h-full overflow-auto items-start">
      <div className="grid grid-cols-2">
        {!showForm &&
          productoras.map((productora) => (
            <CardProductora
              key={productora._id}
              name={productora.nombre}
              description={productora.descripcion}
              img={productora.imagen}
              estado={productora.estado}
              onClick={() => toggleForm(productora)}
              className="w-64 mb-4 mr-4"
            />
          ))}
      </div>
      {showForm && (
        <ProductoraForm toggleForm={toggleForm} genero={generoToUpdate} />
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
