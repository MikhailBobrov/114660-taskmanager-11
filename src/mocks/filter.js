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
        if (!item.dueDate) {
          return false;
        }
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
