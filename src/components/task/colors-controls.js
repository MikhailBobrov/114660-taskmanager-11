import AbstractComponent from '../abstract-component';
import {getHandlerWithValue} from '../../helpers';
import {COLORS_NAMES} from '../../constants';

export default class ColorsControls extends AbstractComponent {
  constructor({color}) {
    super();

    this._color = color;
  }

  setClickHandler(handler) {
    const clickHandler = getHandlerWithValue(`.card__color-input`, handler);
    this.getElement().addEventListener(`click`, clickHandler);
  }

  _getColorMarkup(name) {
    const checkedAttr = name === this._color ? `checked` : ``;

    return (
      `<input
        type="radio"
        id="color-${name}"
        class="card__color-input card__color-input--${name} visually-hidden"
        name="color"
        value="${name}"
        ${checkedAttr}
      />
      <label
        for="color-${name}"
        class="card__color card__color--${name}"
        >${name}</label
      >`
    );
  }

  _getTmpl() {
    const colorsMarkupList = COLORS_NAMES.map((color) => {
      return this._getColorMarkup(color);
    });

    return (
      `<div class="card__colors-inner">
        <h3 class="card__colors-title">Color</h3>

        <div class="card__colors-wrap">
          ${colorsMarkupList.join(``)}
        </div>
      </div>`
    );
  }
}
