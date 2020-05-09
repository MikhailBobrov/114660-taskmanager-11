import AbstractSmartComponent from '../abstract-smart-component';

export default class FormControls extends AbstractSmartComponent {
  constructor(taskData) {
    super();

    const isDateCorrect = this._checkDate(taskData);
    const isRepeatCorrect = this._checkRepeat(taskData);
    const isTextCorrect = taskData.description;

    this._isEnabled = isDateCorrect && isRepeatCorrect && isTextCorrect;
  }

  setFormControlsEnabledState(state) {
    this._isEnabled = state;
    this.rerender();
  }

  _recoveryListeners() {

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
