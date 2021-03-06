import React, { useState, useEffect } from "react";
import Axios from "axios";
import TailcommentBlock from "./TailcommentBlock";

function CommentBlock({ id }) {
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const [like, setLike] = useState(0);
  const [tcmt, setTcmt] = useState([]);

  const increaseLike = () => {
    Axios.patch("http://localhost:8080/comment?id=" + id, {
      like: like + 1,
    }).then(() => {
      setLike(like + 1);
    });
  };

  const decreaseLike = () => {
    const nextLike = like > 0 ? like - 1 : 0;
    Axios.patch("http://localhost:8080/comment?id=" + id, {
      like: nextLike,
    }).then(() => {
      setLike(nextLike);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/comment?id=" + id)
      .then(({ data }) => {
        const commentData = data.data;
        console.log(commentData);

        Axios.get("http://localhost:8080/user?id=" + commentData.userId).then(
          (userData) => {
            setUser(userData.data.data.name);
          }
        );

        setContent(commentData.content);
        setLike(commentData.like);
        setTcmt(data.tails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="commentBlock">
      <div className="info">
        <h3>글쓴이 : {user}</h3>
      </div>
      <h4>내용 : {content}</h4>
      <div className="likes">
        <span>Currently {like} people like this.</span>
        <button onClick={increaseLike}>LIKE!</button>
        <button onClick={decreaseLike}>DISLIKE!</button>
      </div>
      {tcmt.map((tailcmt) => (
        <TailcommentBlock id={tailcmt.id} key={tailcmt.id} />
      ))}
    </div>
  );
}

export default CommentBlock;
