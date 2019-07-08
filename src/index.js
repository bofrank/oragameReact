import React from "react";
import { render } from "react-dom";

function Hi() {
  return (
    <div>
      <img
        src="images/cabinet-contemporary-counter-1080721.jpg"
        alt="Photo by Mark McCammon from Pexels"
      />
    </div>
  );
}

render(<Hi />, document.getElementById("app"));
