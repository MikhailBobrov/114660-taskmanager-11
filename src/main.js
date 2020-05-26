import TasksModel from "./models/tasks";

import API from './api';
import Provider from './api/provider';
import Store from './api/store';
import ConnectionObserver from './connection-observer';

import MenuController from './controllers/menu';
import FilterController from './controllers/filter';
import BoardController from './controllers/board';
import StatisticController from './controllers/statistic';

import {AppState} from './constants';

const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const OFFLINE_TEXT = ` [offline]`;

const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;
const AUTHORIZATION = `Basic iasuaiusdiuaoiu9`;

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const connectionObserver = new ConnectionObserver();

const tasksModel = new TasksModel();

const controlElement = document.querySelector(`.control`);
const mainElement = document.querySelector(`.main`);

const menuController = new MenuController(controlElement, tasksModel);
const statisticController = new StatisticController(mainElement, tasksModel);
const boardController = new BoardController(mainElement, tasksModel, apiWithProvider);
const filterController = new FilterController(mainElement, tasksModel);
let statsIsHidden = true;

menuController.render();
filterController.render();
boardController.render({state: AppState.LOADING});

const switchToTasks = () => {
  if (statsIsHidden) {
    return;
  }

  boardController.show();
  statisticController.hide();
  menuController.reset();
  statsIsHidden = true;
};

const switchToStatistic = () => {
  if (!statsIsHidden) {
    return;
  }

  boardController.hide();
  statisticController.show();
  statsIsHidden = false;
};

const addEvents = () => {
  menuController.setAddNewTaskClickHandler(() => {
    switchToTasks();
    boardController.addNewTask();
  });

  menuController.setTasksClickHandler(switchToTasks);
  menuController.setStatisticClickHandler(switchToStatistic);

  filterController.setFilterItemClickHandler(switchToTasks);
};

apiWithProvider.getTasks()
  .then((response) => {
    tasksModel.setTasks(response);

    menuController.render();
    filterController.render();
    boardController.render();
    statisticController.render();
    statisticController.hide();

    addEvents();
  })
  .catch((error) => {
    boardController.render({state: AppState.EMPTY});
    throw new Error(error);
  });

// Online/offline handlers
connectionObserver.addOfflineHandler(() => {
  document.title += OFFLINE_TEXT;
});

connectionObserver.addOnlineHandler(() => {
  document.title = document.title.replace(OFFLINE_TEXT, ``);

  apiWithProvider.sync();
});

apiWithProvider.addSyncHandler((tasks) => {
  // Update tasks on page or we can't
  // delete offline task with fake id
  tasksModel.setTasks(tasks);

  boardController.updateBoard();
});

// ServiceWorker
window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});
