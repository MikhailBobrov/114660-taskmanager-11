import {MONTH_NAMES} from '../constants';

const isDate = (date) => {
  return date instanceof Date;
};

const getDate = (date) => {
  if (!date || !isDate(date)) {
    return ``;
  }

  const day = date.getDate();
  const monthNum = date.getMonth();

  return `${day} ${MONTH_NAMES[monthNum]}`;
};

const getTime = (date) => {
  if (!date || !isDate(date)) {
    return ``;
  }

  const timeParts = [
    date.getHours(),
    date.getMinutes()
  ];

  return timeParts
    .map((item) => item < 10 ? `0${item}` : item)
    .join(`:`);
};

export {
  getDate,
  getTime
};
