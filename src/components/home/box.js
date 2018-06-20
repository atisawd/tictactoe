import React, { Component } from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import anime from "animejs";
import includes from "lodash/fp/includes";
import { addFlashMessage } from "../../actions/flashMessages";
import {
  addCross,
  changeTurn,
  markSuccess,
  restartGame,
  setFirstTurn,
  endGame,
  setStrategy,
  updateScoreX,
  updateScoreO
} from "../../actions/userActions";
class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onePlayerTurn: true,
      XAITurn: true,
      OAITurn: false,
      tttarray: [
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
      ],
      emptyIds: { items: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      gameEnd: false,
      impAIStrat: 0,
      difficulty: "medium",
      score: { x: 0, o: 0 },
      firstTurn: false,
      winPattern: 0,
      currentPlayerX: true
    };

    this.handleBoxClick = this.handleBoxClick.bind(this);
    this.handleEasyAITurn = this.handleEasyAITurn.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.finishGame = this.finishGame.bind(this);
    this.runMediumAISteps = this.runMediumAISteps.bind(this);
    this.runEasyAISteps = this.runEasyAISteps.bind(this);
    this.runFirstAIStep = this.runFirstAIStep.bind(this);
    this.handleSecondEasyAITurn = this.handleSecondEasyAITurn.bind(this);
    this.handleSecondMediumAITurn = this.handleSecondMediumAITurn.bind(this);
    this.handleSecondImpossibleAITurn = this.handleSecondImpossibleAITurn.bind(
      this
    );
  }
  runFirstAIStep() {
    if (this.state.firstTurn) {
      if (this.state.difficulty === "impossible") {
        var ids = [1, 3, 5, 7, 9];
        var fixed = ids[Math.floor(Math.random() * ids.length)];
        if (fixed === 5) {
          this.props.setStrategy(1);
        } else {
          this.props.setStrategy(2);
        }
        this.props.addCross(fixed, 2);
      } else {
        var randid = this.state.emptyIds.items[
          Math.floor(Math.random() * this.state.emptyIds.items.length)
        ];
        this.props.addCross(randid, 2);
      }
      this.setState({ XAITurn: false });
      this.props.setFirstTurn(false);
    }
  }
  finishGame() {
    this.props.changeTurn(false);
    this.props.endGame(true);
  }

  checkWin() {
    if (!this.state.gameEnd) {
      if (
        this.state.tttarray[0][0].value === this.state.tttarray[0][1].value &&
        this.state.tttarray[0][1].value === this.state.tttarray[0][2].value &&
        this.state.tttarray[0][1].value !== 0
      ) {
        this.props.markSuccess(
          this.state.tttarray[0][0].id,
          this.state.tttarray[0][1].id,
          this.state.tttarray[0][2].id
        );
        this.setState({ winPattern: 1 });

        if (this.state.tttarray[0][0].value === 1) {
          this.props.updateScoreO(this.state.score.o);
        } else if (this.state.tttarray[0][0].value === 2) {
          this.props.updateScoreX(this.state.score.x);
        }
        this.finishGame();
        return true;
      } else if (
        this.state.tttarray[1][0].value === this.state.tttarray[1][1].value &&
        this.state.tttarray[1][1].value === this.state.tttarray[1][2].value &&
        this.state.tttarray[1][1].value !== 0
      ) {
        this.props.markSuccess(
          this.state.tttarray[1][0].id,
          this.state.tttarray[1][1].id,
          this.state.tttarray[1][2].id
        );
        this.setState({ winPattern: 2 });
        if (this.state.tttarray[1][0].value === 1) {
          this.props.updateScoreO(this.state.score.o);
        } else if (this.state.tttarray[1][0].value === 2) {
          this.props.updateScoreX(this.state.score.x);
        }
        this.finishGame();
        return true;
      } else if (
        this.state.tttarray[2][0].value === this.state.tttarray[2][1].value &&
        this.state.tttarray[2][1].value === this.state.tttarray[2][2].value &&
        this.state.tttarray[2][1].value !== 0
      ) {
        this.props.markSuccess(
          this.state.tttarray[2][0].id,
          this.state.tttarray[2][1].id,
          this.state.tttarray[2][2].id
        );
        this.setState({ winPattern: 3 });
        if (this.state.tttarray[2][0].value === 1) {
          this.props.updateScoreO(this.state.score.o);
        } else if (this.state.tttarray[2][0].value === 2) {
          this.props.updateScoreX(this.state.score.x);
        }
        this.finishGame();
        return true;
      } else if (
        this.state.tttarray[0][0].value === this.state.tttarray[1][1].value &&
        this.state.tttarray[1][1].value === this.state.tttarray[2][2].value &&
        this.state.tttarray[1][1].value !== 0
      ) {
        this.props.markSuccess(
          this.state.tttarray[0][0].id,
          this.state.tttarray[1][1].id,
          this.state.tttarray[2][2].id
        );
        this.setState({ winPattern: 4 });
        if (this.state.tttarray[0][0].value === 1) {
          this.props.updateScoreO(this.state.score.o);
        } else if (this.state.tttarray[0][0].value === 2) {
          this.props.updateScoreX(this.state.score.x);
        }
        this.finishGame();
        return true;
      } else if (
        this.state.tttarray[0][2].value === this.state.tttarray[1][1].value &&
        this.state.tttarray[1][1].value === this.state.tttarray[2][0].value &&
        this.state.tttarray[1][1].value !== 0
      ) {
        this.props.markSuccess(
          this.state.tttarray[0][2].id,
          this.state.tttarray[1][1].id,
          this.state.tttarray[2][0].id
        );
        this.setState({ winPattern: 5 });
        if (this.state.tttarray[0][2].value === 1) {
          this.props.updateScoreO(this.state.score.o);
        } else if (this.state.tttarray[0][2].value === 2) {
          this.props.updateScoreX(this.state.score.x);
        }
        this.finishGame();
        return true;
      } else if (
        this.state.tttarray[0][0].value === this.state.tttarray[1][0].value &&
        this.state.tttarray[1][0].value === this.state.tttarray[2][0].value &&
        this.state.tttarray[1][0].value !== 0
      ) {
        this.props.markSuccess(
          this.state.tttarray[0][0].id,
          this.state.tttarray[1][0].id,
          this.state.tttarray[2][0].id
        );
        this.setState({ winPattern: 6 });
        if (this.state.tttarray[0][0].value === 1) {
          this.props.updateScoreO(this.state.score.o);
        } else if (this.state.tttarray[0][0].value === 2) {
          this.props.updateScoreX(this.state.score.x);
        }
        this.finishGame();
        return true;
      } else if (
        this.state.tttarray[0][1].value === this.state.tttarray[1][1].value &&
        this.state.tttarray[1][1].value === this.state.tttarray[2][1].value &&
        this.state.tttarray[1][1].value !== 0
      ) {
        this.props.markSuccess(
          this.state.tttarray[0][1].id,
          this.state.tttarray[1][1].id,
          this.state.tttarray[2][1].id
        );
        this.setState({ winPattern: 7 });
        if (this.state.tttarray[0][1].value === 1) {
          this.props.updateScoreO(this.state.score.o);
        } else if (this.state.tttarray[0][1].value === 2) {
          this.props.updateScoreX(this.state.score.x);
        }
        this.finishGame();
        return true;
      } else if (
        this.state.tttarray[0][2].value === this.state.tttarray[1][2].value &&
        this.state.tttarray[1][2].value === this.state.tttarray[2][2].value &&
        this.state.tttarray[2][2].value !== 0
      ) {
        this.props.markSuccess(
          this.state.tttarray[0][2].id,
          this.state.tttarray[1][2].id,
          this.state.tttarray[2][2].id
        );
        this.setState({ winPattern: 8 });
        if (this.state.tttarray[0][2].value === 1) {
          this.props.updateScoreO(this.state.score.o);
        } else if (this.state.tttarray[0][2].value === 2) {
          this.props.updateScoreX(this.state.score.x);
        }
        this.finishGame();
        return true;
      }
      return false;
    }
  }

  runEasyAISteps(AIid, userID) {
    var rand = this.state.emptyIds.items[
      Math.floor(Math.random() * this.state.emptyIds.items.length)
    ];
    this.props.addCross(rand, AIid);
  }
  runMediumAISteps(AIid, userID) {
    if (
      this.state.tttarray[2][0].value === this.state.tttarray[1][1].value &&
      this.state.tttarray[1][1].value === userID &&
      this.state.tttarray[0][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][2].id, AIid);
    } else if (
      this.state.tttarray[2][0].value === this.state.tttarray[0][2].value &&
      this.state.tttarray[0][2].value === userID &&
      this.state.tttarray[1][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][1].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[0][1].value &&
      this.state.tttarray[0][1].value === AIid &&
      this.state.tttarray[0][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][2].id, AIid);
    } else if (
      this.state.tttarray[0][1].value === this.state.tttarray[0][2].value &&
      this.state.tttarray[0][1].value === AIid &&
      this.state.tttarray[0][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][0].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[0][2].value &&
      this.state.tttarray[0][0].value === AIid &&
      this.state.tttarray[0][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][1].id, AIid);
    } else if (
      this.state.tttarray[1][0].value === this.state.tttarray[1][1].value &&
      this.state.tttarray[1][1].value === AIid &&
      this.state.tttarray[1][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][2].id, AIid);
    } else if (
      this.state.tttarray[1][1].value === this.state.tttarray[1][2].value &&
      this.state.tttarray[1][1].value === AIid &&
      this.state.tttarray[1][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][0].id, AIid);
    } else if (
      this.state.tttarray[1][0].value === this.state.tttarray[1][2].value &&
      this.state.tttarray[1][0].value === AIid &&
      this.state.tttarray[1][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][1].id, AIid);
    } else if (
      this.state.tttarray[2][0].value === this.state.tttarray[2][1].value &&
      this.state.tttarray[2][1].value === AIid &&
      this.state.tttarray[2][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][2].id, AIid);
    } else if (
      this.state.tttarray[2][1].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[2][1].value === AIid &&
      this.state.tttarray[2][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][0].id, AIid);
    } else if (
      this.state.tttarray[2][0].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[2][0].value === AIid &&
      this.state.tttarray[2][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][1].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[1][0].value &&
      this.state.tttarray[1][0].value === AIid &&
      this.state.tttarray[2][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][0].id, AIid);
    } else if (
      this.state.tttarray[1][0].value === this.state.tttarray[2][0].value &&
      this.state.tttarray[1][0].value === AIid &&
      this.state.tttarray[0][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][0].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[2][0].value &&
      this.state.tttarray[0][0].value === AIid &&
      this.state.tttarray[1][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][0].id, AIid);
    } else if (
      this.state.tttarray[0][1].value === this.state.tttarray[1][1].value &&
      this.state.tttarray[1][1].value === AIid &&
      this.state.tttarray[2][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][1].id, AIid);
    } else if (
      this.state.tttarray[1][1].value === this.state.tttarray[2][1].value &&
      this.state.tttarray[1][1].value === AIid &&
      this.state.tttarray[0][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][1].id, AIid);
    } else if (
      this.state.tttarray[0][1].value === this.state.tttarray[2][1].value &&
      this.state.tttarray[0][1].value === AIid &&
      this.state.tttarray[1][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][1].id, AIid);
    } else if (
      this.state.tttarray[0][2].value === this.state.tttarray[1][2].value &&
      this.state.tttarray[1][2].value === AIid &&
      this.state.tttarray[2][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][2].id, AIid);
    } else if (
      this.state.tttarray[1][2].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[1][2].value === AIid &&
      this.state.tttarray[0][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][2].id, AIid);
    } else if (
      this.state.tttarray[0][2].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[0][2].value === AIid &&
      this.state.tttarray[1][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][2].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[1][1].value &&
      this.state.tttarray[1][1].value === AIid &&
      this.state.tttarray[2][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][2].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[2][2].value === AIid &&
      this.state.tttarray[1][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][1].id, AIid);
    } else if (
      this.state.tttarray[1][1].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[2][2].value === AIid &&
      this.state.tttarray[0][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][0].id, AIid);
    } else if (
      this.state.tttarray[0][2].value === this.state.tttarray[1][1].value &&
      this.state.tttarray[1][1].value === AIid &&
      this.state.tttarray[2][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][0].id, AIid);
    } else if (
      this.state.tttarray[2][0].value === this.state.tttarray[1][1].value &&
      this.state.tttarray[1][1].value === AIid &&
      this.state.tttarray[0][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][2].id, AIid);
    } else if (
      this.state.tttarray[2][0].value === this.state.tttarray[0][2].value &&
      this.state.tttarray[0][2].value === AIid &&
      this.state.tttarray[1][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][1].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[0][1].value &&
      this.state.tttarray[0][1].value === userID &&
      this.state.tttarray[0][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][2].id, AIid);
    } else if (
      this.state.tttarray[0][1].value === this.state.tttarray[0][2].value &&
      this.state.tttarray[0][1].value === userID &&
      this.state.tttarray[0][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][0].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[0][2].value &&
      this.state.tttarray[0][0].value === userID &&
      this.state.tttarray[0][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][1].id, AIid);
    } else if (
      this.state.tttarray[1][0].value === this.state.tttarray[1][1].value &&
      this.state.tttarray[1][1].value === userID &&
      this.state.tttarray[1][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][2].id, AIid);
    } else if (
      this.state.tttarray[1][1].value === this.state.tttarray[1][2].value &&
      this.state.tttarray[1][1].value === userID &&
      this.state.tttarray[1][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][0].id, AIid);
    } else if (
      this.state.tttarray[1][0].value === this.state.tttarray[1][2].value &&
      this.state.tttarray[1][0].value === userID &&
      this.state.tttarray[1][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][1].id, AIid);
    } else if (
      this.state.tttarray[2][0].value === this.state.tttarray[2][1].value &&
      this.state.tttarray[2][1].value === userID &&
      this.state.tttarray[2][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][2].id, AIid);
    } else if (
      this.state.tttarray[2][1].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[2][1].value === userID &&
      this.state.tttarray[2][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][0].id, AIid);
    } else if (
      this.state.tttarray[2][0].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[2][0].value === userID &&
      this.state.tttarray[2][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][1].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[1][0].value &&
      this.state.tttarray[1][0].value === userID &&
      this.state.tttarray[2][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][0].id, AIid);
    } else if (
      this.state.tttarray[1][0].value === this.state.tttarray[2][0].value &&
      this.state.tttarray[1][0].value === userID &&
      this.state.tttarray[0][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][0].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[2][0].value &&
      this.state.tttarray[0][0].value === userID &&
      this.state.tttarray[1][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][0].id, AIid);
    } else if (
      this.state.tttarray[0][1].value === this.state.tttarray[1][1].value &&
      this.state.tttarray[1][1].value === userID &&
      this.state.tttarray[2][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][1].id, AIid);
    } else if (
      this.state.tttarray[1][1].value === this.state.tttarray[2][1].value &&
      this.state.tttarray[1][1].value === userID &&
      this.state.tttarray[0][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][1].id, AIid);
    } else if (
      this.state.tttarray[0][1].value === this.state.tttarray[2][1].value &&
      this.state.tttarray[0][1].value === userID &&
      this.state.tttarray[1][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][1].id, AIid);
    } else if (
      this.state.tttarray[0][2].value === this.state.tttarray[1][2].value &&
      this.state.tttarray[1][2].value === userID &&
      this.state.tttarray[2][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][2].id, AIid);
    } else if (
      this.state.tttarray[1][2].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[1][2].value === userID &&
      this.state.tttarray[0][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][2].id, AIid);
    } else if (
      this.state.tttarray[0][2].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[0][2].value === userID &&
      this.state.tttarray[1][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][2].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[1][1].value &&
      this.state.tttarray[1][1].value === userID &&
      this.state.tttarray[2][2].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][2].id, AIid);
    } else if (
      this.state.tttarray[0][0].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[2][2].value === userID &&
      this.state.tttarray[1][1].value === 0
    ) {
      this.props.addCross(this.state.tttarray[1][1].id, AIid);
    } else if (
      this.state.tttarray[1][1].value === this.state.tttarray[2][2].value &&
      this.state.tttarray[2][2].value === userID &&
      this.state.tttarray[0][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[0][0].id, AIid);
    } else if (
      this.state.tttarray[0][2].value === this.state.tttarray[1][1].value &&
      this.state.tttarray[1][1].value === userID &&
      this.state.tttarray[2][0].value === 0
    ) {
      this.props.addCross(this.state.tttarray[2][0].id, AIid);
    } else {
      this.runEasyAISteps(AIid, userID);
    }
  }
  handleSecondImpossibleAITurn() {
    if (!this.state.gameEnd) {
      if (this.state.impAIStrat === 1) {
        if (
          this.state.tttarray[1][0].value === 1 ||
          this.state.tttarray[1][2].value === 1 ||
          this.state.tttarray[2][1].value === 1 ||
          this.state.tttarray[0][1].value === 1
        ) {
          this.props.setStrategy(3);

          if (this.state.tttarray[1][0].value === 1) {
            var ids = [3, 9];
            var randid = ids[Math.floor(Math.random() * ids.length)];
            this.props.addCross(randid, 2);
          } else if (this.state.tttarray[0][1].value === 1) {
            var ids = [7, 9];
            var randid = ids[Math.floor(Math.random() * ids.length)];
            this.props.addCross(randid, 2);
          } else if (this.state.tttarray[2][1].value === 1) {
            var ids = [1, 3];
            var randid = ids[Math.floor(Math.random() * ids.length)];
            this.props.addCross(randid, 2);
          } else if (this.state.tttarray[1][2].value === 1) {
            var ids = [1, 7];
            var randid = ids[Math.floor(Math.random() * ids.length)];
            this.props.addCross(randid, 2);
          }
        } else if (
          this.state.tttarray[0][0].value === 1 ||
          this.state.tttarray[0][2].value === 1 ||
          this.state.tttarray[2][0].value === 1 ||
          this.state.tttarray[2][2].value === 1
        ) {
          this.props.setStrategy(4);
          if (this.state.tttarray[0][0].value === 1) {
            this.props.addCross(9, 2);
          } else if (this.state.tttarray[0][2].value === 1) {
            this.props.addCross(7, 2);
          } else if (this.state.tttarray[2][2].value === 1) {
            this.props.addCross(1, 2);
          } else if (this.state.tttarray[2][0].value === 1) {
            this.props.addCross(3, 2);
          }
        } else {
          this.props.setStrategy(11);
          this.runMediumAISteps(2, 1);
        }
      } else if (this.state.impAIStrat === 2) {
        if (this.state.tttarray[1][1].value === 1) {
          this.props.setStrategy(5);
          if (this.state.tttarray[0][0].value === 2) {
            this.props.addCross(9, 2);
          } else if (this.state.tttarray[2][0].value === 2) {
            this.props.addCross(3, 2);
          } else if (this.state.tttarray[2][2].value === 2) {
            this.props.addCross(1, 2);
          } else if (this.state.tttarray[0][2].value === 2) {
            this.props.addCross(7, 2);
          }
        } else {
          this.props.setStrategy(6);
          if (this.state.tttarray[0][0].value === 2) {
            if (
              this.state.tttarray[2][0].value === 0 &&
              this.state.tttarray[1][0].value !== 1
            ) {
              this.props.addCross(7, 2);
            } else {
              this.props.addCross(3, 2);
            }
          } else if (this.state.tttarray[2][0].value === 2) {
            if (
              this.state.tttarray[0][0].value === 0 &&
              this.state.tttarray[1][0].value !== 1
            ) {
              this.props.addCross(1, 2);
            } else {
              this.props.addCross(9, 2);
            }
          } else if (this.state.tttarray[2][2].value === 2) {
            if (
              this.state.tttarray[2][0].value === 0 &&
              this.state.tttarray[2][1].value !== 1
            ) {
              this.props.addCross(7, 2);
            } else {
              this.props.addCross(3, 2);
            }
          } else if (this.state.tttarray[0][2].value === 2) {
            if (
              this.state.tttarray[0][0].value === 0 &&
              this.state.tttarray[0][1].value !== 1
            ) {
              this.props.addCross(1, 2);
            } else {
              this.props.addCross(9, 2);
            }
          }
        }
      } else {
        this.props.setStrategy(11);
        this.runMediumAISteps(2, 1);
      }
      this.setState({ XAITurn: false });
    }
  }
  handleImpossibleAITurn() {
    if (!this.state.gameEnd) {
      if (this.state.impAIStrat === 0) {
        if (this.state.tttarray[1][1].value === 2) {
          this.props.setStrategy(1);
          var ids = [1, 3, 7, 9];
          var randid = ids[Math.floor(Math.random() * ids.length)];
          this.props.addCross(randid, 1);
        } else if (
          this.state.tttarray[0][0].value === 2 ||
          this.state.tttarray[2][2].value === 2 ||
          this.state.tttarray[0][2].value === 2 ||
          this.state.tttarray[2][0].value === 2
        ) {
          this.props.setStrategy(2);
          this.props.addCross(5, 1);
        } else {
          this.props.setStrategy(5);
          this.runMediumAISteps(1, 2);
        }
      } else if (this.state.impAIStrat === 2) {
        if (
          (this.state.tttarray[0][0].value === 2 &&
            this.state.tttarray[2][2].value === 2) ||
          (this.state.tttarray[0][2].value === 2 &&
            this.state.tttarray[2][0].value === 2) ||
          (this.state.tttarray[2][0].value === 2 &&
            this.state.tttarray[0][2].value === 2) ||
          (this.state.tttarray[2][2].value === 2 &&
            this.state.tttarray[0][0].value === 2)
        ) {
          this.props.setStrategy(3);
          var ids = [2, 4, 6, 8];
          var randid = ids[Math.floor(Math.random() * ids.length)];

          this.props.addCross(randid, 1);
        } else {
          this.props.setStrategy(4);
          this.runMediumAISteps(1, 2);
        }
      } else if (this.state.impAIStrat === 1) {
        if (
          this.state.tttarray[0][0].value === 2 ||
          this.state.tttarray[2][2].value === 2 ||
          this.state.tttarray[0][2].value === 2 ||
          this.state.tttarray[2][0].value === 2
        ) {
          if (
            (this.state.tttarray[0][0].value === 1 &&
              this.state.tttarray[2][2].value === 2) ||
            (this.state.tttarray[0][2].value === 1 &&
              this.state.tttarray[2][0].value === 2) ||
            (this.state.tttarray[2][0].value === 1 &&
              this.state.tttarray[0][2].value === 2) ||
            (this.state.tttarray[2][2].value === 1 &&
              this.state.tttarray[0][0].value === 2)
          ) {
            this.props.setStrategy(4);
            if (this.state.tttarray[0][0].value === 1) {
              var ids = [3, 7];
              var randid = ids[Math.floor(Math.random() * ids.length)];

              this.props.addCross(randid, 1);
            } else if (this.state.tttarray[0][2].value === 1) {
              var ids = [1, 9];
              var randid = ids[Math.floor(Math.random() * ids.length)];

              this.props.addCross(randid, 1);
            } else if (this.state.tttarray[2][2].value === 1) {
              var ids = [3, 7];
              var randid = ids[Math.floor(Math.random() * ids.length)];

              this.props.addCross(randid, 1);
            } else if (this.state.tttarray[2][0].value === 1) {
              var ids = [1, 9];
              var randid = ids[Math.floor(Math.random() * ids.length)];

              this.props.addCross(randid, 1);
            }
          } else {
            this.props.setStrategy(5);
            this.runMediumAISteps(1, 2);
          }
        } else {
          this.runMediumAISteps(1, 2);
        }
      } else {
        this.runMediumAISteps(1, 2);
      }

      this.setState({ OAITurn: false });
    }
  }
  handleSecondMediumAITurn() {
    if (!this.state.gameEnd) {
      this.runMediumAISteps(2, 1);

      this.props.changeTurn(false);
      this.setState({ XAITurn: false });
    }
  }
  handleMediumAITurn() {
    if (!this.state.gameEnd) {
      this.runMediumAISteps(1, 2);

      this.props.changeTurn(true);
      this.setState({ OAITurn: false });
    }
  }
  handleSecondEasyAITurn() {
    if (!this.state.gameEnd) {
      this.runEasyAISteps(2, 1);

      this.props.changeTurn(false);

      this.setState({ XAITurn: false });
    }
  }
  handleEasyAITurn() {
    if (!this.state.gameEnd) {
      this.runEasyAISteps(1, 2);

      this.props.changeTurn(true);

      this.setState({ OAITurn: false });
    }
  }
  handleBoxClick(id) {
    if (!this.state.gameEnd) {
      if (this.state.difficulty !== "twoP") {
        if (
          this.state.currentPlayerX &&
          !this.state.OAITurn &&
          this.state.emptyIds.items.includes(id)
        ) {
          this.props.addCross(id, 2);
          this.setState({ OAITurn: true });
          setTimeout(
            function() {
              if (this.state.difficulty === "easy") {
                this.handleEasyAITurn();
              }
              if (this.state.difficulty === "medium") {
                this.handleMediumAITurn();
              }
              if (this.state.difficulty === "impossible") {
                this.handleImpossibleAITurn();
              }
            }.bind(this),
            500
          );
        } else if (
          !this.state.currentPlayerX &&
          !this.state.XAITurn &&
          this.state.emptyIds.items.includes(id)
        ) {
          this.props.addCross(id, 1);
          this.setState({ XAITurn: true });
          setTimeout(
            function() {
              if (this.state.difficulty === "easy") {
                this.handleSecondEasyAITurn();
              }
              if (this.state.difficulty === "medium") {
                this.handleSecondMediumAITurn();
              }
              if (this.state.difficulty === "impossible") {
                this.handleSecondImpossibleAITurn();
              }
            }.bind(this),
            500
          );
        }
      } else {
        if (this.state.onePlayerTurn) {
          if (this.state.emptyIds.items.includes(id)) {
            this.props.addCross(id, 2);
          }
        } else {
          if (this.state.emptyIds.items.includes(id)) {
            this.props.addCross(id, 1);
          }
        }
      }
    }
  }
  componentWillUpdate(nextState) {}
  componentDidUpdate(prevState) {
    if (
      this.state.gameEnd &&
      this.state.score !== prevState.score &&
      this.state.score !== { x: 0, o: 0 }
    ) {
      if (this.state.winPattern === 6) {
        anime({
          targets: ".line-box",
          left: ["15%", "15%", "15%", "15%"],
          top: ["5%", "5%", "5%", "100%"],
          bottom: ["95%", "95%", "5%", "5%"],
          easing: "easeInOutSine",
          loop: false,
          opacity: [0, 1, 1, 0],
          duration: 600,
          delay: 100
        });
      } else if (this.state.winPattern === 7) {
        anime({
          targets: ".line-box",
          left: ["48%", "48%", "48%", "48%"],
          top: ["5%", "5%", "5%", "100%"],
          bottom: ["95%", "95%", "5%", "5%"],
          easing: "easeInOutSine",
          loop: false,
          opacity: [0, 1, 1, 0],
          duration: 600,
          delay: 100
        });
      } else if (this.state.winPattern === 8) {
        anime({
          targets: ".line-box",
          left: ["81%", "81%", "81%", "81%"],
          top: ["5%", "5%", "5%", "100%"],
          bottom: ["95%", "95%", "5%", "5%"],
          easing: "easeInOutSine",
          loop: false,
          opacity: [0, 1, 1, 0],
          duration: 600,
          delay: 100
        });
      } else if (this.state.winPattern === 2) {
        anime({
          targets: ".line-box-2",
          left: ["5%", "5%", "5%", "100%"],
          top: ["48%", "48%", "48%", "48%"],
          right: ["95%", "95%", "5%", "5%"],
          easing: "easeInOutSine",
          loop: false,
          opacity: [0, 1, 1, 0],
          duration: 600,
          delay: 100
        });
      } else if (this.state.winPattern === 3) {
        anime({
          targets: ".line-box-2",
          left: ["5%", "5%", "5%", "100%"],
          top: ["81%", "81%", "81%", "81%"],
          right: ["95%", "95%", "5%", "5%"],
          easing: "easeInOutSine",
          loop: false,
          opacity: [0, 1, 1, 0],
          duration: 600,
          delay: 100
        });
      } else if (this.state.winPattern === 1) {
        anime({
          targets: ".line-box-2",
          left: ["5%", "5%", "5%", "100%"],
          top: ["15%", "15%", "15%", "15%"],
          right: ["95%", "95%", "5%", "5%"],
          easing: "easeInOutSine",
          loop: false,
          opacity: [0, 1, 1, 0],
          duration: 600,
          delay: 100
        });
      } else if (this.state.winPattern === 4) {
        anime({
          targets: ".line-box-3",
          top: ["0%", "0%", "100%"],
          bottom: ["100%", "0%", "0%"],
          easing: "easeInOutSine",
          loop: false,
          opacity: [1, 1, 0],
          duration: 600,
          delay: 100
        });
      } else if (this.state.winPattern === 5) {
        anime({
          targets: ".line-box-4",
          top: ["0%", "0%", "100%"],
          bottom: ["100%", "0%", "0%"],
          easing: "easeInOutSine",
          loop: false,
          opacity: [1, 1, 0],
          duration: 600,
          delay: 100
        });
      }
    }
    if (this.state.emptyIds.items !== prevState.emptyIds.items) {
      for (var i = 0; i < prevState.emptyIds.items.length; i++) {
        if (!this.state.emptyIds.items.includes(prevState.emptyIds.items[i])) {
          anime({
            targets: "#box-" + prevState.emptyIds.items[i] + " path",
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: "easeInOutExpo",
            duration: 200,
            delay: function(el, i) {
              return i * 250;
            }
          });
        }
      }
    }
    this.checkWin();
    if (this.state.emptyIds.items.length === 0) {
      this.finishGame();
    }
    if (this.state.currentPlayerX === false) {
      if (this.state.firstTurn === true) {
        this.runFirstAIStep();
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.gameEnd !== newProps.gameEnd) {
      this.setState({ XAITurn: true });
      this.setState({ OAITurn: false });
    }

    if (newProps.currentPlayerX === false) {
      if (
        this.state.currentPlayerX !== newProps.currentPlayerX &&
        newProps.difficulty !== "twoP"
      ) {
        this.props.setFirstTurn(true);

        this.props.changeTurn(true);
      } else if (
        this.state.difficulty !== newProps.difficulty &&
        newProps.difficulty !== "twoP"
      ) {
        this.props.setFirstTurn(true);
        this.props.changeTurn(true);
      } else if (
        this.state.gameEnd !== newProps.gameEnd &&
        newProps.gameEnd === false
      ) {
        this.props.setFirstTurn(true);

        this.props.changeTurn(true);
      } else if (newProps.restartedGame && newProps.difficulty !== "twoP") {
        this.props.setFirstTurn(true);
        this.props.changeTurn(true);
        this.props.restartGame(false);
      }
    } else {
      if (newProps.restartedGame) {
        this.props.restartGame(false);
      }
    }

    this.setState({ gameEnd: newProps.gameEnd });
    this.setState({ tttarray: newProps.boxValues });
    this.setState({ onePlayerTurn: newProps.turnChange });
    this.setState({ emptyIds: newProps.emptyIds });
    this.setState({ difficulty: newProps.difficulty });
    this.setState({ score: newProps.score });
    this.setState({ firstTurn: newProps.firstTurn });
    this.setState({ currentPlayerX: newProps.currentPlayerX });

    this.setState({ impAIStrat: newProps.strategy });
  }
  render() {
    const boxItems = this.state.tttarray.map((row, num) => {
      const rowItems = row.map((item, item_num) => {
        // var svgClass= classNames({
        //      'animated bounceIn' :  !this.state.gameEnd,
        //      'animated rubberBand' :  (this.state.gameEnd && item.success)

        //    }
        //     );
        var tdClass = classNames({
          "box-blank": item.value == 0,
          "box-circle": item.value == 1,
          "box-cross": item.value == 2,
          "ttt-box": true,
          active: !this.state.gameEnd,
          success: item.success
        });

        return (
          <td
            key={item.id}
            id={"box-" + item.id}
            className={tdClass}
            onClick={() => this.handleBoxClick(item.id)}
          >
            {item.value == 1 ? (
              <svg aria-label="O" role="img" viewBox="0 0 128 128">
                <path
                  className="hFJ9Ve"
                  fill="transparent"
                  d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"
                  strokeWidth="33"
                  stroke="#cad6e6"
                  strokeDasharray=" 301.635"
                />
              </svg>
            ) : null}

            {item.value == 2 ? (
              <svg aria-label="X" role="img" viewBox="0 0 128 128">
                <path
                  className="hFJ9Ve"
                  d="M16,16L112,112"
                  strokeWidth="33"
                  stroke="#cad6e6"
                  strokeDasharray=" 135.764"
                  strokeDashoffset="0"
                />
                <path
                  className="hFJ9Ve"
                  d="M112,16L16,112"
                  strokeWidth="33"
                  stroke="#cad6e6"
                  strokeDasharray=" 135.764"
                  strokeDashoffset="0"
                />
              </svg>
            ) : null}
          </td>
        );
      });
      return (
        <tr key={num} className={"ttt-row row-" + (num + 1)}>
          {rowItems}
        </tr>
      );
    });

    return (
      <div className="ttt-container">
        <div className="containerin">
          {this.state.gameEnd ? (
            <div>
              <div className="line-box" />
              <div className="line-box-2" />
              <div className="line-box-3-rotate">
                <div className="line-box-3" />
              </div>
              <div className="line-box-4-rotate">
                <div className="line-box-4" />
              </div>
            </div>
          ) : null}
          <table className="ttt-table">
            <tbody>{boxItems}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    boxValues: state.boxValues,
    turnChange: state.turnChange,
    emptyIds: state.emptyIds,
    gameEnd: state.gameEnd,
    strategy: state.strategy,
    firstTurn: state.firstTurn,
    restartedGame: state.restartedGame
  };
}
Box.propTypes = {
  boxValues: PropTypes.array,
  turnChange: PropTypes.bool,
  emptyIds: PropTypes.object,
  gameEnd: PropTypes.bool,
  strategy: PropTypes.number,
  firstTurn: PropTypes.bool,
  restartedGame: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCross,
      changeTurn,
      restartGame,
      markSuccess,
      addFlashMessage,
      setFirstTurn,
      endGame,
      setStrategy,
      updateScoreX,
      updateScoreO
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);