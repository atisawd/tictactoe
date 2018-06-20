import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import anime from "animejs";
class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.slideMessage = this.slideMessage.bind(this);
  }

  deleteMessage() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  slideMessage() {
    var alert = document.querySelector(".alert");

    setTimeout(
      function() {
        anime({
          targets: ".alert",
          translateY: [0, 20],
          loop: false,
          opacity: [1, 0],
          scaleX: [1, 0.75],
          delay: function(el, i, l) {
            return i * 300;
          }
        });

        setTimeout(
          function() {
            this.deleteMessage();
          }.bind(this),
          500
        );
      }.bind(this),
      1500
    );
  }
  componentDidMount() {
    this.slideMessage();
    anime({
      targets: ".alert",
      translateY: [20, 0],
      loop: false,
      opacity: [0, 1],
      scaleX: [0.75, 1],
      delay: function(el, i, l) {
        return i * 100;
      }
    });
  }

  render() {
    const { id, type, text } = this.props.message;
    return (
      <div
        className={classnames("alert animated   fadeInUp", {
          "alert-success": type === "success",
          "alert-danger": type === "error"
        })}
      >
        {text}
      </div>
    );
  }
}
FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;