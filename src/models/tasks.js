import {FilterType, SortType} from '../constants';
import {getFilteredTasks, getSortedTasks} from '../helpers';

export default class Tasks {
  constructor() {
    this._tasks = [];
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  getTasks() {
    let tasks = getFilteredTasks(this._tasks, this._activeFilterType);
    tasks = getSortedTasks(tasks, this._activeSortType);
    return tasks;
  }

  getTasksQuantity() {
    return this.getTasks().length;
  }

  getAllTasks() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = tasks;
  }

  setFilterType(filterType) {
    this._activeFilterType = filterType;
    this.setSortType(SortType.DEFAULT);

    this._callHandlers(this._filterChangeHandlers);
  }

  getFilterType() {
    return this._activeFilterType;
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortChangeHandlers);
  }

  getSortType() {
    return this._activeSortType;
  }

  addDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  addFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  addSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  updateTask(id, newData) {
    const taskIndex = this._tasks.findIndex((item) => id === item.id);

    if (taskIndex < 0) {
      return false;
    }

    this._tasks[taskIndex] = newData;
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addTask(newData) {
    newData.id = Date.now() + Math.random();

    this._tasks.unshift(newData);
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removeTask(id) {
    const taskIndex = this._tasks.findIndex((item) => id === item.id);

    if (taskIndex < 0) {
      return false;
    }

    this._tasks = this._tasks.filter((item) => item.id !== id);
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
