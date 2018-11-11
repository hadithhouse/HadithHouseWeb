import React from "react";
import ReactDOM from "react-dom";
import HomePageContent from "./HomePageContent";
import { MemoryRouter } from "react-router";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const hadith = {
    id: 1,
    text: "test"
  };
  ReactDOM.render(
    <MemoryRouter>
      <HomePageContent hadith={hadith} />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
