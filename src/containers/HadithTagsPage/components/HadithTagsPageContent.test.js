import React from "react";
import ReactDOM from "react-dom";
import HadithTagsPageContent from "./HadithTagsPageContent";
import { MemoryRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import { i18n } from "../../../i18n-test";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <HadithTagsPageContent
          count={1}
          tags={[{ id: 1, text: "test" }]}
          tagsPerPage={1}
          onChangeTagsPerPage={() => {}}
          onChangePage={() => {}}
          page={1}
        />
      </I18nextProvider>
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
