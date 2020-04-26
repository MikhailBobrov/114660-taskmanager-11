import AbstractComponent from '../abstract-component';
import ColorsControls from './colors-controls';
import DateControls from './date-controls';
import {createElement, renderElement} from '../../helpers';

export default class SettingsControls extends AbstractComponent {
  constructor(taskData) {
    super();

    this._dateControls = new DateControls(taskData);
    this._colorsControls = new ColorsControls(taskData);
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
