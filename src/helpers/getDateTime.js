import moment from 'moment';

const isDate = (date) => {
  return date instanceof Date;
};

const getValidDate = (date) => {
  if (!date) {
    return null;
  }

  // Turn value in milliseconds into date object
  if (!isDate(date)) {
    const newDate = new Date(date);

    if (isDate(newDate)) {
      return newDate;
    }

    return null;
  }

  return date;
};

const getDate = (date) => {
  date = getValidDate(date);

  if (!date) {
    return ``;
  }

  return moment(date).format(`D MMMM`);
};

const getTime = (date) => {
  date = getValidDate(date);

  if (!date) {
    return ``;
  }

  return moment(date).format(`H:MM`);
};

const getPeriod = (from, to) => {
  return `${getDate(from)} - ${getDate(to)}`;
};

export {
  getDate,
  getTime,
  getPeriod
};
