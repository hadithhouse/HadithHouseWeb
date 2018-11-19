import React from "react";
import ReactDOM from "react-dom";
import HadithsPageContent from "./HadithsPageContent";
import { MemoryRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import { i18n } from "../../../i18n-test";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <HadithsPageContent
          count={1}
          hadiths={[{ id: 1, text: "test" }]}
          hadithsPerPage={1}
          onChangeHadithsPerPage={() => {}}
          onChangePage={() => {}}
          page={1}
        />
      </I18nextProvider>
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
