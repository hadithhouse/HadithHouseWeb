export const LAYOUT_ACTIONS = {
  OPEN_NAV_DRAWER: "LAYOUT_ACTION_OPEN_NAV_DRAWER",
  CLOSE_NAV_DRAWER: "LAYOUT_ACTION_CLOSE_NAV_DRAWER"
};

export function openNavDrawer() {
  return {
    type: LAYOUT_ACTIONS.OPEN_NAV_DRAWER
  };
}

export function closeNavDrawer() {
  return {
    type: LAYOUT_ACTIONS.CLOSE_NAV_DRAWER
  };
}
