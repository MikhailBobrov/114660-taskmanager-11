import AbstractComponent from '../abstract-component';
import {getDate, getTime} from '../../helpers';

export default class DeadlineInput extends AbstractComponent {
  constructor({dueDate, isCreate}) {
    super();

    this._date = getDate(dueDate);
    this._time = getTime(dueDate);

    this._isShown = isCreate || (this._date && this._time);
  }

  _getTmpl() {
    if (!this._isShown) {
      return ``;
    }

    const value = this._date && this._time ? `${this._date} ${this._time}` : ``;

    return (
      `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder="Set date"
            name="date"
            value="${value}"
          />
        </label>
      </fieldset>`
    );
  }
}
