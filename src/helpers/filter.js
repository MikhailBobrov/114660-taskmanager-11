import {FilterType, FiltersFlags, TaskFlag} from "../constants";

export const getTodayTasks = (items) => {
  const list = items.filter((item) => {
    if (!item.dueDate) {
      return false;
    }
    return (item.dueDate).toLocaleDateString() === (new Date()).toLocaleDateString();
  });

  return list;
};

export const getOverdueTasks = (items) => {
  const list = items.filter((item) => {
    if (!item.dueDate) {
      return false;
    }
    return item.dueDate < new Date();
  });

  return list;
};

export const getFilteredTasks = (items, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return items.filter((item) => !item[TaskFlag.IS_ARCHIVE]);
    case FilterType.OVERDUE:
      return getOverdueTasks(items);
    case FilterType.TODAY:
      return getTodayTasks(items);
    default:
      return items.filter((item) => item[FiltersFlags[filterType]]);
  }
};
