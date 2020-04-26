import AbstractComponent from '../abstract-component';
import DeadlineInput from './deadline-input';
import WeekDays from './weekdays';
import {getDate, getTime, createElement, renderElement, getHandlerWithProp} from '../../helpers';

export default class DateControls extends AbstractComponent {
  constructor(taskData) {
    super();

    const {dueDate, dateIsShown, isDeadline, isRepeat} = taskData;
    this._isDeadline = isDeadline;
    this._dateIsShown = dateIsShown;
    this._isRepeat = isRepeat;
    this._date = getDate(dueDate);
    this._time = getTime(dueDate);
    this._deadlineInput = new DeadlineInput(taskData);
    this._weekDays = new WeekDays(taskData);
  }

  setDateControlsClickHandler(handler) {
    const clickHandler = getHandlerWithProp(`button`, handler);
    this.getElement().addEventListener(`click`, clickHandler);
  }

  setWeekDaysControlsClickHandler(handler) {
    this._weekDays.setClickHandler(handler);
  }

  _getToggleStatus(value) {
    return value ? `yes` : `no`;
  }

  _getBtnElement({id, prop, text}) {
    const markup = `<button
      class="card__${id}-toggle"
      type="button"
      data-prop="${prop}"
      >
      ${text}: <span class="card__${id}-status">
        ${this._getToggleStatus(this[`_${prop}`])}
      </span>
    </button>`;

    return createElement(markup);
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const deadlineBtn = this._getBtnElement({
      id: `date-deadline`,
      prop: `dateIsShown`,
      text: `date`
    });
    const repeatBtn = this._getBtnElement({
      id: `repeat`,
      prop: `isRepeat`,
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
