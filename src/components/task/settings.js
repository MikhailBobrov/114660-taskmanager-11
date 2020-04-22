import AbstractComponent from '../abstract-component';
import ColorsControls from './colors-controls';
import WeekDays from './weekdays';
import DeadlineInput from './deadline-input';
import DateText from './date-text';
import DateControls from './date-controls';
import {createElement, renderElement} from '../../helpers';

export default class Settings extends AbstractComponent {
  constructor(taskData) {
    super();

    const {isEdit} = taskData;
    this._isEdit = isEdit;

    this._date = isEdit
      ? new DateControls(taskData)
      : new DateText(taskData);
    this._deadlineInput = new DeadlineInput(taskData);
    this._weekDays = new WeekDays(taskData);
    this._colorsControls = new ColorsControls(taskData);
  }

  _getToggleStatus(value) {
    return value ? `yes` : `no`;
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const datesElement = element.querySelector(`.card__details`);

    renderElement(datesElement, [
      this._date,
      this._colorsControls
    ]);

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
