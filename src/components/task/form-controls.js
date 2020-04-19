import AbstractComponent from '../abstract-component';

export default class FormControls extends AbstractComponent {
  constructor({isEdit}) {
    super();

    this._isEdit = isEdit;
  }

  _getTmpl() {
    if (!this._isEdit) {
      return ``;
    }

    return (
      `<div class="card__status-btns">
        <button class="card__save" type="submit">save</button>

        <button class="card__delete" type="button">delete</button>
      </div>`
    );
  }
}
