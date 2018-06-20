import { combineReducers } from "redux";

import boxValues from "./boxReducer";
import turnChange from "./turnChange";
import emptyIds from "./emptyIds";
import gameEnd from "./gameEnd";
import strategy from "./strategy";
import score from "./score";
import gameWinner from "./gameWinner";
import currentPlayerX from "./currentPlayerX";
import firstTurn from "./firstTurn";
import flashMessages from "./flashMessages";
import restartedGame from "./restartedGame";

const appReducer = combineReducers({
	boxValues,
	turnChange,
	emptyIds,
	restartedGame,
	flashMessages: flashMessages,
	gameEnd,
	currentPlayerX,
	strategy,
	gameWinner,
	firstTurn,
	score
});
export default appReducer;