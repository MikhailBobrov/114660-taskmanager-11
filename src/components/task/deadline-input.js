import flatpickr from 'flatpickr';
import AbstractComponent from '../abstract-component';
import {getDate, getTime} from '../../helpers';

import 'flatpickr/dist/flatpickr.min.css';

export default class DeadlineInput extends AbstractComponent {
  constructor({dueDate}, {dateIsShown}) {
    super();

    this._dueDate = dueDate;
    this._date = getDate(dueDate);
    this._time = getTime(dueDate);
    this._dateIsShown = dateIsShown;
    this._flatpickr = null;

    this._addFlatpickr();
  }

  _addFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._dateIsShown) {
      const dateElement = this.getElement().querySelector(`.card__date`);
      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        allowInput: true,
        defaultDate: this._dueDate || `today`,
        altFormat: `j F H:i`,
        dateFormat: `Y-m-d H:i`,
        // This prop enable time inputs, but breaks flatpickr popup
        // enableTime: true,
      });
    }
  }

  _getTmpl() {
    if (!this._dateIsShown) {
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
