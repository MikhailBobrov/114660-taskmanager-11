import AbstractComponent from '../abstract-component';
import ColorsControls from './colors-controls';
import DateControls from './date-controls';
import {createElement, renderElement} from '../../helpers';

export default class SettingsControls extends AbstractComponent {
  constructor(taskData, params) {
    super();

    this._dateControls = new DateControls(taskData, params);
    this._colorsControls = new ColorsControls(taskData, params);
  }

  setRepeatClickHandler(handler) {
    this._dateControls.setRepeatClickHandler(handler);
  }

  setDateClickHandler(handler) {
    this._dateControls.setDateClickHandler(handler);
  }

  setWeekDaysControlsClickHandler(handler) {
    this._dateControls.setWeekDaysControlsClickHandler(handler);
  }

  setColorsClickHandler(handler) {
    this._colorsControls.setClickHandler(handler);
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const datesElement = element.querySelector(`.card__details`);

    renderElement(datesElement, [
      this._dateControls,
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
