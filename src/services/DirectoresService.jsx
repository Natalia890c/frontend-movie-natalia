import { axiosConfig } from '../config/axiosConfig';

export const getDirectores = async () => {
  try {
    const response = await axiosConfig.get('/directores');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los directores', error);
    throw error;
  }
};

export const getDirectoresById = async (id) => {
  try {
    const response = await axiosConfig.get(`/directores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los directores', error);
    throw error;
  }
};

export const postDirectores = async (data) => {
  try {
    const response = await axiosConfig.post(`/directores`, data);
    return response.data;
  } catch (error) {
    console.error('Error al Crear el director:', error);
    throw error;
  }
};

export const putDirectores = async (id, data) => {
  try {
    const response = await axiosConfig.put(`/directores/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al Actualizar el director:', error);
    throw error;
  }
};

export const deleteDirectores = async (id) => {
  try {
    const response = await axiosConfig.delete(`/directores/${id}`);
    return response.data
  } catch (error) {
    console.error('Error al Actualizar el director:', error);
    throw error;
  }
};