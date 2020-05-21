const MAX_CARDS = 12;
const MAX_CARDS_SHOW = 8;

const ColorsNames = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

const WEEKDAYS = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false,
};

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const TaskFlag = {
  DATE_IS_SHOWN: `dateIsShown`,
  IS_REPEAT: `isRepeat`,
  IS_ARCHIVE: `isArchive`,
  IS_FAVORITE: `isFavorite`
};

const FilterType = {
  ALL: `all`,
  OVERDUE: `overdue`,
  TODAY: `today`,
  FAVORITES: `favorites`,
  REPEATING: `repeating`,
  ARCHIVE: `archive`,
};

const FiltersFlags = {
  [FilterType.FAVORITES]: TaskFlag.IS_FAVORITE,
  [FilterType.REPEATING]: TaskFlag.IS_REPEAT,
  [FilterType.ARCHIVE]: TaskFlag.IS_ARCHIVE,
};

const SortType = {
  DEFAULT: `default`,
  DATE_UP: `dateUp`,
  DATE_DOWN: `dateDown`
};

const RenderPositions = {
  BEGIN: 'begin',
  END: 'end'
};

export {
  ColorsNames,
  MAX_CARDS,
  MAX_CARDS_SHOW,
  WEEKDAYS,
  MONTH_NAMES,
  TaskFlag,
  FilterType,
  FiltersFlags,
  SortType,
  RenderPositions
};
