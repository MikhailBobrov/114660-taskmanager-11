import AbstractSmartComponent from '../abstract-smart-component';

export default class FormControls extends AbstractSmartComponent {
  constructor(taskData) {
    super();

    this._taskData = taskData;
    this._isDateCorrect = this._checkDate(taskData);
    this._isRepeatCorrect = this._checkRepeat(taskData);
    this._isTextCorrect = taskData.description !== ``;

    this._isEnabled = this._checkIsEnabled();
  }

  setSubmitClickHandler(handler) {
    const control = this.getElement().querySelector(`.card__save`);

    control.addEventListener(`click`, (event) => {
      event.preventDefault();
      handler(this._taskData);
    });

    this._submitClickHandler = handler;
  }

  setDeleteClickHandler(handler) {
    const control = this.getElement().querySelector(`.card__delete`);

    control.addEventListener(`click`, handler);

    this._deleteClickHandler = handler;
  }

  setFormControlsEnabledState({isTextCorrect}) {
    this._isTextCorrect = isTextCorrect;
    this._isEnabled = this._checkIsEnabled();
    this.rerender();
  }

  _checkIsEnabled() {
    return this._isDateCorrect && this._isRepeatCorrect && this._isTextCorrect;
  }

  _recoveryListeners() {
    this.setDeleteClickHandler(this._deleteClickHandler);
    this.setSubmitClickHandler(this._submitClickHandler);
  }

  _checkDate({isRepeat, dueDate}) {
    if (isRepeat || dueDate) {
      return true;
    }

    return false;
  }

  _checkRepeat({isRepeat, weekDays}) {
    if (!isRepeat) {
      return true;
    }

    const hasWeekdays = Object.values(weekDays).some((item) => item);

    return isRepeat && hasWeekdays;
  }

  _getTmpl() {
    const disabledAttr = !this._isEnabled ? `disabled` : ``;

    return (
      `<div class="card__status-btns">
        <button class="card__save" type="submit" ${disabledAttr}>save</button>

        <button class="card__delete" type="button">delete</button>
      </div>`
    );
  }
}
