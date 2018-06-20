import { DELETE_EMPTY_ID } from "../actions/types";

const initialState = { items: [1, 2, 3, 4, 5, 6, 7, 8, 9] };

export default function(state = initialState, action) {
	switch (action.type) {
		case "DELETE_EMPTY_ID": {
			return {
				...state,
				items: state.items.filter(item => item !== action.payload)
			};
		}
	}
	return state;
}