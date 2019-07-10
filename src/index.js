import React from "react";
import { render } from "react-dom";

function Hi() {
  return (
    <div className="section-header">
      <div id="hero" className="section-home">
        <div id="hero-bg">
          <div className="bg" alt="Photo by Mark McCammon from Pexels" />
        </div>
        <div id="hero-gradient" />
        <div id="hero-search">
          <h2>Discover the best recipes</h2>
        </div>
      </div>
    </div>
  );
}

render(<Hi />, document.getElementById("app"));
