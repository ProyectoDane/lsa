import {
  RESTART_CATEGORIES,
  CATEGORIES_RESTARTED,
  RESTART_ALPHABETICAL_PAGE,
  ALPHABETICAL_PAGE_RESTARTED,
  RESTART_SEARCH_PAGE,
  SEARCH_PAGE_RESTARTED
} from '../constants';

const initialState = {
  shouldRestartCategories: false,
  shouldRestartAlphabetical: false,
  shouldRestartSearch: false
};

export default function restartPageReducer(state = initialState, action) {
  switch (action.type) {
  case RESTART_CATEGORIES:
    return {
      ...state,
      shouldRestartCategories: true
    };
  case CATEGORIES_RESTARTED:
    return {
      ...state,
      shouldRestartCategories: false
    };
  case RESTART_ALPHABETICAL_PAGE:
    return {
      ...state,
      shouldRestartAlphabetical: true
    };
  case ALPHABETICAL_PAGE_RESTARTED:
    return {
      ...state,
      shouldRestartAlphabetical: false
    };
  case RESTART_SEARCH_PAGE:
    return {
      ...state,
      shouldRestartSearch: true
    };
  case SEARCH_PAGE_RESTARTED:
    return {
      ...state,
      shouldRestartSearch: false
    };
  default:
    return state;
  }
};
