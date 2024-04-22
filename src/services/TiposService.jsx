import { axiosConfig } from '../config/axiosConfig';

export const getTipos = async () => {
  try {
    const response = await axiosConfig.get('/tipos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los Tipos', error);
    throw error;
  }
};

export const getTiposById = async (id) => {
  try {
    const response = await axiosConfig.get(`/tipos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los Tipos', error);
    throw error;
  }
};

export const postTipos = async (data) => {
  try {
    const response = await axiosConfig.post(`/tipos`, data);
    return response.data;
  } catch (error) {
    console.error('Error al Crear el Tipo:', error);
    throw error;
  }
};

export const putTipos = async (id, data) => {
  try {
    const response = await axiosConfig.put(`/tipos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al Actualizar el Tipo:', error);
    throw error;
  }
};

export const deleteTipos = async (id) => {
  try {
    const response = await axiosConfig.delete(`/tipos/${id}`);
    return response.data
  } catch (error) {
    console.error('Error al Actualizar el Tipo:', error);
    throw error;
  }
};