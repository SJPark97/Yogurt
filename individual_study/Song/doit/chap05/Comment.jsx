import React from "react";
import "./Comment.css";

function Comment(props) {
    // console.log(props);
  return (
    <div className="wrapper">
      <div className="contentContainer">
        <span className="nameText">{props.name}</span>
        <span className="commentText">{props.comment}</span>
      </div>
    </div>
  );
}

export default Comment;
