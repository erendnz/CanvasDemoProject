import { addCanvas, deleteElement, getCanvases, deleteCanvas } from '../services/api';

export const ADD_TAB = 'ADD_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';
export const ADD_TAB_SUCCESS = 'ADD_TAB_SUCCESS';
export const SET_CANVASES = 'SET_CANVASES';
export const REMOVE_ELEMENT = 'REMOVE_ELEMENT';
export const SET_SELECTED_ELEMENT = 'SET_SELECTED_ELEMENT';
export const SET_DROPPED_ELEMENTS = 'SET_DROPPED_ELEMENTS'; 

export const setSelectedElement = (element) => {
  return { type: SET_SELECTED_ELEMENT, payload: element };
};

export const setCanvases = (canvases) => {
  return { type: SET_CANVASES, payload: canvases };
};

export const setDroppedElements = (elements) => {
  return { type: SET_DROPPED_ELEMENTS, payload: elements }; 
};

export const addTab = () => async (dispatch, getState) => {
  const state = getState();
  const newCanvasIndex = state.canvases.length + 1;
  const newCanvasName = `Canvas ${newCanvasIndex}`;
  try {
    const response = await addCanvas(newCanvasName, 1);
    dispatch({ type: ADD_TAB_SUCCESS, payload: { id: response.id, title: newCanvasName } });
  } catch (error) {
    console.error('Error adding canvas:', error);
  }
};

export const removeTab = (index) => {
  return { type: REMOVE_TAB, payload: index };
};

export const removeElement = (id) => async (dispatch) => {
  console.log(id)
  try {
    await deleteElement(id);
    dispatch({ type: REMOVE_ELEMENT, payload: id });
  } catch (error) {
    console.error('Error deleting element:', error);
  }
};

export const removeCanvas = (canvas) => async (dispatch) => {
  try {
    await deleteCanvas(canvas.canvasId);
    const canvasList = await getCanvases();
    dispatch(setCanvases(canvasList));
  } catch (error) {
    console.error('Error deleting element:', error);
  }
};
