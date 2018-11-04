import { LAYOUT_ACTIONS } from "./actions";

const INIT_STATE = {
  isNavDrawerOpen: false
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

    default:
      return state;
  }
}
