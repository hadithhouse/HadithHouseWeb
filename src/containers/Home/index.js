import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import { Hadith } from "../../components/Hadith";

export function Home() {
  return (
    <div>
      <Hadith hadithId="random" />
    </div>
  );
}

Home.pageInfo = {
  path: "/",
  icon: <HomeIcon />,
  title: "Home"
};
