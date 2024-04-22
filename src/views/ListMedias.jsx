import { useEffect, useState } from "react";
import { getMedias } from "../services/MediasService";
import CardDirector from "../components/cards/CardDirector";
import { CarOpenMedia } from "../components/cards/CarOpenMedia";
import { MediaForm } from "../components/forms/MediaForm";

export const ListMedias = () => {
  const [medias, setMedias] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [mediaToUpdate, setMediaToUpdate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mediasData = await getMedias();
        setMedias(mediasData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [showForm]);

  const handleMediaSelect = (media) => {
    setSelectedMedia(media);
  };

  const handleCloseCard = () => {
    setSelectedMedia(null);
  };

  const toggleForm = (media = null) => {
    setShowForm(!showForm);
    if (media) {
      setMediaToUpdate(media);
    } else {
      setMediaToUpdate(null);
    }
  };

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

  return (
    <div className="flex w-full h-full overflow-auto items-start">
      {!showForm ? (
        selectedMedia ? (
          <CarOpenMedia
            movie={selectedMedia}
            handleCloseCard={handleCloseCard}
            onClick={() => toggleForm(selectedMedia)}
          />
        ) : (
          medias.map((media) => (
            <div key={media._id} onClick={() => handleMediaSelect(media)}>
              <CardDirector
                name={media.titulo}
                img={media.imagen}
                estado={media.estado}
                className="w-64 mb-4 mr-4"
              />
            </div>
          ))
        )
      ) : null}
      {showForm && <MediaForm toggleForm={toggleForm} media={mediaToUpdate} />}
      <button 
        onClick={toggleForm} 
        className="fixed bottom-20 right-10 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
      >
        {showForm ? "Cerrar Formulario" : "Crear Nuevo Género"}
      </button>
    </div>
  );
};
