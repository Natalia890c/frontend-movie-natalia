import { axiosConfig } from '../config/axiosConfig';

export const getMedias = async () => {
  try {
    const response = await axiosConfig.get('/medias');
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error al obtener las Media', error);
    throw error;
  }
};

export const getMediasById = async (id) => {
  try {
    const response = await axiosConfig.get(`/medias/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la Media', error);
    throw error;
  }
};

export const postMedias = async (data) => {
  try {
    const response = await axiosConfig.post(`/medias`, data);
    return response.data;
  } catch (error) {
    console.error('Error al Crear la Media', error);
    throw error;
  }
};

export const putMedias = async (id, data) => {
  try {
    const response = await axiosConfig.put(`/medias/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al Actualizar la Media:', error);
    throw error;
  }
};

export const deleteMedias = async (id) => {
  try {
    const response = await axiosConfig.delete(`/medias/${id}`);
    return response.data
  } catch (error) {
    console.error('Error al Eliminar la Media', error);
    throw error;
  }
};