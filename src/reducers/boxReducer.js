import { ADD_CROSS, MARK_SUCCESS } from "../actions/types";

const initialState = [
	[
		{ id: 1, value: 0, success: false },
		{ id: 2, value: 0, success: false },
		{ id: 3, value: 0, success: false }
	],
	[
		{ id: 4, value: 0, success: false },
		{ id: 5, value: 0, success: false },
		{ id: 6, value: 0, success: false }
	],
	[
		{ id: 7, value: 0, success: false },
		{ id: 8, value: 0, success: false },
		{ id: 9, value: 0, success: false }
	]
];

export default function(state = initialState, action) {
	switch (action.type) {
		case "ADD_CROSS": {
			const updatedItems = state.map(row => {
				const rowItems = row.map(item => {
					if (item.id === action.id) {
						return {
							id: item.id,
							value: action.payload,
							success: false
						};
					}
					return item;
				});
				return rowItems;
			});
			return updatedItems;
		}
		case "MARK_SUCCESS": {
			const updatedItems = state.map(row => {
				const rowItems = row.map(item => {
					if (
						item.id === action.a ||
						item.id === action.b ||
						item.id === action.c
					) {
						return {
							id: item.id,
							value: item.value,
							success: true
						};
					}
					return item;
				});
				return rowItems;
			});
			return updatedItems;
		}
	}
	return state;
}