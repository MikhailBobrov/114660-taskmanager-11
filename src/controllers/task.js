import Card from '../components/card';
import CardEdit from '../components/card-edit';
import {renderElement, replaceElement} from '../helpers';

export default class TaskController {
  constructor(container) {
    this._container = container;

    this._replaceCardToEdit = this._replaceCardToEdit.bind(this);
    this._replaceEditTocard = this._replaceEditTocard.bind(this);
  }

  _replaceCardToEdit() {
    replaceElement(this._cardComponent, this._cardEditComponent);
  }

  _replaceEditTocard() {
    replaceElement(this._cardEditComponent, this._cardComponent);
  }

  render(taskData) {
    this._cardComponent = new Card(taskData);
    taskData.isEdit = true;
    this._cardEditComponent = new CardEdit(taskData);

    this._cardComponent.setEditBtnHandler(this._replaceCardToEdit);
    this._cardEditComponent.setSubmitHandler(this._replaceEditTocard);

    renderElement(this._container, this._cardComponent);
  }
}
