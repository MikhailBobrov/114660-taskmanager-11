import TasksModel from "./models/tasks";

import API from './api';

import MenuController from './controllers/menu';
import FilterController from './controllers/filter';
import BoardController from './controllers/board';
import StatisticController from './controllers/statistic';

import {AppState} from './constants';

const controlElem = document.querySelector(`.control`);
const mainElem = document.querySelector(`.main`);

const tasksModel = new TasksModel();

const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;
const AUTHORIZATION = `Basic iasuaiusdiuaoiu9`;

const api = new API(END_POINT, AUTHORIZATION);

const menuController = new MenuController(controlElem, tasksModel);
const statisticController = new StatisticController(mainElem, tasksModel);
const boardController = new BoardController(mainElem, tasksModel, api);
const filterController = new FilterController(mainElem, tasksModel);
let statsIsHidden = true;

menuController.render();
filterController.render();
boardController.render({state: AppState.LOADING});

api.getTasks()
  .then((response) => {
    tasksModel.setTasks(response);

    menuController.render();
    filterController.render();
    boardController.render();
    statisticController.render();
    statisticController.hide();
  })
  .catch((error) => {
    boardController.render({state: AppState.EMPTY});
    throw new Error(error);
  });

const switchToStatistic = () => {
  if (!statsIsHidden) {
    return;
  }

  boardController.hide();
  statisticController.show();
  statsIsHidden = false;
};

const switchToTasks = () => {
  if (statsIsHidden) {
    return;
  }

  boardController.show();
  statisticController.hide();
  menuController.reset();
  statsIsHidden = true;
};

menuController.setAddNewTaskClickHandler(() => {
  switchToTasks();
  boardController.addNewTask();
});

menuController.setTasksClickHandler(switchToTasks);
menuController.setStatisticClickHandler(switchToStatistic);

filterController.setFilterItemClickHandler(switchToTasks);
