import Task from './task';
import FormControls from './task/form-controls';

export default class CardEdit extends Task {
  constructor(data) {
    super();

    this._init(data);

    this._formControls = new FormControls(data);
  }

  setSubmitHandler(handler) {
    const form = this.getElement().querySelector(`form`);

    form.addEventListener(`submit`, handler);
  }
}
