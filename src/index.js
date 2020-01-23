import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppWithHooks from "./AppWithHooks";
import * as serviceWorker from "./serviceWorker";

const Index = () => {
  return (
    <>
      <h1>Class-based Component</h1>
      <App></App>
      <h1>Function-based Component</h1>
      <AppWithHooks></AppWithHooks>
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
