import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import NewsContainer from "./components/newsContainer";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      catagory: "general",
    };
  }
  handleDropdownClick = (event) => {
    const selectedOption = event.target.getAttribute("data-option");
    if (selectedOption) {
      this.setState({ catagory: selectedOption });
    }
  };

  render() {
    
    return (
      <>
        <NavBar handleDropdownClick={this.handleDropdownClick} />;
        <NewsContainer catagory={this.state.catagory} />
      </>
    );
  }
}

export default App;
