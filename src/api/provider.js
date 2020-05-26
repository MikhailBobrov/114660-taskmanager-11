import {nanoid} from 'nanoid';
import TaskModel from '../models/task';
import ConnectionObserver from '../connection-observer';
const {isOnline} = new ConnectionObserver();

const createStoreStructure = (tasks) => {
  return tasks.reduce((prev, task) => {
    prev[task.id] = task;

    return prev;
  }, {});
};

const getSyncedTasks = (tasks) => {
  return tasks.filter(({success}) => success)
    .map(({payload}) => payload.task);
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getTasks() {
    if (isOnline()) {
      return this._api.getTasks()
        .then((tasks)=> {
          const storeItems = createStoreStructure(tasks);

          this._store.setItems(storeItems);

          return TaskModel.parseTasks(tasks);
        });
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(TaskModel.parseTasks(storeTasks));
  }

  updateTask(taskId, taskData) {
    if (isOnline()) {
      return this._api.updateTask(taskId, taskData)
        .then((newTask) => {
          this._store.setItem(newTask.id, newTask);

          return TaskModel.parseTask(newTask);
        });
    }

    const localTask = TaskModel.clone(taskData);

    this._store.setItem(taskId, localTask.toRaw());
    this._store.switchSyncFlagOn();

    return Promise.resolve(localTask);
  }

  addTask(taskData) {
    if (isOnline()) {
      return this._api.addTask(taskData)
        .then((newTask) => {
          this._store.setItem(newTask.id, newTask);

          return TaskModel.parseTask(newTask);
        });
    }

    const localTask = TaskModel.clone(taskData);
    localTask.id = nanoid();

    this._store.setItem(localTask.id, localTask.toRaw());
    this._store.switchSyncFlagOn();

    return Promise.resolve(localTask);
  }

  deleteTask(taskId) {
    if (isOnline()) {
      return this._api.deleteTask(taskId)
        .then((response) => {
          this._store.deletItem(taskId);

          return response;
        });
    }

    this._store.deletItem(taskId);
    this._store.switchSyncFlagOn();

    return Promise.resolve();
  }

  sync() {
    if (!this._store.getSyncFlag()) {
      return null;
    }

    if (isOnline()) {
      const storeTasks = Object.values(this._store.getItems());

      return this._api.sync(storeTasks)
        .then((response) => {
          const created = getSyncedTasks(response.created);
          const updated = getSyncedTasks(response.updated);
          const tasks = [...created, ...updated];
          const storeItems = createStoreStructure(tasks);

          this._store.setItems(storeItems);
          this._store.switchSyncFlagOff();

          if (this._syncHandler) {
            this._syncHandler(TaskModel.parseTasks(tasks));
          }
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  addSyncHandler(handler) {
    this._syncHandler = handler;
  }
}
