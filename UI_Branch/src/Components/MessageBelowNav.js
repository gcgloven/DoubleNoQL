import React from "react";
import ReviewData from "./ReviewData";
import "./style.css";

function MessageBelowNav() {
  return (
    <div class = "center">
      <p>Here are the Top {ReviewData.length} Reviews of the Day:</p>
    </div>
  )
}

export default MessageBelowNav
