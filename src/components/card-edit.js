import Task from './task';
import TextControl from './task/text-control';
import SettingsControls from './task/settings-controls';
import FormControls from './task/form-controls';
import {createElement, renderElement} from '../helpers';
import {TaskFlag} from '../constants';

export default class CardEdit extends Task {
  constructor(taskData) {
    super(true);

    this._isEdit = true;
    this._taskData = this._copyTaskData(taskData);
    this._isCardChanged = false;

    this._toggleProp = this._toggleProp.bind(this);
    this._toggleDate = this._toggleDate.bind(this);
    this._toggleWeekDay = this._toggleWeekDay.bind(this);
    this._changeColor = this._changeColor.bind(this);
    this._saveText = this._saveText.bind(this);

    this._submitClickHandler = null;
    this._deleteClickHandler = null;
  }

  setSubmitClickHandler(handler) {
    this._formControls.setSubmitClickHandler(handler);
    this._submitClickHandler = handler;
  }

  setDeleteClickHandler(handler) {
    this._formControls.setDeleteClickHandler(handler);
    this._deleteClickHandler = handler;
  }

  reset(taskData) {
    if (!this._isCardChanged) {
      return;
    }

    this._taskData = this._copyTaskData(taskData);
    this._isCardChanged = false;
    this.rerender();
  }

  _setFormControlsEnabledState(params) {
    this._formControls.setFormControlsEnabledState(params);
  }

  _copyTaskData(taskData) {
    const localTaskData = Object.assign(
        {},
        taskData
    );

    localTaskData.weekDays = Object.assign(
        {},
        localTaskData.weekDays
    );

    return localTaskData;
  }

  _toggleProp(prop) {
    this._taskData[prop] = !this._taskData[prop];
    this._isCardChanged = true;
    this.rerender();
  }

  _toggleDate() {
    this._dateIsShown = !this._dateIsShown;
    this._isCardChanged = true;
    this._toggleProp(TaskFlag.IS_REPEAT);
  }

  _toggleWeekDay(value) {
    this._taskData.weekDays[value] = !this._taskData.weekDays[value];
    this._isCardChanged = true;
    this.rerender();
  }

  _changeColor(color) {
    this._taskData.color = color;
    this._isCardChanged = true;
    this.rerender();
  }

  _saveText(text) {
    this._taskData.description = text;
    this._isCardChanged = true;
    this._setFormControlsEnabledState({isTextCorrect: !!text});
  }

  _recoveryListeners() {
    this.setSubmitClickHandler(this._submitClickHandler);
    this.setDeleteClickHandler(this._deleteClickHandler);
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const innerElement = element.querySelector(`.card__inner`);

    this._dateIsShown = !this._taskData.isRepeat;
    this._textControl = new TextControl(this._taskData);
    this._settingsControls = new SettingsControls(this._taskData, {dateIsShown: this._dateIsShown});
    this._formControls = new FormControls(this._taskData);

    renderElement(innerElement, [
      this._getColorbarElement(),
      this._textControl,
      this._settingsControls,
      this._formControls
    ]);

    this._settingsControls.setRepeatClickHandler(this._toggleProp);
    this._settingsControls.setDateClickHandler(this._toggleDate);
    this._settingsControls.setWeekDaysControlsClickHandler(this._toggleWeekDay);
    this._settingsControls.setColorsClickHandler(this._changeColor);
    this._textControl.setTextInputHandler(this._saveText);

    return element;
  }
}
