import AbstractComponent from '../abstract-component';
import {getHandlerWithProp} from '../../helpers';
import {TaskFlags} from '../../constants';

const classes = {
  default: `card__btn`,
  disabled: `card__btn--disabled`,
  edit: `card__btn--edit`
};

const controls = [
  {
    name: `edit`
  },
  {
    name: `archive`,
    prop: TaskFlags.IS_ARCHIVE
  },
  {
    name: `favorites`,
    prop: TaskFlags.IS_FAVORITES
  }
];

export default class CardControls extends AbstractComponent {
  constructor({isArchive, isFavorite}) {
    super();

    this._isArchive = isArchive;
    this._isFavorite = isFavorite;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, getHandlerWithProp(`.${classes.default}`, handler));
  }

  setEditBtnHandler(handler) {
    const control = this.getElement().querySelector(`.${classes.edit}`);

    control.addEventListener(`click`, handler);
  }

  _getControls() {
    return controls.reduce((prev, item) => {
      const {name, prop} = item;
      const dataAttr = prop ? `data-prop="${prop}"` : ``;
      let className = `${classes.default} ${classes.default}--${name}`;

      if (this[`_${prop}`] === false) {
        className += ` ${classes.disabled}`;
      }

      return `${prev} <button type="button"
          class="${className}"
          ${dataAttr}
        >
          ${name}
        </button>`;
    }, ``);
  }

  _getTmpl() {
    return (
      `<div class="card__control">
        ${this._getControls()}
      </div>`
    );
  }
}
