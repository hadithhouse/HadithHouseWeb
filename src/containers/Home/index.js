import React from "react";
import HomeIcon from "@material-ui/icons/Home";

export function Home() {
  return <div>This is the home page.</div>;
}

Home.pageInfo = {
  path: "/",
  icon: <HomeIcon />,
  title: "Home"
};
