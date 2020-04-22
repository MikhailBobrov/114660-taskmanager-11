import Task from './task';
import FormControls from './task/form-controls';

export default class CardEdit extends Task {
  constructor(taskData) {
    super();

    this._init(taskData);

    this._formControls = new FormControls(taskData);
  }

  setSubmitHandler(handler) {
    const form = this.getElement().querySelector(`form`);

    form.addEventListener(`submit`, handler);
  }
}
