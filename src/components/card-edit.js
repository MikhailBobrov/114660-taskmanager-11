import Task from './task';
import Text from './task/text';
import SettingsControls from './task/settings-controls';
import FormControls from './task/form-controls';
import {createElement, renderElement} from '../helpers';

export default class CardEdit extends Task {
  constructor(taskData) {
    super();

    this._init(taskData);

    this._text = new Text(taskData);
    this._settings = new SettingsControls(taskData);
    this._formControls = new FormControls(taskData);
  }

  setSubmitHandler(handler) {
    const form = this.getElement().querySelector(`form`);

    form.addEventListener(`submit`, handler);
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const innerElement = element.querySelector(`.card__inner`);

    renderElement(innerElement, [
      this._getColorbarElement(),
      this._text,
      this._settings,
      this._formControls
    ]);

    return element;
  }
}
