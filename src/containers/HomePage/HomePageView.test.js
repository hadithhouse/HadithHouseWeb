import React from "react";
import ReactDOM from "react-dom";
import HomePageView from "./HomePageView";
import { MemoryRouter } from "react-router";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const hadith = {
    id: 1,
    text: "test"
  };
  ReactDOM.render(
    <MemoryRouter>
      <HomePageView hadith={hadith} />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
