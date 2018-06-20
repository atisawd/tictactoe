import appReducer from "./appReducer";

import { RESTART_GAME } from "../actions/types";
const rootReducer = (state, action) => {
  if (action.type === "RESTART_GAME" && action.payload === true) {
    if (typeof state != "undefined") {
      state = { score: state.score, currentPlayerX: state.currentPlayerX };
    } else {
      state = undefined;
    }
  }
  return appReducer(state, action);
};
export default rootReducer;