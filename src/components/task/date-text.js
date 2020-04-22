import AbstractComponent from '../abstract-component';
import {getDate, getTime} from '../../helpers';

export default class DateText extends AbstractComponent {
  constructor({isEdit, dueDate}) {
    super();

    this._isEdit = isEdit;
    this._date = getDate(dueDate);
    this._time = getTime(dueDate);
    this._isShown = !this._isEdit && this._date && this._time;
  }

  _getTmpl() {
    if (!this._isShown) {
      return ``;
    }

    return (
      `<div class="card__dates">
        <div class="card__date-deadline">
          <p class="card__input-deadline-wrap">
            <span class="card__date">${this._date}</span>

            <span class="card__time">${this._time}</span>
          </p>
        </div>
      </div>`
    );
  }
}
