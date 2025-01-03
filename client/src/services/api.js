import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7017/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const getCanvasElements = async (canvasId) => { 
  try { 
    const response = await api.get(`/Element/getCanvasElements/${canvasId}`); 
    return response.data; 
  } catch (error) 
  { console.error('Error fetching canvas elements:', error); 
    throw error; 
  } 
};

export const getCanvases = async () => {
  const response = await api.get('/canvas');
  return response.data;
};

export const getCanvasById = async (id) => {
  const response = await api.get(`/canvases/${id}`);
  return response.data;
};

export const addCanvas = async (CanvasName, CreatedBy) => { 
  const response = await api.post('/canvas', { CanvasName, CreatedBy});  
  return response.data; 
};

export const updateCanvas = async (canvas) => {
  const response = await api.put(`/canvases`, canvas);
  return response.data;
};

export const deleteCanvas = async (CanvasId) => {
  const response = await api.delete(`/canvas/${CanvasId}`);
  return response.data;
};

export const getElementById = async (id) => {
  const response = await api.get(`/element/${id}`);
  return response.data;
};

export const addElement = async (element) => {
  const response = await api.post('/element', element);
  return response.data;
};

export const updateElement = async (element) => {
  const response = await api.put(`/element`, element);
  return response.data;
};

export const deleteElement = async (id) => {
  const response = await api.delete(`/element/${id}`);
  return response.data;
};

export const findUser = async (emailOrUsername, password) => { 
  const response = await api.post('/User/find', { emailOrUsername, password }); 
  return response.data; 
};

export const saveElements = async (elements) => { 
  const response = await api.post('/element/save', elements); 
  return response.data; 
};

export const getUsers = async () => {
  const response = await api.get('/user');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

export const addUser = async (user) => {
  const response = await api.post('/user', user);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await api.put(`/user`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/user/${id}`);
  return response.data;
};