import React from "react";
import ReactDOM from "react-dom";
import { HadithPage } from "./";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HadithPage match={{ params: { hadithId: 1 } }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
