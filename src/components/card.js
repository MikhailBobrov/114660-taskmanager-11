import Task from './task';
import CardControls from './task/card-controls';

export default class Card extends Task {
  constructor(taskData) {
    super();

    this._init(taskData);

    this._cardControls = new CardControls(taskData);
  }

  setControlsClickHandler(handler) {
    this._cardControls.setClickHandler(handler);
  }

  setEditBtnHandler(handler) {
    this._cardControls.setEditBtnHandler(handler);
  }
}
