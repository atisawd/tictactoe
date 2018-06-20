import main from './main.css';
import FlashMessagesList from "./components/flash/FlashMessagesList";
import Home from "./components/home/home";
import React, { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="main-content">
          <FlashMessagesList />
          <Home/>
        </div>
      </div>
    );
  }
}

export default App;