const filterTypes = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`,
];

const getFilterItems = () => {
  return filterTypes.map((name, index) => {
    const count = index === 3 ? 0 : Math.floor(Math.random() * 20);

    return {
      name,
      count,
      isChecked: index === 0
    };
  });
};

export {getFilterItems};
