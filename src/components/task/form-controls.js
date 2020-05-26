import AbstractSmartComponent from '../abstract-smart-component';
import {createElement} from '../../helpers';

const DeleteButtonText = {
  DEFAULT: `Delete`,
  WAITING: `Deleting...`
};

const SaveButtonText = {
  DEFAULT: `Save`,
  WAITING: `Saving...`
};

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
    this._saveControlElement.addEventListener(`click`, (event) => {
      event.preventDefault();
      handler(this._taskData);
    });

    this._submitClickHandler = handler;
  }

  setDeleteClickHandler(handler) {
    this._deleteControlElement.addEventListener(`click`, handler);

    this._deleteClickHandler = handler;
  }

  setFormControlsEnabledState({isTextCorrect}) {
    this._isTextCorrect = isTextCorrect;
    this._isEnabled = this._checkIsEnabled();
    this.rerender();
  }

  freeze() {
    this._saveControlElement.innerHTML = SaveButtonText.WAITING;
    this._deleteControlElement.innerHTML = DeleteButtonText.WAITING;
  }

  unfreeze() {
    this._saveControlElement.innerHTML = SaveButtonText.DEFAULT;
    this._deleteControlElement.innerHTML = DeleteButtonText.DEFAULT;
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

  _createElement() {
    const element = createElement(this._getTmpl());

    this._saveControlElement = element.querySelector(`.card__save`);
    this._deleteControlElement = element.querySelector(`.card__delete`);

    return element;
  }

  _getTmpl() {
    const disabledAttr = !this._isEnabled ? `disabled` : ``;

    return (
      `<div class="card__status-btns">
        <button class="card__save" type="submit" ${disabledAttr}>
          ${SaveButtonText.DEFAULT}
        </button>

        <button class="card__delete" type="button">
          ${DeleteButtonText.DEFAULT}
        </button>
      </div>`
    );
  }
}
