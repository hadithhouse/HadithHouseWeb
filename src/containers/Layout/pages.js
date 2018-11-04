import { Home } from "../Home";
import { Hadiths } from "../Hadiths";

function getPageInfo(pageComponent) {
  return {
    component: pageComponent,
    icon: pageComponent.pageInfo.icon,
    title: pageComponent.pageInfo.title,
    path: pageComponent.pageInfo.path
  };
}

export const PAGES = [Home, Hadiths].map(c => getPageInfo(c));
