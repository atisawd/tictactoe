import { TURN_CHANGE } from "../actions/types";

const turnChange = (state = true, action) => {
	switch (action.type) {
		case "TURN_CHANGE":
			return action.payload;
		case "TOGGLE_TURN":
			return !state;
		default:
			return state;
	}
};

export default turnChange;