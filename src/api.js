import TaskModel from './models/task';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const CONTENT_TYPE_HEADER = {'Content-Type': `application/json`};

export default class API {
  constructor(endPoint, authorization) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getTasks() {
    return this._load({url: `tasks`})
      .then((response) => response.json())
      .then((tasksJson) => {
        return TaskModel.parseTasks(tasksJson);
      });
  }

  updateTask(taskId, taskData) {
    return this._load({
      url: `tasks/${taskId}`,
      headers: new Headers(CONTENT_TYPE_HEADER),
      method: `PUT`,
      body: JSON.stringify(taskData.toRaw()),
    })
      .then((response) => response.json())
      .then((taskJson) => {
        return TaskModel.parseTask(taskJson);
      });
  }

  _load({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.set(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {
      method,
      headers,
      body
    })
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }
}
