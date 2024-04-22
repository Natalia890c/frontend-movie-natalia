import { axiosConfig } from '../config/axiosConfig';

const getGeneros = async () => {
  try {
    const response = await axiosConfig.get('/generos');
    return response.data;
  } catch (error) {
    console.error('Error al Obtener los generos:', error);
    throw error;
  }
};

const getGenerosById = async (id) => {
  try {
    const response = await axiosConfig.get(`/generos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al Obtener el genero:', error);
    throw error;
  }
};

const postGeneros = async (data) => {
  try {
    const response = await axiosConfig.post(`/generos`, data);
    return response.data;
  } catch (error) {
    console.error('Error al Crear el genero:', error);
    throw error;
  }
};

const putGeneros = async (id, data) => {
  try {
    const response = await axiosConfig.put(`/generos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al Actualizar el genero:', error);
    throw error;
  }
};

const deleteGeneros = async (id) => {
  try {
    const response = await axiosConfig.delete(`/generos/${id}`);
    return response.data
  } catch (error) {
    console.error('Error al Actualizar el genero:', error);
    throw error;
  }
};

export { getGeneros, getGenerosById, postGeneros, putGeneros, deleteGeneros };