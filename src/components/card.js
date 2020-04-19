import Task from './task';
import CardControls from './task/card-controls';

export default class Card extends Task {
  constructor(data) {
    super();

    this._init(data);

    this._cardControls = new CardControls(data);
  }

  setEditBtnHandler(handler) {
    this._cardControls.setEditBtnHandler(handler);
  }
}
