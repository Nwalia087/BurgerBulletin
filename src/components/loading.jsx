import React from "react";
import loadingAnimation from "../loadingAnimation.gif";

const Loading = () => {
  return (
    <div className="container text-center">
      <img src={loadingAnimation} style={{ height: "150px" }} alt="" />
    </div>
  );
};

export default Loading;
