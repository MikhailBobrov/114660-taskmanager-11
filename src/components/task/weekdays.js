import {getHandlerWithValue} from '../../helpers';
import AbstractComponent from '../abstract-component';

export default class WeekDays extends AbstractComponent {
  constructor({weekDays, isRepeat}) {
    super();

    this._weekDays = weekDays;
    this._isShown = true;

    if (!isRepeat ||
        (!weekDays || weekDays.length === 0)) {
      this._isShown = false;
    }
  }

  setClickHandler(handler) {
    if (!this._isShown) {
      return;
    }

    const clickHandler = getHandlerWithValue(`.card__repeat-day-input`, handler);
    this.getElement().addEventListener(`click`, clickHandler);
  }

  _getDayMarkup({name, isChecked}) {
    const checkedAttr = isChecked ? `checked` : ``;

    return (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${name}"
        name="repeat"
        value="${name}"
        ${checkedAttr}
      />
      <label
        class="card__repeat-day"
        for="repeat-${name}"
      >${name}</label>`
    );
  }

  _getTmpl() {
    if (!this._isShown) {
      return ``;
    }

    const weekDaysMarkupList = Object.entries(this._weekDays)
      .map(([name, isChecked]) => {
        return this._getDayMarkup({name, isChecked});
      });

    return (
      `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${weekDaysMarkupList.join(``)}
        </div>
      </fieldset>`
    );
  }
}

