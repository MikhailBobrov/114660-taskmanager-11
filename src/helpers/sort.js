import {SortType} from '../constants';

const dateDown = (a, b) => {
  return b.dueDate - a.dueDate;
};

const dateUp = (a, b) => {
  return a.dueDate - b.dueDate;
};

export const getSortedTasks = (items, sortType) => {
  switch (sortType) {
    case SortType.DATE_DOWN:
      return items.sort(dateDown);
    case SortType.DATE_UP:
      return items.sort(dateUp);
    default:
      return items;
  }
};
