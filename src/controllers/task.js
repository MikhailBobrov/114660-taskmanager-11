import Card from '../components/card';
import CardEdit from '../components/card-edit';
import {renderElement, replaceElement, removeElement} from '../helpers';
import {ColorName, WEEKDAYS, RenderPosition} from '../constants';

const EMPTY_TASK_DATA = {
  id: null,
  description: ``,
  dueDate: ``,
  weekDays: Object.assign({}, WEEKDAYS),
  color: ColorName.BLACK,
  isRepeat: false,
  isFavorite: false,
  isArchive: false,
  isDeadline: false,
};
export default class TaskController {
  constructor(container, updateTask, resetNewTask, onViewChange) {
    this._container = container;
    this._updateTask = updateTask;
    this._resetNewTask = resetNewTask;
    this._onViewChange = onViewChange;

    this._toggleProp = this._toggleProp.bind(this);
    this._replaceCardToEdit = this._replaceCardToEdit.bind(this);
    this._replaceEditToCard = this._replaceEditToCard.bind(this);
    this._saveCard = this._saveCard.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  setDefaultView() {
    this._cardEditComponent.reset(this.taskData);
    this._replaceEditToCard();
  }

  destroy() {
    removeElement(this._cardComponent);
    removeElement(this._cardEditComponent);
  }

  _toggleProp(prop) {
    const newTaskData = Object.assign(
        {},
        this.taskData,
        {[prop]: !this.taskData[prop]}
    );

    this._updateTask(this.taskData, newTaskData);
  }

  _replaceCardToEdit() {
    this._onViewChange();
    replaceElement(this._cardComponent, this._cardEditComponent);
    this._setCardEditComponentHandlers();

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToCard() {
    replaceElement(this._cardEditComponent, this._cardComponent);

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _saveCard(newTaskData) {
    this._replaceEditToCard();
    this._updateTask(this.taskData, newTaskData);
  }

  _deleteCard() {
    this._updateTask(this.taskData, null);
  }

  _setCardComponentHandlers() {
    this._cardComponent.setEditBtnHandler(this._replaceCardToEdit);
    this._cardComponent.setControlsClickHandler(this._toggleProp);
  }

  _setCardEditComponentHandlers() {
    this._cardEditComponent.setSubmitClickHandler(this._saveCard);
    this._cardEditComponent.setDeleteClickHandler(this._deleteCard);
  }

  _onEscKeyDown(event) {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      if (this.taskData.id) {
        this.setDefaultView();
      } else {
        this._resetNewTask();
      }
    }
  }

  render(taskData) {
    let renderPosition = RenderPosition.END;
    let isCreate = false;

    if (!taskData) {
      isCreate = true;
      taskData = Object.assign({}, EMPTY_TASK_DATA);
      renderPosition = RenderPosition.BEGIN;
    }

    this.taskData = taskData;
    const oldTaskComponent = this._cardComponent;
    const oldTaskEditComponent = this._cardEditComponent;
    this._cardComponent = new Card(taskData);
    this._cardEditComponent = new CardEdit(taskData);

    if (oldTaskComponent) {
      replaceElement(oldTaskComponent, this._cardComponent);
      replaceElement(oldTaskEditComponent, this._cardEditComponent);
    } else {
      renderElement(this._container, this._cardComponent, renderPosition);
    }

    if (isCreate) {
      this._replaceCardToEdit();
    }

    this._setCardComponentHandlers();
  }
}
