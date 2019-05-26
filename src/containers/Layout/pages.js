import { HomePage } from "../HomePage";
import { HadithPage } from "../HadithPage";
import { HadithsPage } from "../HadithsPage";
import { HadithTagsPage } from "../HadithTagsPage";

function getPageInfo(pageComponent) {
  return {
    component: pageComponent,
    ...pageComponent.pageInfo
  };
}

export const PAGES = [HomePage, HadithPage, HadithsPage, HadithTagsPage].map(
  c => getPageInfo(c)
);
