import React, { useState, useEffect } from "react";
import Axios from "axios";
import CommentBlock from "./CommentBlock";

function Comments({ id }) {
  const [comment, setComment] = useState([]);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8080/comments?topicId=" + id).then(
      ({ data }) => {
        const cmtData = data.data;
        cmtData.map((cmt) => {
          setComment((comment) => comment.concat(cmt));
        });
      }
    );

    Axios.get("http://localhost:8080/topic?id=" + id).then(({ data }) => {
      const topicData = data.data;
      setTopic(topicData ? topicData.title : "");
    });
  }, []);

  return (
    <div className="comments">
      <h1>주제: {topic}</h1>
      {comment.map((cmt) => (
        <CommentBlock key={cmt.id} id={cmt.id} />
      ))}
    </div>
  );
}

export default Comments;
