import Task from './task';
import TextControl from './task/text-control';
import SettingsControls from './task/settings-controls';
import FormControls from './task/form-controls';
import {createElement, renderElement} from '../helpers';

export default class CardEdit extends Task {
  constructor(taskData, toggleProp) {
    super();

    this._isEdit = true;
    this._taskData = taskData;
    this._toggleProp = toggleProp;

    this._dateIsShown = !taskData.isRepeat;

    this._init(this._taskData, this._isEdit);

    this._textControl = new TextControl(this._taskData);
    this._settingsControls = new SettingsControls(this._taskData, {dateIsShown: this._dateIsShown});
    this._formControls = new FormControls(this._taskData);

    this._toggleProp = this._toggleProp.bind(this);
    this._toggleDate = this._toggleDate.bind(this);

    this._submitHandler = null;
  }

  setSubmitHandler(handler) {
    const form = this.getElement().querySelector(`form`);

    form.addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setColorsClickHandler(handler) {
    this._settingsControls.setColorsClickHandler(handler);
  }

  setWeekDaysControlsClickHandler(handler) {
    this._settingsControls.setWeekDaysControlsClickHandler(handler);
  }

  setRepeatClickHandler(handler) {
    this._settingsControls.setRepeatClickHandler(handler);
  }

  setTextInputHandler(handler) {
    this._textControl.setTextInputHandler(handler);
  }

  setFormControlsEnabledState(state) {
    this._formControls.setFormControlsEnabledState(state);
  }

  _toggleDate() {
    this._dateIsShown = !this._dateIsShown;
    this._toggleProp(`isRepeat`);
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const innerElement = element.querySelector(`.card__inner`);

    renderElement(innerElement, [
      this._getColorbarElement(),
      this._textControl,
      this._settingsControls,
      this._formControls
    ]);

    this._settingsControls.setDateClickHandler(this._toggleDate);

    return element;
  }
}
