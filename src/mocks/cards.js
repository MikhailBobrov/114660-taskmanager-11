import {COLORS_NAMES, WEEKDAYS_NAMES, DESCRIPTIONS} from '../constants.js';

const WEEK = 7;

const getWeekdaysObj = () => {
  return WEEKDAYS_NAMES.reduce((prev, item) => {
    prev[item] = false;

    return prev;
  }, {});
};

const weekdaysInitial = getWeekdaysObj();

const getRandomItem = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const getRandomDate = () => {
  const now = new Date();
  const direction = Math.random() > 0.5 ? 1 : -1;
  const offset = Math.floor(Math.random() * WEEK);

  now.setDate(now.getDate() + offset * direction);

  return now;
};

const getWeekDays = (hasChecked = true) => {
  if (!hasChecked) {
    return weekdaysInitial;
  }

  return Object.entries(weekdaysInitial).reduce((prev, [name]) => {
    prev[name] = Math.random() > 0.5;
    return prev;
  }, {});
};

const getCardsData = (quantity) => {
  const data = [];

  for (let i = 0; i < quantity; i++) {
    const isEdit = i <= 1; // 0 edit, 1 create
    const isCreate = i === 1;
    const isRepeat = Math.random() > 0.5;
    const isFavorite = Math.random() > 0.5;
    const isArchive = Math.random() > 0.5;

    const description = isCreate ? `` : getRandomItem(DESCRIPTIONS);
    const color = isCreate ? `` : getRandomItem(COLORS_NAMES);
    const dueDate = isCreate ? null : getRandomDate();
    let isDeadline = isCreate ? false : dueDate < new Date();

    let weekDays = [];

    if (isCreate) {
      weekDays = getWeekDays(false);
    } else if (isEdit) {
      weekDays = getWeekDays();
    }

    data.push({
      description,
      dueDate,
      weekDays,
      color,
      isRepeat,
      isFavorite,
      isArchive,
      isDeadline,
      isEdit,
    });
  }

  return data;
};

export {getCardsData};
