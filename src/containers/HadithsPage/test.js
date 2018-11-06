import React from "react";
import ReactDOM from "react-dom";
import { HadithsPage } from "./";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HadithsPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
