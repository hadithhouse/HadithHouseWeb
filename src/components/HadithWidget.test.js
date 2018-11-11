import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import { HadithWidget } from "./HadithWidget";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const hadith = {
    id: 1,
    text: "text"
  };

  ReactDOM.render(
    <MemoryRouter>
      <HadithWidget hadith={hadith} />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
