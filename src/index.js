import React from "react";
import { render } from "react-dom";

handleChange(event) {
  console.log('call api');
}

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
          <div id="search" className="container-fluid container-constrain">
            <div onKeyPress="Javascript: if (event.keyCode==13) load();">
              <div className="row row-condensed">
                <div className="col-sm-12">
                  <div className="form-element">
                    <input
                      name="query"
                      id="ingredient"
                      className="form-control input-lg form-control-icon icon-location"
                      type="text"
                      placeholder="What ingredient do you want to use?"
                      value=""
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

render(<Hi />, document.getElementById("app"));
