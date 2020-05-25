import TasksModel from "./models/tasks";

import FilterController from './controllers/filter';
import BoardController from './controllers/board';

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
const boardController = new BoardController(mainElem, tasksModel);
const filterController = new FilterController(mainElem, tasksModel);

renderElement(controlElem, menuComponent);

filterController.render();
boardController.render();

menuComponent.setAddNewTaskClickHandler(boardController.addNewTask);
