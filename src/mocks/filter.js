const filterTypes = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`,
];

const getFilterItems = (cardsData) => {
  const quantityByType = filterTypes.reduce((prev, type) => {
    let list = [];

    if (type === `all`) {
      list = cardsData;
    } else if (type === `overdue`) {
      list = cardsData.filter((item) => item.dueDate < new Date());
    } else if (type === `today`) {
      list = cardsData.filter((item) => {
        return (item.dueDate).toLocaleDateString() === (new Date()).toLocaleDateString();
      });
    } else if (type === `favorites`) {
      list = cardsData.filter((item) => item.isFavorite);
    } else if (type === `repeating`) {
      list = cardsData.filter((item) => item.isRepeat);
    } else if (type === `archive`) {
      list = cardsData.filter((item) => item.isArchive);
    }

    prev[type] = list.length;

    return prev;
  }, {});

  return filterTypes.map((name, index) => {
    const count = quantityByType[name] || 0;

    return {
      name,
      count,
      isChecked: index === 0
    };
  });
};

export {getFilterItems};
