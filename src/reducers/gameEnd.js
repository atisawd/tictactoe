import { GAME_END } from "../actions/types";

const gameEnd = (state = false, action) => {
	switch (action.type) {
		case "GAME_END":
			return action.payload;
		default:
			return state;
	}
};

export default gameEnd;