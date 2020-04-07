import {COLORSNAMES, WEEKDAYSNAMES} from '../const.js';

const texts = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const getRandomItem = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const getRandomDate = () => {
  const now = new Date();
  const direction = Math.random() > 0.5 ? 1 : -1;
  const offset = Math.floor(Math.random() * 7);

  now.setDate(now.getDate() + offset * direction);

  return now;
};

const getCardsData = (quantity) => {
  const data = [];

  for (let i = 0; i < quantity; i++) {
    const text = getRandomItem(texts);
    const color = getRandomItem(COLORSNAMES);
    const isEdit = i === 0;
    const isRepeat = Math.random() > 0.5;
    const isFavourite = Math.random() > 0.5;
    const isArchive = Math.random() > 0.5;
    const weekDays = isEdit ? getDays() : [];
    const colorControls = isEdit ? getColors(color) : [];
    const dateTime = getRandomDate();
    const isDeadline = dateTime < new Date();

    data.push({
      text,
      dateTime,
      weekDays,
      colors: {
        controls: colorControls,
        current: color
      },
      isRepeat,
      isFavourite,
      isArchive,
      isDeadline,
      isEdit,
    });
  }

  return data;
};

const getDays = (hasChecked = true) => {
  return WEEKDAYSNAMES.map((day) => {
    let isChecked = false;

    if (hasChecked) {
      isChecked = Math.random() > 0.5;
    }

    return {
      name: day,
      isChecked
    };
  });
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

export {getCardsData};
