import { HomePage } from "../HomePage";
import { HadithPage } from "../HadithPage";
import { HadithsPage } from "../HadithsPage";

function getPageInfo(pageComponent) {
  return {
    component: pageComponent,
    ...pageComponent.pageInfo
  };
}

export const PAGES = [HomePage, HadithPage, HadithsPage].map(c =>
  getPageInfo(c)
);
