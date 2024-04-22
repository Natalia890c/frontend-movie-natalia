import { axiosConfig } from '../config/axiosConfig';

export const getProductoras = async () => {
  try {
    const response = await axiosConfig.get('/productoras');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las Productoras', error);
    throw error;
  }
};

export const getProductorasById = async (id) => {
  try {
    const response = await axiosConfig.get(`/productoras/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las Productoras:', error);
    throw error;
  }
};

export const postProductoras = async (data) => {
  try {
    const response = await axiosConfig.post(`/productoras`, data);
    return response.data;
  } catch (error) {
    console.error('Error al Crear la Productora:', error);
    throw error;
  }
};

export const putProductoras = async (id, data) => {
  try {
    const response = await axiosConfig.put(`/productoras/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al Actualizar la Productora:', error);
    throw error;
  }
};

export const deleteProductoras = async (id) => {
  try {
    const response = await axiosConfig.delete(`/productoras/${id}`);
    return response.data
  } catch (error) {
    console.error('Error al Actualizar la Productora:', error);
    throw error;
  }
};