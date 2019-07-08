import React from "react";
import { render } from "react-dom";

function Hi() {
  return <p>Hi. This is form the source dir.</p>;
}

render(<Hi />, document.getElementById("app"));
