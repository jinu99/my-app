import React from "react";
import "./App.css";

import Posts from "./Comments";

function App() {
  return (
    <div>
      <Posts id="1" />
      <hr />
      <Posts id="2" />
      <hr />
      <Posts id="3" />
      <hr />
    </div>
  );
}

export default App;
