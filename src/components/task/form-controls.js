import AbstractComponent from '../abstract-component';

export default class FormControls extends AbstractComponent {
  constructor(taskData) {
    super();

    const isDateCorrect = this._checkDate(taskData);
    const isRepeatCorrect = this._checkRepeat(taskData);

    this._isEnabled = isDateCorrect && isRepeatCorrect;
  }

  _checkDate({hasDate, dueDate}) {
    if (!hasDate) {
      return true;
    }

    return hasDate && dueDate;
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
