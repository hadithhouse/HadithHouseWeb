import React from "react";
import ReactDOM from "react-dom";
import HomePageContent from "./HomePageContent";
import { MemoryRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import { i18n } from "../../../i18n-test";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const hadith = {
    id: 1,
    text: "test"
  };
  ReactDOM.render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <HomePageContent hadith={hadith} />
      </I18nextProvider>
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
