import React, { Component } from "react";
import loadingAnimation from "../loadingAnimation.gif";

export class Loading extends Component {
  render() {
    return (
      <div className="container text-center">
        <img src={loadingAnimation} style={{ height: "150px" }} alt="" />
      </div>
    );
  }
}

export default Loading;
