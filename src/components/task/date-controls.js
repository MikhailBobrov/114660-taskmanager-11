import AbstractComponent from '../abstract-component';
import DeadlineInput from './deadline-input';
import WeekDays from './weekdays';
import {getDate, getTime, createElement, renderElement} from '../../helpers';

export default class DateControls extends AbstractComponent {
  constructor(data) {
    super();

    const {isEdit, dueDate, isDeadline, isRepeat} = data;
    this._isEdit = isEdit;
    this._isDeadline = isDeadline;
    this._isRepeat = isRepeat;
    this._date = getDate(dueDate);
    this._time = getTime(dueDate);
    this._deadlineInput = new DeadlineInput(data);
    this._weekDays = new WeekDays(data);
    this._isShown = this._isEdit;
  }

  _getToggleStatus(value) {
    return value ? `yes` : `no`;
  }

  _getBtnElement({id, value, text}) {
    const markup = `<button class="card__${id}-toggle" type="button">
      ${text}: <span class="card__${id}-status">
        ${this._getToggleStatus(value)}
      </span>
    </button>`;

    return createElement(markup);
  }

  _createElement() {
    const element = createElement(this._getTmpl());

    renderElement(element, this._getBtnElement({
      id: `date-deadline`,
      value: this._isDeadline,
      text: `date`
    }));
    renderElement(element, this._deadlineInput);
    renderElement(element, this._getBtnElement({
      id: `repeat`,
      value: this._isRepeat,
      text: `repeat`
    }));
    renderElement(element, this._weekDays);

    return element;
  }

  _getTmpl() {
    if (!this._isShown) {
      return ``;
    }

    return (
      `<div class="card__dates"></div>`
    );
  }
}
