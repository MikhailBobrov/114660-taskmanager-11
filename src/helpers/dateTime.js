import {MONTH_NAMES} from '../const.js';

const getDate = (date) => {
  const day = date.getDate();
  const monthNum = date.getMonth();

  return `${day} ${MONTH_NAMES[monthNum]}`;
};

const getTime = (date) => {
  let timeParts = [
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
