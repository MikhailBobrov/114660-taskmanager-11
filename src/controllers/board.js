import TaskController from './task';
import Sort from '../components/sort';
import MoreBtn from '../components/more-btn';
import {MAX_CARDS_SHOW} from '../constants';
import {createElement, renderElement, removeElement} from '../helpers';

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._quantityLoaded = 0;
    this._sort = new Sort();
    this._moreBtn = new MoreBtn();
    this._tasksControllers = [];

    this._moreBtnClickHandler = this._moreBtnClickHandler.bind(this);
    this._moreBtn.setClickHandler(this._moreBtnClickHandler);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onDataChange(id, newData) {
    const taskIndex = this._tasks.findIndex((item) => item.id === id);

    if (taskIndex < 0) {
      return;
    }

    this._tasks[taskIndex] = newData;
    this._tasksControllers[taskIndex].render(newData);
  }

  _onViewChange() {
    this._tasksControllers.forEach((item) => item.setDefaultView());
  }

  _moreBtnClickHandler() {
    this._loadMore();
  }

  _loadMore() {
    const newTasksControllers = this._renderTasks(this._getTasks());
    this._tasksControllers = this._tasksControllers.concat(newTasksControllers);
  }

  _getTasksSection() {
    return createElement(`<div class="board__tasks"></div>`);
  }

  _getBoardSection() {
    return createElement(`<section class="board container"></section>`);
  }

  _renderTasks(tasks) {
    return tasks.map((taskData) => {
      const taskController = new TaskController(this._tasksSection, this._onDataChange, this._onViewChange);
      taskController.render(taskData);

      return taskController;
    });
  }

  _getTasks() {
    const nextLoadStart = this._quantityLoaded + MAX_CARDS_SHOW;
    const tasksToShow = this._tasks.slice(this._quantityLoaded, nextLoadStart);
    this._quantityLoaded = nextLoadStart;

    if (this._quantityLoaded >= this._tasks.length) {
      removeElement(this._moreBtn);
    }

    return tasksToShow;
  }

  render(tasks) {
    this._tasks = tasks;
    const element = this._getBoardSection();
    this._tasksSection = this._getTasksSection();
    this._tasksControllers = this._renderTasks(this._getTasks());

    renderElement(element, [
      this._sort,
      this._tasksSection,
      this._moreBtn
    ]);

    renderElement(this._container, element);
  }
}
