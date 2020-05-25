import Task from './task';
import TextControl from './task/text-control';
import SettingsControls from './task/settings-controls';
import FormControls from './task/form-controls';
import {createElement, renderElement} from '../helpers';

export default class CardEdit extends Task {
  constructor(taskData) {
    super({isEdit: true});

    this._isEdit = true;
    this._taskData = this._copyTaskData(taskData);
    this._isCardChanged = false;

    this._toggleRepeat = this._toggleRepeat.bind(this);
    this._toggleDate = this._toggleDate.bind(this);
    this._toggleWeekDay = this._toggleWeekDay.bind(this);
    this._changeColor = this._changeColor.bind(this);
    this._changeDueDate = this._changeDueDate.bind(this);
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

  _toggleRepeat() {
    this._taskData.isRepeat = !this._taskData.isRepeat;
    this._taskData.isDeadline = this._getIsDeadline();
    this._isCardChanged = true;
    this.rerender();
  }

  _toggleDate() {
    this._dateIsShown = !this._dateIsShown;
    this._isCardChanged = true;
    this._toggleRepeat();
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

  _getIsDeadline() {
    return !this._taskData.isRepeat && this._taskData.dueDate < new Date();
  }

  _changeDueDate(date) {
    this._taskData.dueDate = new Date(date);
    this._taskData.isDeadline = this._getIsDeadline();
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

    this._settingsControls.setRepeatClickHandler(this._toggleRepeat);
    this._settingsControls.setDateClickHandler(this._toggleDate);
    this._settingsControls.setWeekDaysControlsClickHandler(this._toggleWeekDay);
    this._settingsControls.setColorsClickHandler(this._changeColor);
    this._settingsControls.setDueDateChangeHandler(this._changeDueDate);
    this._textControl.setTextInputHandler(this._saveText);

    return element;
  }
}
