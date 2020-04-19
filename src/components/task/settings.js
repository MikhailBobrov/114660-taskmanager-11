import AbstractComponent from '../abstract-component';
import ColorsControls from './colors-controls';
import WeekDays from './weekdays';
import DeadlineInput from './deadline-input';
import DateText from './date-text';
import DateControls from './date-controls';
import {getDate, getTime, createElement, renderElement} from '../../helpers';

export default class Settings extends AbstractComponent {
  constructor(data) {
    super();

    const {
      dueDate,
      isRepeat,
      isDeadline,
      isEdit
    } = data;
    this._date = getDate(dueDate);
    this._time = getTime(dueDate);
    this._isRepeat = isRepeat;
    this._isDeadline = isDeadline;
    this._isEdit = isEdit;

    this._dateText = new DateText(data);
    this._dateControls = new DateControls(data);
    this._deadlineInput = new DeadlineInput(data);
    this._weekDays = new WeekDays(data);
    this._colorsControls = new ColorsControls(data);
  }

  _getToggleStatus(value) {
    return value ? `yes` : `no`;
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const datesElement = element.querySelector(`.card__details`);

    if (this._isEdit) {
      renderElement(datesElement, this._dateControls);
    } else {
      renderElement(datesElement, this._dateText);
    }

    renderElement(element, this._colorsControls);

    return element;
  }

  _getTmpl() {
    return (
      `<div class="card__settings">
          <div class="card__details"></div>
      </div>`
    );
  }
}
