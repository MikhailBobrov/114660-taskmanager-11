import Task from './task';
import Text from './task/text';
import SettingsText from './task/settings-text';
import CardControls from './task/card-controls';
import {createElement, renderElement} from '../helpers';

export default class Card extends Task {
  constructor(taskData) {
    super();

    this._taskData = taskData;
    this._text = new Text(taskData);
    this._settingsText = new SettingsText(taskData);
    this._cardControls = new CardControls(taskData);
  }

  setControlsClickHandler(handler) {
    this._cardControls.setClickHandler(handler);
  }

  setEditBtnHandler(handler) {
    this._cardControls.setEditBtnHandler(handler);
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const innerElement = element.querySelector(`.card__inner`);

    renderElement(innerElement, [
      this._cardControls,
      this._getColorbarElement(),
      this._text,
      this._settingsText
    ]);

    return element;
  }
}
