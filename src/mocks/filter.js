const getTodayListLength = (items) => {
  const list = items.filter((item) => {
    if (!item.dueDate) {
      return false;
    }
    return (item.dueDate).toLocaleDateString() === (new Date()).toLocaleDateString();
  });

  return list.length;
};

const getOverdueListLength = (items) => {
  const list = items.filter((item) => {
    if (!item.dueDate) {
      return false;
    }
    return item.dueDate < new Date();
  });

  return list.length;
};

const getListLength = (items, filterBy) => {
  const list = items.filter((item) => item[filterBy]);

  return list.length;
};

const getFilterItems = (cardsData) => {
  return [
    {
      title: `all`,
      count: cardsData.length
    },
    {
      title: `overdue`,
      count: getOverdueListLength(cardsData)
    },
    {
      title: `today`,
      count: getTodayListLength(cardsData)
    },
    {
      title: `favorites`,
      count: getListLength(cardsData, `isFavorite`)
    },
    {
      title: `repeating`,
      count: getListLength(cardsData, `isRepeat`)
    },
    {
      title: `archive`,
      count: getListLength(cardsData, `isArchive`)
    },
  ];
};

export {getFilterItems};
