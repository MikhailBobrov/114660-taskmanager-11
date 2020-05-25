import TasksModel from "./models/tasks";

import MenuController from './controllers/menu';
import FilterController from './controllers/filter';
import BoardController from './controllers/board';
import StatisticController from './controllers/statistic';

import {getCardsData} from './mocks/cards';

import {MAX_CARDS} from './constants';

const controlElem = document.querySelector(`.control`);
const mainElem = document.querySelector(`.main`);

const cardsData = getCardsData(MAX_CARDS);

const tasksModel = new TasksModel();
tasksModel.setTasks(cardsData);

const menuController = new MenuController(controlElem, tasksModel);
const statisticController = new StatisticController(mainElem, tasksModel);
const boardController = new BoardController(mainElem, tasksModel);
const filterController = new FilterController(mainElem, tasksModel);
let statsIsHidden = true;

menuController.render();
filterController.render();
statisticController.render();
statisticController.hide();
boardController.render();

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
