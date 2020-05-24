const MAX_CARDS = 23;
const MAX_CARDS_SHOW = 8;

const ColorName = {
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
  FAVORITE: `favorites`,
  REPEATING: `repeating`,
  ARCHIVE: `archive`,
};

const FiltersFlags = {
  [FilterType.ALL]: TaskFlag.IS_ARCHIVE,
  [FilterType.FAVORITE]: TaskFlag.IS_FAVORITE,
  [FilterType.REPEATING]: TaskFlag.IS_REPEAT,
  [FilterType.ARCHIVE]: TaskFlag.IS_ARCHIVE,
};

const SortType = {
  DEFAULT: `default`,
  DATE_UP: `dateUp`,
  DATE_DOWN: `dateDown`
};

const RenderPosition = {
  BEGIN: `begin`,
  END: `end`
};

export {
  MAX_CARDS,
  MAX_CARDS_SHOW,
  ColorName,
  WEEKDAYS,
  TaskFlag,
  FilterType,
  FiltersFlags,
  SortType,
  RenderPosition
};
