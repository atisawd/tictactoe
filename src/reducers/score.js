import { UPDATE_SCORE_X, UPDATE_SCORE_O, UPDATE_SCORE } from "../actions/types";

const initialState = { x: 0, o: 0 };

export default function(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_SCORE_X": {
      return {
        ...state,
        x: action.payload + 1,
        o: state.o
      };
    }
    case "UPDATE_SCORE_O": {
      return {
        ...state,
        x: state.x,
        o: action.payload + 1
      };
    }
    case "UPDATE_SCORE": {
      return {
        ...state,
        x: action.x,
        o: action.o
      };
    }
  }
  return state;
}