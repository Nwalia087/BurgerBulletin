import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import NewsContainer from "./components/newsContainer";
import LoadingBar from "react-top-loading-bar";


export class App extends Component {
  constructor() {
    super();
    this.state = {
      catagory: "general",
      progress: 0,
    };
  }
  ApiKey = process.env.REACT_APP_API_KEY;
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  handleDropdownClick = (event) => {
    const selectedOption = event.target.getAttribute("data-option");
    if (selectedOption) {
      this.setState({ catagory: selectedOption });
    }
  };

  render() {
    console.log(this.ApiKey);
    return (
      <>
        <NavBar handleDropdownClick={this.handleDropdownClick} />;
        <LoadingBar color="#000000" progress={this.state.progress} onLoaderFinished={() => this.setProgress(0)} />
        <NewsContainer catagory={this.state.catagory} setProgress={this.setProgress} ApiKey={this.ApiKey} />
      </>
    );
  }
}

export default App;
