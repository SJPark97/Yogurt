import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Clock from "./chap04/Clock";
import CommentList from "./chap05/CommentList";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <App />
    <Clock />
    <CommentList/>
  </div>
);
