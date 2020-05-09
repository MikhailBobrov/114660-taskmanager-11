import Card from '../components/card';
import CardEdit from '../components/card-edit';
import {renderElement, replaceElement} from '../helpers';

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._toggleProp = this._toggleProp.bind(this);
    this._replaceCardToEdit = this._replaceCardToEdit.bind(this);
    this._replaceEditTocard = this._replaceEditTocard.bind(this);
  }

  setDefaultView() {
    this._replaceEditTocard();
  }

  _toggleProp(prop) {
    const newTaskData = Object.assign(
        {},
        this._taskData,
        {[prop]: !this._taskData[prop]}
    );
    this._onDataChange(this._taskData, newTaskData);
  }

  _replaceCardToEdit() {
    this._onViewChange();
    replaceElement(this._cardComponent, this._cardEditComponent);
  }

  _replaceEditTocard() {
    replaceElement(this._cardEditComponent, this._cardComponent);
  }

  render(taskData) {
    this._taskData = taskData;
    const oldTaskComponent = this._cardComponent;
    const oldTaskEditComponent = this._cardEditComponent;
    this._cardComponent = new Card(taskData);
    this._cardEditComponent = new CardEdit(taskData);

    this._cardComponent.setEditBtnHandler(this._replaceCardToEdit);
    this._cardComponent.setControlsClickHandler(this._toggleProp);
    this._cardEditComponent.setSubmitHandler(this._replaceEditTocard);

    if (oldTaskComponent && oldTaskEditComponent) {
      replaceElement(oldTaskComponent, this._cardComponent);
      replaceElement(oldTaskEditComponent, this._cardEditComponent);
    } else {
      renderElement(this._container, this._cardComponent);
    }
  }
}
