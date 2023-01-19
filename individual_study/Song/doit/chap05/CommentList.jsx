import React from "react";
import Comment from "./Comment";

const message = [
  {
    name: "1",
    comment: "hello",
  },
  {
    name: "2",
    comment: "hi",
  },
  {
    name: "3",
    comment: "good",
  },
];

function CommentList(props) {
  return (
    <div>
      {message.map((m) => {
        return <Comment name={m.name} comment={m.comment} />;
      })}
    </div>
  );
}

export default CommentList;
