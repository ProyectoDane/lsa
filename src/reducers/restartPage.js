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
      shouldRestartCategories: true
    };
  case CATEGORIES_RESTARTED:
    return {
      shouldRestartCategories: false
    };
  case RESTART_ALPHABETICAL_PAGE:
    return {
      shouldRestartAlphabetical: true
    };
  case ALPHABETICAL_PAGE_RESTARTED:
    return {
      shouldRestartAlphabetical: false
    };
  case RESTART_SEARCH_PAGE:
    return {
      shouldRestartSearch: true
    };
  case SEARCH_PAGE_RESTARTED:
    return {
      shouldRestartSearch: false
    };
  default:
    return state;
  }
};
