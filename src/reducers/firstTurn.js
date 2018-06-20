import { SET_FIRST_TURN } from "../actions/types";

const firstTurn = (state = false, action) => {
	switch (action.type) {
		case "SET_FIRST_TURN":
			return action.payload;
		default:
			return state;
	}
};

export default firstTurn;