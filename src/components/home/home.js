import React, { Component } from "react";
import ReactDOM from "react-dom";
import Box from "./box";
import PropTypes from "prop-types";
import classNames from "classnames";
import { addFlashMessage } from "../../actions/flashMessages";
import { bindActionCreators } from "redux";
import {
  restartGame,
  setDifficulty,
  updateScore,
  setFirstTurn,
  toggleCurrentPlayer
} from "../../actions/userActions";
import anime from "animejs";
import { connect } from "react-redux";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onePlayerTurn: true,
      difficulty: "medium",
      score: { x: 0, o: 0 },
      gameEnd: false,
      currentPlayerX: true
    };
    this.restartGame = this.restartGame.bind(this);
    this.handleDifficulty = this.handleDifficulty.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.clearScore = this.clearScore.bind(this);
    this.runSprinkler = this.runSprinkler.bind(this);
  }
  runSprinkler() {
    var sprinkler = anime.timeline();

    sprinkler
      .add({
        targets: ".sprinkle-1",
        translateX: [0, 100],
        translateY: [0, 100],
        elasticity: 300,
        duration: 1500,
        easing: "easeOutCubic",
        scale: [1, 0]
      })
      .add({
        targets: ".sprinkle-2",
        translateX: [0, 90],
        translateY: [0, -30],
        elasticity: 300,
        duration: 1500,
        easing: "easeOutCubic",
        offset: 50,
        scale: [1, 0]
      })
      .add({
        targets: ".sprinkle-3",
        translateX: [0, -110],
        translateY: [0, 30],
        elasticity: 300,
        duration: 1500,
        easing: "easeOutCubic",
        offset: 50,
        scale: [1, 0]
      })
      .add({
        targets: ".sprinkle-4",
        translateX: [0, -10],
        translateY: [0, 120],
        elasticity: 300,
        duration: 1500,
        easing: "easeOutCubic",
        offset: 150,
        scale: [1, 0]
      })
      .add({
        targets: ".sprinkle-5",
        translateX: [0, -50],
        translateY: [0, -30],
        elasticity: 300,
        easing: "easeOutCubic",
        duration: 1500,
        offset: 0,
        scale: [1, 0]
      })
      .add({
        targets: ".sprinkle-6",
        translateX: [0, 80],
        translateY: [0, 30],
        elasticity: 300,
        duration: 1500,
        easing: "easeOutCubic",
        offset: 0,
        scale: [1.25, 0]
      })
      .add({
        targets: ".sprinkle-7",
        translateX: [0, 60],
        translateY: [0, -110],
        elasticity: 300,
        duration: 1500,
        easing: "easeOutCubic",
        offset: 0,
        scale: [1.1, 0]
      })
      .add({
        targets: ".sprinkle-8",
        translateX: [0, 100],
        translateY: [0, 20],
        elasticity: 300,
        duration: 1500,
        easing: "easeOutCubic",
        offset: 0,
        scale: [1.3, 0]
      })
      .add({
        targets: ".sprinkle-9",
        translateX: [0, -20],
        translateY: [0, -80],
        elasticity: 300,
        duration: 1500,
        easing: "easeOutCubic",
        offset: 0,
        scale: [1, 0]
      });
  }
  clearScore() {
    if(!(this.state.score.x===0 && this.state.score.o===0)){
    this.props.updateScore(0, 0);
    this.props.addFlashMessage({
      type: "success",
      text: "Scores Reset"
    });}
  }
  handleSwitch() {
    this.props.restartGame(true);
    if (this.state.difficulty !== "twoP") {
      if (this.state.currentPlayerX) {
        var basicTimeline = anime.timeline();

        basicTimeline
          .add({
            targets: ".player-home",
            translateX: [0, 250, 0],
            scaleX: [1, 4, 1],

            elasticity: 100,
            duration: 300
          })
          .add({
            targets: ".player-away",
            translateX: [-250, 0],
            scaleX: [4, 1],

            elasticity: 100,
            duration: 300
          });
      } else {
        var basicTimeline = anime.timeline();

        basicTimeline
          .add({
            targets: ".player-away",
            translateX: [0, -250, 0],
            scaleX: [1, 4, 1],

            elasticity: 100,
            duration: 300
          })
          .add({
            targets: ".player-home",
            translateX: [250, 0],
            scaleX: [4, 1],

            elasticity: 100,
            duration: 300
          });
      }
    }
    this.props.addFlashMessage({
      type: "success",
      text: "Players switched"
    });

    this.props.updateScore(this.state.score.o, this.state.score.x);
    this.props.toggleCurrentPlayer(this.state.currentPlayerX);
  }
  restartGame() {
    this.props.restartGame(true);
    this.props.addFlashMessage({
      type: "success",
      text: "Game Restarted"
    });
  }
  handleDifficulty(data) {
    this.props.restartGame(true);
    this.setState({ difficulty: data });
    if (data !== "twoP") {
      this.props.addFlashMessage({
        type: "success",
        text: "Mode changed to " + data
      });
    } else {
      this.props.addFlashMessage({
        type: "success",
        text: "Mode changed to two player"
      });
    }
  }
  componentDidMount() {
    anime({
      targets: [".tic", ".tac", ".toe"],
      translateY: [-150, 0],
      direction: "alternate",
      loop: false,
      delay: function(el, i, l) {
        return i * 100;
      }
    });
  }
  componentDidUpdate(prevState) {
    if (this.state.gameWinner !== prevState.gameWinner) {
      this.runSprinkler();
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({ gameWinner: newProps.gameWinner });
    this.setState({ score: newProps.score });
    this.setState({ gameEnd: newProps.gameEnd });
    this.setState({ onePlayerTurn: newProps.turnChange });

    this.setState({ currentPlayerX: newProps.currentPlayerX });
  }
  render() {
    var homeClass = classNames({
      "ttt-home score-box": true,
      active: this.state.onePlayerTurn,
      winner: this.state.gameWinner === "x",
      currentPlayer: this.state.currentPlayerX,
      twoPlayer: !this.state.currentPlayerX && this.state.difficulty === "twoP"
    });
    var awayClass = classNames({
      "ttt-away score-box": true,
      active: !this.state.onePlayerTurn,
      winner: this.state.gameWinner === "o",
      currentPlayer: !this.state.currentPlayerX,
      twoPlayer: this.state.currentPlayerX && this.state.difficulty === "twoP"
    });
    var easyClass = classNames({
      difficulty: true,
      active: this.state.difficulty === "easy"
    });
    var mediumClass = classNames({
      difficulty: true,
      active: this.state.difficulty === "medium"
    });
    var impossibleClass = classNames({
      difficulty: true,
      active: this.state.difficulty === "impossible"
    });

    var twoPClass = classNames({
      difficulty: true,
      active: this.state.difficulty === "twoP"
    });
    return (
      <div className="main-body">
        <div className="ttt-header">
          <h1>
            <div className="tic">tic</div>
            <div className="tac">tac</div>
            <div className="toe">toe</div>
          </h1>
        </div>
        <div className="ttt-body">
          <div className="ttt-sidebar">
            <div className="ttt-controls">
              <div className="ttt-header-small">Mode</div>
              <div className="ttt-difficulty">
                <div
                  className={easyClass}
                  onClick={() => this.handleDifficulty("easy")}
                >
                  Easy
                </div>
                <div
                  className={mediumClass}
                  onClick={() => this.handleDifficulty("medium")}
                >
                  Medium
                </div>
                <div
                  className={impossibleClass}
                  onClick={() => this.handleDifficulty("impossible")}
                >
                  Impossible
                </div>
                <div
                  className={twoPClass}
                  onClick={() => this.handleDifficulty("twoP")}
                >
                  2P
                </div>
              </div>
              <div className="ttt-score">
                <div className="ttt-header-small">
                  Score{" "}
                  <div className="ttt-score-clear" onClick={this.clearScore}>
                    Clear
                  </div>
                </div>
                <div className="ttt-score-box">
                  <div className={homeClass}>
                    {this.state.gameWinner === "x" ? (
                      <div>
                        <div className="sprinkles">
                          <div className="sprinkle-1 sprinkle" />
                          <div className="sprinkle-2 sprinkle" />
                          <div className="sprinkle-3 sprinkle" />
                          <div className="sprinkle-4 sprinkle" />
                          <div className="sprinkle-5 sprinkle" />
                          <div className="sprinkle-6 sprinkle" />
                          <div className="sprinkle-7 sprinkle" />
                          <div className="sprinkle-8 sprinkle" />
                          <div className="sprinkle-9 sprinkle" />
                        </div>
                        <div
                          className="score-box-inner  animated bounceIn"
                          onClick={this.runSprinkler}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="#1f1653"
                              d="M392 105c.9-27 .2-56 .1-57H119.3c0 1-.8 30 .1 57H48c0 68 9.9 102.3 21 126.7S95.4 277 127.7 302c30.1 23.3 95.5 53.6 104.3 57.6v28.3c-4.6 10-23.5 28.2-83.3 28.2H128v48h256v-48h-25.7c-60.7 0-75-19.1-78.3-28.2v-28.3c9.3-4.6 80.9-40.3 104.4-57.5 25.2-18.4 50.9-51.5 58.7-70.3S464 167 464 105h-72zM109.6 211.9c-8.8-18.2-14-37.9-15.7-61.9h28.7c.7 6 1.4 11.3 2.3 16.3 6.6 39.2 14.8 70.2 25.7 96.5-17.3-13.5-31.3-30.8-41-50.9zm292.8 0c-9.9 20.3-24 37.7-41.6 51.3 11-26.2 19-56.8 25.8-96.9.8-5 1.6-10.3 2.3-16.3h29.3c-1.8 24-6.9 43.7-15.8 61.9z"
                            />
                          </svg>
                          Winner
                        </div>
                      </div>
                    ) : (
                      <div className="score-box-inner">
                        <svg aria-label="X" role="img" viewBox="0 0 128 128">
                          <path
                            className="hFJ9Ve"
                            d="M16,16L112,112"
                            strokeWidth="33"
                            stroke="#1f1653"
                            strokeDasharray=" 135.764"
                            strokeDashoffset="0"
                          />
                          <path
                            className="hFJ9Ve"
                            d="M112,16L16,112"
                            strokeWidth="33"
                            stroke="#1f1653"
                            strokeDasharray=" 135.764"
                            strokeDashoffset="0"
                          />
                        </svg>
                        <div className="score-home score">
                          {this.state.score.x > 0 && this.state.score.x}
                        </div>
                        <div className="indicators">
                          <div className="player-indicator player-home animated fadeIn" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ttt-score-switch" onClick={this.handleSwitch}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#fff"
                        d="M131.3 231.1L32 330.6l99.3 99.4v-74.6h174.5v-49.7H131.3v-74.6zM480 181.4L380.7 82v74.6H206.2v49.7h174.5v74.6l99.3-99.5z"
                      />
                    </svg>
                  </div>
                  <div className={awayClass}>
                    {this.state.gameWinner === "o" ? (
                      <div>
                        <div className="sprinkles">
                          <div className="sprinkle-1 sprinkle" />
                          <div className="sprinkle-2 sprinkle" />
                          <div className="sprinkle-3 sprinkle" />
                          <div className="sprinkle-4 sprinkle" />
                          <div className="sprinkle-5 sprinkle" />
                          <div className="sprinkle-6 sprinkle" />
                          <div className="sprinkle-7 sprinkle" />
                          <div className="sprinkle-8 sprinkle" />
                          <div className="sprinkle-9 sprinkle" />
                        </div>

                        <div
                          className="score-box-inner animated bounceIn"
                          onClick={this.runSprinkler}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="#1f1653"
                              d="M392 105c.9-27 .2-56 .1-57H119.3c0 1-.8 30 .1 57H48c0 68 9.9 102.3 21 126.7S95.4 277 127.7 302c30.1 23.3 95.5 53.6 104.3 57.6v28.3c-4.6 10-23.5 28.2-83.3 28.2H128v48h256v-48h-25.7c-60.7 0-75-19.1-78.3-28.2v-28.3c9.3-4.6 80.9-40.3 104.4-57.5 25.2-18.4 50.9-51.5 58.7-70.3S464 167 464 105h-72zM109.6 211.9c-8.8-18.2-14-37.9-15.7-61.9h28.7c.7 6 1.4 11.3 2.3 16.3 6.6 39.2 14.8 70.2 25.7 96.5-17.3-13.5-31.3-30.8-41-50.9zm292.8 0c-9.9 20.3-24 37.7-41.6 51.3 11-26.2 19-56.8 25.8-96.9.8-5 1.6-10.3 2.3-16.3h29.3c-1.8 24-6.9 43.7-15.8 61.9z"
                            />
                          </svg>
                          Winner
                        </div>
                      </div>
                    ) : (
                      <div className="score-box-inner">
                        <svg aria-label="O" role="img" viewBox="0 0 128 128">
                          <path
                            className="hFJ9Ve"
                            fill="transparent"
                            d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"
                            strokeWidth="33"
                            stroke="#1f1653"
                            strokeDasharray=" 301.635"
                          />
                        </svg>
                        <div className="score-away score">
                          {this.state.score.o > 0 && this.state.score.o}
                        </div>
                        <div className="indicators">
                          <div className="player-indicator player-away animated fadeIn" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="ttt-restart">
                {this.state.gameEnd ? (
                  <button onClick={this.restartGame} className="new-game">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#fff"
                        d="M256 48C141.2 48 48 141.2 48 256s93.2 208 208 208 208-93.2 208-208S370.8 48 256 48zm-41.6 301.6V162.4L339.2 256l-124.8 93.6z"
                      />
                    </svg>{" "}
                    Play Again
                  </button>
                ) : (
                  <button onClick={this.restartGame} className="restart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#fff"
                        d="M256 48C141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208S370.4 48 256 48zm112 194h-98l44.8-44.8C300.1 181.8 279.1 172 256 172c-46.2 0-84 37.8-84 84s37.8 84 84 84c34.9 0 65.3-21.2 77.6-52h29.8c-13.9 46.3-56.3 80-107.4 80-62.3 0-112-50.4-112-112s50.4-112 112-112c30.8 0 58.8 12.6 79.1 32.9L368 144v98z"
                      />
                    </svg>{" "}
                    Restart game
                  </button>
                )}
              </div>
            </div>
          </div>
          <Box
            difficulty={this.state.difficulty}
            currentPlayerX={this.state.currentPlayerX}
            score={this.state.score}
          />
        </div>
        <div className="ttt-footer">
          <div className="float-footer">
           <a href="https://github.com/atisawd" target="_blank">
            Created with <span>❤</span>
            <svg
              className="footer-logo"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              width="1825.596px"
              height="238.593px"
              viewBox="0 0 1825.596 238.593"
            >
              <path fill="#fff" d="M49.282,228.111" />
              <g>
                <polyline
                  opacity="0.6"
                  fill="#fff"
                  points="241.149,77.679 241.149,226.777 286.708,226.777 
    286.708,226.777 329.893,226.777 329.893,226.777 375.448,226.777 375.448,57.378 375.448,11.819 375.448,11.817 329.893,11.817 
    329.893,11.819 286.708,11.819 286.704,11.819 286.708,11.817 241.149,11.817  "
                />
                <polyline
                  fill="#fff"
                  points="282.99,11.819 282.985,11.819 282.99,11.817 237.43,11.817 237.43,11.817 194.245,11.819 
    194.245,11.819 148.686,11.819 -0.001,226.777 45.563,226.777 45.563,226.777 88.743,226.777 133.082,226.777 134.303,226.777 
    237.43,77.679   "
                />
              </g>
              <g>
                <path
                  fill="#fff"
                  d="M749.099,238.593l-21.69-50.389h-97.772l-21.69,50.389h-55.394L653.328,5.34h50.388l100.776,233.253
    H749.099z M678.688,74.748l-29.364,67.742h58.396L678.688,74.748z"
                />
                <path
                  fill="#fff"
                  d="M980.018,50.389v188.205h-52.059V50.389h-66.071V5.34h184.201v45.049H980.018z"
                />
                <path
                  fill="#fff"
                  d="M1150.867,5.34h52.057v233.253h-52.057V5.34z"
                />
                <path
                  fill="#fff"
                  d="M1381.615,51.891c-5.007,4.119-7.509,9.568-7.509,16.351c0,6.789,3.056,12.181,9.177,16.187
    c6.114,4.004,20.239,8.732,42.379,14.182c22.134,5.453,39.317,13.629,51.557,24.525c12.232,10.902,18.354,26.813,18.354,47.721
    c0,20.912-7.842,37.873-23.525,50.889c-15.684,13.014-36.32,19.52-61.9,19.52c-36.932,0-70.189-13.68-99.773-41.043l31.032-38.041
    c25.136,22.023,48.386,33.035,69.742,33.035c9.563,0,17.069-2.055,22.524-6.174c5.447-4.113,8.176-9.676,8.176-16.686
    c0-7.008-2.895-12.564-8.678-16.686c-5.786-4.113-17.24-8.285-34.368-12.514c-27.146-6.449-47-14.85-59.565-25.193
    c-12.57-10.345-18.854-26.582-18.854-48.72c0-22.134,7.951-39.21,23.859-51.223C1360.145,6.008,1380,0,1403.807,0
    c15.568,0,31.143,2.67,46.718,8.008c15.568,5.34,29.142,12.906,40.71,22.692l-26.361,38.042
    c-20.244-15.352-41.16-23.025-62.734-23.025C1393.459,45.717,1386.619,47.776,1381.615,51.891z"
                />
                <path
                  fill="#fff"
                  d="M1770.201,238.593l-21.689-50.389h-97.773l-21.689,50.389h-55.395L1674.432,5.34h50.387l100.777,233.253
    H1770.201z M1699.789,74.748l-29.364,67.742h58.397L1699.789,74.748z"
                />
              </g>
            </svg></a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    turnChange: state.turnChange,
    difficulty: state.difficulty,
    gameEnd: state.gameEnd,
    score: state.score,
    gameWinner: state.gameWinner,
    currentPlayerX: state.currentPlayerX
  };
}
Home.propTypes = {
  turnChange: PropTypes.bool,
  difficulty: PropTypes.string,
  gameEnd: PropTypes.bool,
  score: PropTypes.object,
  gameWinner: PropTypes.string,
  currentPlayerX: PropTypes.bool
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      restartGame,
      setDifficulty,
      addFlashMessage,
      setFirstTurn,
      updateScore,
      toggleCurrentPlayer
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);