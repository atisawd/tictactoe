import { SET_STRATEGY } from "../actions/types";

const strategy = (state = 0, action) => {
	switch (action.type) {
		case "SET_STRATEGY":
			return action.payload;
		default:
			return state;
	}
};

export default strategy;