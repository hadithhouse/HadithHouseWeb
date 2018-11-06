import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import { Hadith } from "../../components/Hadith";

export function HomePage() {
  return (
    <div>
      <Hadith hadithId="random" />
    </div>
  );
}

HomePage.pageInfo = {
  path: "/",
  icon: <HomeIcon />,
  title: "الصفحة الرئيسية",
  showInNavDrawer: true
};
