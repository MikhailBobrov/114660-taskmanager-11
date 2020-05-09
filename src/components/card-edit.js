import Task from './task';
import Text from './task/text';
import SettingsControls from './task/settings-controls';
import FormControls from './task/form-controls';
import {createElement, renderElement} from '../helpers';

export default class CardEdit extends Task {
  constructor(taskData) {
    super();

    const editTaskData = {dateIsShown: !!taskData.dueDate};
    this._taskData = Object.assign({}, taskData, editTaskData);

    this._init(this._taskData);

    this._text = new Text(this._taskData);
    this._settingsControls = new SettingsControls(this._taskData);
    this._formControls = new FormControls(this._taskData);

    this._toggleProp = this._toggleProp.bind(this);
    this._changeColor = this._changeColor.bind(this);
    this._toggleWeekDay = this._toggleWeekDay.bind(this);

    this._submitHandler = null;

    this._addEvents();
  }

  _recoveryListeners() {
    this._addEvents();
    this.setSubmitHandler(this._submitHandler);
  }

  setSubmitHandler(handler) {
    const form = this.getElement().querySelector(`form`);

    form.addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const innerElement = element.querySelector(`.card__inner`);

    renderElement(innerElement, [
      this._getColorbarElement(),
      this._text,
      this._settingsControls,
      this._formControls
    ]);

    return element;
  }

  _update() {
    this._settingsControls = new SettingsControls(this._taskData);
    this._init(this._taskData);
    this._formControls = new FormControls(this._taskData);

    this.rerender();
  }

  _toggleProp(prop) {
    this._taskData = Object.assign(
        this._taskData,
        {[prop]: !this._taskData[prop]}
    );

    if (this._taskData.isRepeat) {
      this._taskData.dateIsShown = false;
    }

    this._update();
  }

  _changeColor(color) {
    this._taskData = Object.assign(
        {},
        this._taskData,
        {color}
    );

    this._update();
  }

  _toggleWeekDay(value) {
    this._taskData.weekDays[value] = !this._taskData.weekDays[value];

    this._update();
  }

  _addEvents() {
    this._settingsControls.setDateControlsClickHandler(this._toggleProp);
    this._settingsControls.setWeekDaysControlsClickHandler(this._toggleWeekDay);
    this._settingsControls.setColorControlsClickHandler(this._changeColor);
  }
}
