import React, { useState, useEffect } from "react";
import Axios from "axios";

function TailcommentBlock({ id }) {
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8080/tailcomment?id=" + id)
      .then((d) => {
        const tcmtData = d.data.data;

        Axios.get("http://localhost:8080/user?id=" + tcmtData.userId).then(
          (userData) => {
            setUser(userData.data.data.name);
          }
        );

        setContent(tcmtData.content);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="tailcommant">
      <span>
        ---------→ 글쓴이 : {user}, 내용 : {content}
      </span>
    </div>
  );
}

export default TailcommentBlock;
