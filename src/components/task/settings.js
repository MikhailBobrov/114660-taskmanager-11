import AbstractComponent from '../abstract-component';
import ColorsControls from './colors-controls';
import WeekDays from './weekdays';
import DeadlineInput from './deadline-input';
import DateText from './date-text';
import DateControls from './date-controls';
import {createElement, renderElement} from '../../helpers';

export default class Settings extends AbstractComponent {
  constructor(data) {
    super();

    const {isEdit} = data;
    this._isEdit = isEdit;

    this._date = isEdit
      ? new DateControls(data)
      : new DateText(data);
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
