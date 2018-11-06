import { HomePage } from "../HomePage";
import { HadithPage } from "../HadithPage";
import { HadithsPage } from "../HadithsPage";

function getPageInfo(pageComponent) {
  return {
    component: pageComponent,
    icon: pageComponent.pageInfo.icon,
    title: pageComponent.pageInfo.title,
    path: pageComponent.pageInfo.path,
    showInNavDrawer: pageComponent.pageInfo.showInNavDrawer
  };
}

export const PAGES = [HomePage, HadithPage, HadithsPage].map(c =>
  getPageInfo(c)
);
