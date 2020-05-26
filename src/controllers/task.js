import TaskModel from '../models/task';
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
  constructor(container, tasksModel, api, updateBoardOnSuccess, resetNewTask, onViewChange) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._api = api;
    this._resetNewTask = resetNewTask;
    this._updateBoardOnSuccess = updateBoardOnSuccess;
    this._onViewChange = onViewChange;
    this._isCardOpened = false;

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
    this._isCardOpened = false;
  }

  destroy() {
    removeElement(this._cardComponent);
    removeElement(this._cardEditComponent);
  }

  _toggleProp(prop) {
    const newTaskData = TaskModel.clone(this.taskData);
    newTaskData[prop] = !newTaskData[prop];

    this._updateTask(this.taskData, newTaskData);
  }

  _replaceCardToEdit() {
    this._onViewChange();
    replaceElement(this._cardComponent, this._cardEditComponent);
    this._setCardEditComponentHandlers();
    this._isCardOpened = true;

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToCard() {
    replaceElement(this._cardEditComponent, this._cardComponent);
    this._isCardOpened = false;

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _resetDatesData(newTaskData) {
    if (!newTaskData.isRepeat) {
      newTaskData.weekDays = Object.assign({}, WEEKDAYS);
    } else {
      newTaskData.dueDate = null;
    }

    return newTaskData;
  }

  _saveCard(newTaskData) {
    const taskData = this._resetDatesData(newTaskData);
    this._updateTask(this.taskData, taskData);
  }

  _deleteCard() {
    if (!this.taskData.id) {
      this._resetNewTask();
      return;
    }

    this._updateTask(this.taskData, null);
  }

  _freezeCard() {
    if (this._isCardOpened) {
      this._cardEditComponent.freeze();
      return;
    }

    this._cardComponent.freeze();
  }

  _unFreezeCard() {
    if (this._isCardOpened) {
      this._cardEditComponent.unfreeze();
      return;
    }

    this._cardComponent.unfreeze();
  }

  _updateTask(oldData, newData) {
    let isSuccess = false;
    this._freezeCard();

    if (!newData) {
      // remove task
      this._api.deleteTask(oldData.id)
        .then(() => {
          isSuccess = this._tasksModel.removeTask(oldData.id);

          this._updateBoardOnSuccess(isSuccess, oldData);
        })
        .catch(() => {
          this._cardEditComponent.highlightOnError();
          this._unFreezeCard();
        });
    } else if (!oldData.id) {
      // add task
      this._api.addTask(newData)
        .then((taskModel) => {
          isSuccess = this._tasksModel.addTask(taskModel);
          this._resetNewTask();

          this._updateBoardOnSuccess(isSuccess, oldData, taskModel);
        })
        .catch(() => {
          this._cardEditComponent.highlightOnError();
          this._unFreezeCard();
        });
    } else {
      // update task
      this._api.updateTask(oldData.id, newData)
        .then((taskModel) => {
          isSuccess = this._tasksModel.updateTask(oldData.id, taskModel);

          this._replaceEditToCard();
          this._updateBoardOnSuccess(isSuccess, oldData, taskModel);
        })
        .catch(() => {
          if (this._isCardOpened) {
            this._cardEditComponent.highlightOnError();
          } else {
            this._cardComponent.highlightOnError();
          }

          this._unFreezeCard();
        });
    }
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
      taskData = TaskModel.objectToTask(EMPTY_TASK_DATA);
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
