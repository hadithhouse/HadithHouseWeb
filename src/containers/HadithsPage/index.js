import React from "react";
import ChatIcon from "@material-ui/icons/Chat";
import HadithsPage from "./HadithsPage";

HadithsPage.pageInfo = {
  path: "/hadiths",
  icon: <ChatIcon />,
  titleResourceName: "hadiths_page_title",
  showInNavDrawer: true
};

export { HadithsPage };
