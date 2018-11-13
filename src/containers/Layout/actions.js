export const LAYOUT_ACTIONS = {
  OPEN_NAV_DRAWER: "LAYOUT_ACTION_OPEN_NAV_DRAWER",
  CLOSE_NAV_DRAWER: "LAYOUT_ACTION_CLOSE_NAV_DRAWER",
  OPEN_LANGUAGE_MENU: "LAYOUT_ACTION_OPEN_LANGUAGE_MENU",
  CLOSE_LANGUAGE_MENU: "LAYOUT_ACTION_CLOSE_LANGUAGE_MENU",
  TOGGLE_LANGUAGE_MENU: "LAYOUT_ACTION_TOGGLE_LANGUAGE_MENU"
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

export function openLanguageMenu() {
  return {
    type: LAYOUT_ACTIONS.OPEN_LANGUAGE_MENU
  };
}

export function closeLanguageMenu() {
  return {
    type: LAYOUT_ACTIONS.CLOSE_LANGUAGE_MENU
  };
}

export function toggleLanguageMenu() {
  return {
    type: LAYOUT_ACTIONS.TOGGLE_LANGUAGE_MENU
  };
}
