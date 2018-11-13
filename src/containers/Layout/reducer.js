import { LAYOUT_ACTIONS } from "./actions";

const INIT_STATE = {
  isNavDrawerOpen: false,
  isLanguageMenuOpen: false
};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case LAYOUT_ACTIONS.OPEN_NAV_DRAWER:
      return {
        ...state,
        isNavDrawerOpen: true
      };

    case LAYOUT_ACTIONS.CLOSE_NAV_DRAWER:
      return {
        ...state,
        isNavDrawerOpen: false
      };

    case LAYOUT_ACTIONS.OPEN_LANGUAGE_MENU:
      return {
        ...state,
        isLanguageMenuOpen: true
      };

    case LAYOUT_ACTIONS.CLOSE_LANGUAGE_MENU:
      return {
        ...state,
        isLanguageMenuOpen: false
      };

    case LAYOUT_ACTIONS.TOGGLE_LANGUAGE_MENU:
      return {
        ...state,
        isLanguageMenuOpen: !state.isLanguageMenuOpen
      };

    default:
      return state;
  }
}
