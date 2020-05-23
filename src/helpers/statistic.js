import moment from "moment";
import {getDate} from ".";

export const getTasksQuantityByColor = (tasks) => {
  return tasks
    .reduce((prev, {color}) => {
      if (!prev[color]) {
        prev[color] = 0;
      }

      prev[color]++;

      return prev;
    }, {});
};

const getDiffInDays = (date1, date2) => {
  let a = moment(date1);
  let b = moment(date2);
  return a.diff(b, `days`);
};

const checkIsOneDay = (date1, date2) => {
  return getDiffInDays(date1, date2) === 0 && date1.getDate() === date2.getDate();
};

export const getTasksQuantityByDay = (days, tasks) => {
  return days
    .reduce((prev, day) => {
      const key = getDate(day);
      const dayTasks = tasks.filter((item) => {
        return item.dueDate && checkIsOneDay(day, item.dueDate);
      });

      prev[key] = dayTasks.length;

      return prev;
    }, {});
};

export const getArchivedTasksBetweenFromTo = (tasks, from, to) => {
  return tasks.filter((item) => {
    return item.isArchive &&
      item.dueDate &&
      item.dueDate >= from
      && item.dueDate <= to;
  });
};

export const getDaysBetweenFromTo = (from, to) => {
  const duration = getDiffInDays(to, from);
  const days = [];

  for (let i = 0; i <= duration; i++) {
    const date = new Date(from);
    date.setDate(date.getDate() + i);
    days.push(date);
  }

  return days;
};
