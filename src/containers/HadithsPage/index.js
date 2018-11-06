import React from "react";
import ChatIcon from "@material-ui/icons/Chat";

export function HadithsPage() {
  return <div>This is the Hadiths page.</div>;
}

HadithsPage.pageInfo = {
  path: "/hadiths",
  icon: <ChatIcon />,
  title: "الأحاديث",
  showInNavDrawer: true
};
