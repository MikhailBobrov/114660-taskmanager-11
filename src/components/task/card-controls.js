import AbstractComponent from '../abstract-component';
import {getHandlerWithProp} from '../../helpers';
import {TaskFlags} from '../../constants';

const ClassName = {
  DEFAULT: `card__btn`,
  DISABLED: `card__btn--disabled`,
  EDIT: `card__btn--edit`
};

const CONTROLS_DATA = [
  {
    name: `edit`
  },
  {
    name: `archive`,
    prop: TaskFlags.IS_ARCHIVE
  },
  {
    name: `favorites`,
    prop: TaskFlags.IS_FAVORITE
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

  _getTmpl() {
    return (
      `<div class="card__control">
        ${this._getControls()}
      </div>`
    );
  }
}
