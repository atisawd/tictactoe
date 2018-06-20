import {
  ADD_CROSS,
  TOGGLE_TURN,
  SET_FIRST_TURN,
  TOGGLE_CURRENT_PLAYER,
  GAME_WINNER,
  UPDATE_SCORE,
  UPDATE_SCORE_X,
  UPDATE_SCORE_O,
  SET_STRATEGY,
  GAME_END,
  RESTART_GAME,
  TURN_CHANGE,
  DELETE_EMPTY_ID,
  MARK_SUCCESS
} from "./types";

export function updateScoreX(data) {
  return dispatch => {
    dispatch({
      type: UPDATE_SCORE_X,
      payload: data
    });
    dispatch(gameWinner("x"));
  };
}
export function updateScoreO(data) {
  return dispatch => {
    dispatch({
      type: UPDATE_SCORE_O,
      payload: data
    });
    dispatch(gameWinner("o"));
  };
}
export function updateScore(x, o) {
  return {
    type: UPDATE_SCORE,
    x: x,
    o: o,
    payload: ""
  };
}
export function gameWinner(data) {
  return {
    type: GAME_WINNER,
    payload: data
  };
}
export function changeTurn(bool) {
  return {
    type: TURN_CHANGE,
    payload: bool
  };
}
export function toggleTurn() {
  return {
    type: TOGGLE_TURN,
    payload: ""
  };
}
export function setFirstTurn(bool) {
  return {
    type: SET_FIRST_TURN,
    payload: bool
  };
}

export function toggleCurrentPlayer(bool) {
  return {
    type: TOGGLE_CURRENT_PLAYER,
    payload: bool
  };
}

export function endGame(bool) {
  return {
    type: GAME_END,
    payload: bool
  };
}
export function setStrategy(data) {
  return {
    type: SET_STRATEGY,
    payload: data
  };
}

export function restartGame(bool) {
  return {
    type: RESTART_GAME,
    payload: bool
  };
}

export function addCross(id, data) {
  return dispatch => {
    dispatch({
      type: ADD_CROSS,
      id: id,
      payload: data
    });
    dispatch(deleteEmptyId(id));
    dispatch(toggleTurn());
  };
}

export function deleteEmptyId(id) {
  return {
    type: DELETE_EMPTY_ID,
    payload: id
  };
}

export function markSuccess(id1, id2, id3) {
  return {
    type: MARK_SUCCESS,
    a: id1,
    b: id2,
    c: id3
  };
}