import { SET_CANVASES, ADD_TAB_SUCCESS, REMOVE_TAB, REMOVE_ELEMENT, SET_SELECTED_ELEMENT, SET_DROPPED_ELEMENTS } from './actions';

const initialState = {
  canvases: [],
  tabs: [],
  canvasElements: {},
  droppedElements: [],
  selectedElement: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CANVASES:
      return { ...state, canvases: action.payload };
    case ADD_TAB_SUCCESS:
      return { ...state, tabs: [...state.tabs, action.payload] };
    case REMOVE_TAB:
      const newTabs = state.tabs.filter((_, tabIndex) => tabIndex !== action.payload);
      return { ...state, tabs: newTabs };
    case REMOVE_ELEMENT:
      return {
        ...state,
        canvasElements: {
          ...state.canvasElements,
          [action.payload.canvasId]: state.canvasElements[action.payload.canvasId].filter(element => element.id !== action.payload.id)
        }
      };
    case SET_SELECTED_ELEMENT:
      return { ...state, selectedElement: action.payload };
    case SET_DROPPED_ELEMENTS:
      return { ...state, droppedElements: action.payload }; 
    default:
      return state;
  }
};

export default rootReducer;
