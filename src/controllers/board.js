import TaskController from './task';
import SortController from './sort';
import BoardComponent from '../components/board';
import MoreBtn from '../components/more-btn';
import {MAX_CARDS_SHOW, FiltersFlags, FilterType, AppState} from '../constants';
import {createElement, renderElement, replaceElement} from '../helpers';

export default class BoardController {
  constructor(container, tasksModel, api) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._api = api;
    this._quantityLoaded = 0;
    this._moreBtn = new MoreBtn();
    this._tasksControllers = [];
    this._isBoardEmpty = false;

    this._tasksSection = createElement(`<div class="board__tasks"></div>`);

    this._moreBtnClickHandler = this._moreBtnClickHandler.bind(this);
    this._moreBtn.setClickHandler(this._moreBtnClickHandler);

    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._updateTask = this._updateTask.bind(this);
    this._updateBoardOnFormSave = this._updateBoardOnFormSave.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this._resetNewTask = this._resetNewTask.bind(this);

    this._tasksModel.addFilterChangeHandler(this._onFilterChange);
    this._tasksModel.addSortChangeHandler(this._onSortChange);
  }

  hide() {
    this._boardComponent.hide();
    this._resetBoard();
  }

  show() {
    this._boardComponent.show();
  }

  _onViewChange() {
    const taskIndexToReset = this._tasksControllers.findIndex((item) => item === this._newTaskController);

    if (taskIndexToReset > -1) {
      this._tasksControllers.splice(taskIndexToReset, 1);
      this._resetNewTask();
    }

    this._tasksControllers.forEach((item) => {
      item.setDefaultView();
    });
  }

  _onFilterChange() {
    this._resetNewTask();
    this._updateBoard();
  }

  _onSortChange() {
    this._resetNewTask();
    this._updateBoard();
  }

  _moreBtnClickHandler() {
    this._loadMore();
  }

  addNewTask() {
    if (this._newTaskController) {
      return;
    }

    this._recoverTaskSection(1);

    this._tasksModel.setFilterType(FilterType.ALL);

    this._newTaskController = new TaskController(
        this._tasksSection,
        this._updateTask,
        this._resetNewTask,
        this._updateBoardOnFormSave,
        this._onViewChange
    );
    this._newTaskController.render();

    this._tasksControllers.push(this._newTaskController);
  }

  _resetNewTask() {
    if (!this._newTaskController) {
      return;
    }

    this._recoverTaskSection(this._tasksControllers.length);

    this._newTaskController.destroy();
    this._newTaskController = null;
  }

  _resetBoard() {
    this._tasksModel.setFilterType(FilterType.ALL);
  }

  _loadMore() {
    const newTasksControllers = this._renderTasks();
    this._tasksControllers = this._tasksControllers.concat(newTasksControllers);
  }

  _getTasks(quantity = MAX_CARDS_SHOW) {
    const tasks = this._tasksModel.getTasks();
    const nextLoadStart = this._quantityLoaded + quantity;
    const tasksToShow = tasks.slice(this._quantityLoaded, nextLoadStart);
    this._quantityLoaded = nextLoadStart;

    if (this._quantityLoaded >= tasks.length) {
      this._moreBtn.hide();
    } else {
      this._moreBtn.show();
    }

    return tasksToShow;
  }

  _recoverTaskSection(quantity) {
    if (this._isBoardEmpty && quantity > 0) {
      this._sortController.show();
      this._tasksSection.hidden = false;
      this._emptyBoardElement.hidden = true;
      this._isBoardEmpty = false;
    } else if (quantity === 0) {
      this._tasksSection.hidden = true;
      this._emptyBoardElement.hidden = false;
      this._sortController.hide();
      this._isBoardEmpty = true;
    }
  }

  _renderTasks(quantity) {
    const tasks = this._getTasks(quantity);

    this._recoverTaskSection(tasks.length);

    return tasks.map((taskData) => {
      const taskController = new TaskController(
          this._tasksSection,
          this._updateTask,
          this._resetNewTask,
          this._updateBoardOnFormSave,
          this._onViewChange
      );
      taskController.render(taskData);
      return taskController;
    });
  }

  _checkIsNeedToUpdateFiltered(oldData, newData) {
    if (!newData) {
      return true;
    }
    const currentFilter = this._tasksModel.getFilterType();
    const filterPropName = FiltersFlags[currentFilter];
    const isNeedToUpdateFiltered = oldData[filterPropName] !== newData[filterPropName];
    this._isNeedToHideUpdatedCard = isNeedToUpdateFiltered && newData[filterPropName] === false;
    return isNeedToUpdateFiltered;
  }

  _updateBoardOnSuccess(isSuccess, oldData, newData) {
    if (!isSuccess) {
      return;
    }

    this._isNeedToUpdateFiltered = this._checkIsNeedToUpdateFiltered(oldData, newData);
    const index = this._tasksControllers.findIndex((item) => item.taskData.id === oldData.id);

    if (index > -1 && newData) {
      this._tasksControllers[index].render(newData);
    } else {
      this._updateBoard(this._quantityLoaded);
    }

    if (this._isNeedToUpdateFiltered) {
      const openedControllers = this._tasksControllers.filter((item) => item.isCardEditOpened);

      if (openedControllers.length === 0) {
        this._updateBoard(this._quantityLoaded);
      }
    }
  }

  _updateTask(oldData, newData) {
    let isSuccess = false;

    if (!newData) {
      // remove task
      isSuccess = this._tasksModel.removeTask(oldData.id);

      this._updateBoardOnSuccess(isSuccess, oldData, newData);

    } else if (!oldData.id) {
      // add task

      isSuccess = this._tasksModel.addTask(newData);
      this._resetNewTask();

      this._updateBoardOnSuccess(isSuccess, oldData, newData);
    } else {
      // update task
      this._api.updateTask(oldData.id, newData)
        .then((taskModel) => {
          isSuccess = this._tasksModel.updateTask(oldData.id, taskModel);

          this._updateBoardOnSuccess(isSuccess, oldData, newData);
        });
    }
  }

  _updateBoardOnFormSave() {
    this._updateBoard(this._quantityLoaded);
  }

  _removeControllers() {
    this._tasksControllers.forEach((item) => {
      item.destroy();
    });

    this._tasksControllers = [];
  }

  _updateBoard(quantity) {
    this._removeControllers();
    this._quantityLoaded = 0;
    this._tasksControllers = this._renderTasks(quantity);
  }

  _getEmptyBoardElement(state) {
    let text = `Click «ADD NEW TASK» in menu to create your first task`;

    if (state === AppState.LOADING) {
      text = `Loading...`;
    }

    return createElement(`<p class="board__no-tasks">${text}</p>`);
  }

  render({state} = {}) {
    const oldBoardComponent = this._boardComponent;
    this._boardComponent = new BoardComponent();
    const boardElement = this._boardComponent.getElement();
    this._sortController = new SortController(boardElement, this._tasksModel);
    this._emptyBoardElement = this._getEmptyBoardElement(state);

    this._sortController.render();

    if (this._tasksModel.getTasksQuantity() > 0) {
      this._tasksControllers = this._renderTasks();
      this._isBoardEmpty = false;
    } else {
      this._isBoardEmpty = true;
      this._sortController.hide();
      this._moreBtn.hide();
      this._tasksSection.hidden = true;
    }

    renderElement(boardElement, [
      this._tasksSection,
      this._emptyBoardElement,
      this._moreBtn
    ]);

    if (oldBoardComponent) {
      replaceElement(oldBoardComponent, this._boardComponent);
    } else {
      renderElement(this._container, this._boardComponent);
    }
  }
}
