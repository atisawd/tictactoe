import { TOGGLE_CURRENT_PLAYER } from "../actions/types";

const curentPlayerX = (state = true, action) => {
	switch (action.type) {
		case "TOGGLE_CURRENT_PLAYER":
			return !state;
		default:
			return state;
	}
};

export default curentPlayerX;