import React from "react";
import searchStyles from "./searchStyles.css";

function Card(props) {
  return (
    <div className="card text-center">
      <div className="card-header">
        <h2 className= "search-text">{props.heading}</h2>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export default Card;
