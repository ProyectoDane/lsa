import {
  RESTART_CATEGORIES,
  CATEGORIES_RESTARTED,
  RESTART_ALPHABETICAL_PAGE,
  ALPHABETICAL_PAGE_RESTARTED,
  RESTART_SEARCH_PAGE,
  SEARCH_PAGE_RESTARTED
} from '../constants/';

export function restartCategories() {
  return {
    type: RESTART_CATEGORIES
  };
};

export function categoriesRestarted() {
  return {
    type: CATEGORIES_RESTARTED
  };
};

export function restartAlphabeticalPage() {
  return {
    type: RESTART_ALPHABETICAL_PAGE
  };
};

export function alphabeticalPageRestarted() {
  return {
    type: ALPHABETICAL_PAGE_RESTARTED
  };
};

export function restartSearchPage() {
  return {
    type: RESTART_SEARCH_PAGE
  };
};

export function searchPageRestarted() {
  return {
    type: SEARCH_PAGE_RESTARTED
  };
};
