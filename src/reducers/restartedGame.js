import { RESTART_GAME } from "../actions/types";

const restartedGame = (state = false, action) => {
	switch (action.type) {
		case "RESTART_GAME":
			return action.payload;
		default:
			return state;
	}
};

export default restartedGame;