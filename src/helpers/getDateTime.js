import moment from 'moment';

const isDate = (date) => {
  return date instanceof Date;
};

const getDate = (date) => {
  if (!date || !isDate(date)) {
    return ``;
  }

  return moment(date).format(`D MMMM`);
};

const getTime = (date) => {
  if (!date || !isDate(date)) {
    return ``;
  }

  return moment(date).format(`H:MM`);
};

export {
  getDate,
  getTime
};
