import AbstractComponent from '../abstract-component';
import {getHandlerWithProp, createElement} from '../../helpers';
import {TaskFlag} from '../../constants';

const ClassName = {
  DEFAULT: `card__btn`,
  DISABLED: `card__btn--disabled`,
  EDIT: `card__btn--edit`,
  ARCHIVE: `card__btn--archive`,
  FAVORITES: `card__btn--favorites`,
};

const ArchiveButtonText = {
  DEFAULT: `Archive`,
  WAITING: `Archiving...`
};

const FavoritesButtonText = {
  DEFAULT: `Favorites`,
  WAITING: `Favoriting...`
};

const CONTROLS_DATA = [
  {
    name: `edit`
  },
  {
    name: `archive`,
    prop: TaskFlag.IS_ARCHIVE
  },
  {
    name: `favorites`,
    prop: TaskFlag.IS_FAVORITE
  }
];

export default class CardControls extends AbstractComponent {
  constructor(taskData) {
    super();

    this._taskData = taskData;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, getHandlerWithProp(`.${ClassName.DEFAULT}`, handler));
  }

  setEditBtnHandler(handler) {
    const control = this.getElement().querySelector(`.${ClassName.EDIT}`);

    control.addEventListener(`click`, handler);
  }

  resetText() {
    this._archiveControlElement.innerHTML = ArchiveButtonText.DEFAULT;
    this._favoritesControlElement.innerHTML = FavoritesButtonText.DEFAULT;
  }

  _getControls() {
    return CONTROLS_DATA.reduce((prev, item) => {
      const {name, prop} = item;
      const dataAttr = prop ? `data-prop="${prop}"` : ``;
      let className = `${ClassName.DEFAULT} ${ClassName.DEFAULT}--${name}`;
      const value = this._taskData[prop];

      if (value === false) {
        className += ` ${ClassName.DISABLED}`;
      }

      return `${prev} <button type="button"
          class="${className}"
          ${dataAttr}
        >
          ${name}
        </button>`;
    }, ``);
  }

  _createElement() {
    const element = createElement(this._getTmpl());

    this._archiveControlElement = element.querySelector(`.${ClassName.ARCHIVE}`);
    this._favoritesControlElement = element.querySelector(`.${ClassName.FAVORITES}`);

    this._archiveControlElement.addEventListener(`click`, () => {
      this._archiveControlElement.innerHTML = ArchiveButtonText.WAITING;
    });

    this._favoritesControlElement.addEventListener(`click`, () => {
      this._favoritesControlElement.innerHTML = FavoritesButtonText.WAITING;
    });

    return element;
  }

  _getTmpl() {
    return (
      `<div class="card__control">
        ${this._getControls()}
      </div>`
    );
  }
}
