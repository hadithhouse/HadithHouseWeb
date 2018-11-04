import React from "react";
import ReactDOM from "react-dom";
import { Hadiths } from "./";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Hadiths />, div);
  ReactDOM.unmountComponentAtNode(div);
});
