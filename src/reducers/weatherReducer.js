import {
  GET_WEATHER,
  REMOVE_LOCATIONS,
  GET_DISPLAY_PARAMS,
  SET_BG_COLOR
} from "../actions/types";

const initialState = {
  info: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER:
      return {
        ...state,
        info: action.payload
      };
    case REMOVE_LOCATIONS: {
      return {
        ...state,
        info: { info: action.payload, ...state.info }
      };
    }

    case SET_BG_COLOR: {
      return {
        ...state,
        info: { info: action.payload, ...state.info }
      };
    }

    case GET_DISPLAY_PARAMS:
      return {
        ...state,
        info: action.payload
      };

    default:
      return state;
  }
}
