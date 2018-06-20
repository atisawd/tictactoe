import { GAME_WINNER } from "../actions/types";

const gameWinner = (state = "", action) => {
	switch (action.type) {
		case "GAME_WINNER":
			return action.payload;
		default:
			return state;
	}
};

export default gameWinner;