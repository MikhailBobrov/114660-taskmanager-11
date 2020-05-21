import TaskController from './task';
import SortController from './sort';
import BoardComponent from '../components/board';
import MoreBtn from '../components/more-btn';
import {MAX_CARDS_SHOW, FilterType, FiltersFlags} from '../constants';
import {createElement, renderElement, replaceElement} from '../helpers';

export default class BoardController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._quantityLoaded = 0;
    this._moreBtn = new MoreBtn();
    this._tasksControllers = [];
    this._emptyBoardElement = createElement(`<p class="board__no-tasks">
        Click «ADD NEW TASK» in menu to create your first task
      </p>`);

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
    this._tasksModel.addSortChangeHandler(this._onSortChange);
  }

  _onViewChange() {
    const taskIndexToReset = this._tasksControllers.findIndex(item => item === this._newTaskController);

    if (taskIndexToReset > -1) {
      this._tasksControllers.splice(taskIndexToReset, 1);
      this._resetNewTask();
    }

    this._tasksControllers.forEach((item) => {
      item.setDefaultView();
    });
  }

  _onFilterChange() {
    this._updateBoard();
  }

  _onSortChange() {
    this._updateBoard();
  }

  _moreBtnClickHandler() {
    this._loadMore();
  }

  addNewTask() {
    if (this._newTaskController) {
      return;
    }

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

    this._newTaskController.destroy();
    this._newTaskController = null;
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

  _renderTasks(quantity) {
    const tasks = this._getTasks(quantity);

    if(tasks.length > 0) {
      this._emptyBoardElement.replaceWith(this._tasksSection);
    }
    else {
      this._tasksSection.replaceWith(this._emptyBoardElement);
    }

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

    if (currentFilter === FilterType.ALL) {
      return false;
    }

    const filterPropName = FiltersFlags[currentFilter];
    const isNeedToUpdateFiltered = oldData[filterPropName] !== newData[filterPropName];
    this._isNeedToHideUpdatedCard = isNeedToUpdateFiltered && newData[filterPropName] === false;
    return isNeedToUpdateFiltered;
  }

  _updateBoardOnSuccess(oldData, newData) {
    this._isNeedToUpdateFiltered = this._checkIsNeedToUpdateFiltered(oldData, newData);
    const index = this._tasksControllers.findIndex((item) => item.taskData.id === oldData.id);

    if (index > -1 && newData) {
      this._tasksControllers[index].render(newData);
    }
    else {
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
    console.log('\n\n_updateTask');
    let isSuccess = false;
    console.log('oldData', oldData);
    console.log('newData', newData);

    if(!newData) {
      // remove task
      isSuccess = this._tasksModel.removeTask(oldData.id);
    }
    else if (!oldData.id) {
      // add task
      isSuccess = this._tasksModel.addTask(newData);
      this._resetNewTask();
      console.log('this._tasksModel', this._tasksModel);
    }
    else {
      // update task
      isSuccess = this._tasksModel.updateTask(oldData.id, newData);
    }

    if (!isSuccess) {
      return;
    }

    this._updateBoardOnSuccess(oldData, newData);
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

  render() {
    const oldBoardComponent = this._boardComponent;
    this._boardComponent = new BoardComponent();
    const boardElement = this._boardComponent.getElement();
    this._sortController = new SortController(boardElement, this._tasksModel);
    this._tasksSection = createElement(`<div class="board__tasks"></div>`);

    if (this._tasksModel.getTasksQuantity() > 0) {
      this._tasksControllers = this._renderTasks();
      this._sortController.render();

      renderElement(boardElement, [
        this._tasksSection,
        this._moreBtn
      ]);
    }
    else {
      renderElement(boardElement, this._emptyBoardElement);
    }

    if (oldBoardComponent) {
      replaceElement(oldBoardComponent, this._boardComponent);
    } else {
      renderElement(this._container, this._boardComponent);
    }
  }
}
