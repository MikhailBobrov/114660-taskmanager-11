import AbstractComponent from '../abstract-component';
import DeadlineInput from './deadline-input';
import WeekDays from './weekdays';
import {getDate, getTime, createElement, renderElement} from '../../helpers';

export default class DateControls extends AbstractComponent {
  constructor(taskData) {
    super();

    const {dueDate, isDeadline, isRepeat} = taskData;
    this._isDeadline = isDeadline;
    this._hasDate = !!dueDate;
    this._isRepeat = isRepeat;
    this._date = getDate(dueDate);
    this._time = getTime(dueDate);
    this._deadlineInput = new DeadlineInput(taskData);
    this._weekDays = new WeekDays(taskData);
  }

  setToggleDateHandler(handler) {
    const control = this.getElement().querySelector(`.card__date-deadline-toggle`);

    control.addEventListener(`click`, handler);
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
    const deadlineBtn = this._getBtnElement({
      id: `date-deadline`,
      value: this._hasDate,
      text: `date`
    });
    const repeatBtn = this._getBtnElement({
      id: `repeat`,
      value: this._isRepeat,
      text: `repeat`
    });

    renderElement(element, [
      deadlineBtn,
      this._deadlineInput,
      repeatBtn,
      this._weekDays
    ]);

    return element;
  }

  _getTmpl() {
    return (
      `<div class="card__dates"></div>`
    );
  }
}
