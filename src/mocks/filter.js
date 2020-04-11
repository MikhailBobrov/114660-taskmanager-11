const filterTypes = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`,
];

const getTodayItems = (items) => {
  return items.filter((item) => {
    if (!item.dueDate) {
      return false;
    }
    return (item.dueDate).toLocaleDateString() === (new Date()).toLocaleDateString();
  });
};

const getFilterItems = (cardsData) => {
  const contentByType = {
    all: cardsData,
    overdue: cardsData.filter((item) => item.dueDate < new Date()),
    today: getTodayItems(cardsData),
    favorites: cardsData.filter((item) => item.isFavorite),
    repeating: cardsData.filter((item) => item.isRepeat),
    archive: cardsData.filter((item) => item.isArchive),
  };

  const quantityByType = filterTypes.reduce((prev, type) => {
    prev[type] = contentByType[type].length;

    return prev;
  }, {});

  return filterTypes.map((title, index) => {
    const count = quantityByType[title] || 0;

    return {
      title,
      count,
      isChecked: index === 0
    };
  });
};

export {getFilterItems};
