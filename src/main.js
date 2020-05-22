import TasksModel from "./models/task";

import FilterController from './controllers/filter';
import BoardController from './controllers/board';
import StatisticController from './controllers/statistic';

import Menu from './components/menu';

import {getCardsData} from './mocks/cards';

import {renderElement} from './helpers';

import {MAX_CARDS} from './constants';

const controlElem = document.querySelector(`.control`);
const mainElem = document.querySelector(`.main`);

const cardsData = getCardsData(MAX_CARDS);

const tasksModel = new TasksModel();
tasksModel.setTasks(cardsData);

const menuComponent = new Menu();
const statisticController = new StatisticController(mainElem, tasksModel);
const boardController = new BoardController(mainElem, tasksModel);
const filterController = new FilterController(mainElem, tasksModel);

renderElement(controlElem, menuComponent);

filterController.render();
statisticController.render();
statisticController.hide();
boardController.render();

const switchToStatistic = () => {
  boardController.hide();
  statisticController.show();
};

const switchToTasks = () => {
  boardController.show();
  statisticController.hide();
};

menuComponent.setAddNewTaskClickHandler(() => {
  switchToTasks();
  boardController.addNewTask();
});

menuComponent.setTasksClickHandler(switchToTasks);
menuComponent.setStatisticClickHandler(switchToStatistic);

filterController.setFilterItemClickHandler(switchToTasks);
