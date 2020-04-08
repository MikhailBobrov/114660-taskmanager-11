import {COLORSNAMES, WEEKDAYSNAMES, DESCRIPTIONS} from '../const.js';

const week = 7;

const getWeekdaysObj = () => {
  return WEEKDAYSNAMES.reduce((prev, item) => {
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
  const offset = Math.floor(Math.random() * week);

  now.setDate(now.getDate() + offset * direction);

  return now;
};

const getFutureDate = () => {
  const now = new Date();
  now.setDate(now.getDate() + week);

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

const getColors = (currentColor) => {
  return COLORSNAMES.map((color) => {
    const isChecked = color === currentColor;

    return {
      name: color,
      isChecked
    };
  });
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
    const color = isCreate ? `` : getRandomItem(COLORSNAMES);
    const colorControls = isEdit ? getColors(color) : [];
    const dueDate = isCreate ? getFutureDate() : getRandomDate();
    const isDeadline = dueDate < new Date();

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
      colorControls,
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
