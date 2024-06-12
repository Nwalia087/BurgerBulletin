import "./App.css";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import NewsContainer from "./components/newsContainer";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [catagory, setCatagory] = useState("general");
  const [progress, setProgress] = useState("general");

  const ApiKey = process.env.REACT_APP_API_KEY;
  const handleDropdownClick = (event) => {
    const selectedOption = event.target.getAttribute("data-option");
    if (selectedOption) {
      setCatagory(selectedOption);
    }
  };

  return (
    <>
      <NavBar handleDropdownClick={handleDropdownClick} />;
      <LoadingBar color="#000000" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <NewsContainer catagory={catagory} setProgress={setProgress} ApiKey={ApiKey} />
    </>
  );
};

export default App;
