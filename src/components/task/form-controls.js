import AbstractComponent from '../abstract-component';

export default class FormControls extends AbstractComponent {
  _getTmpl() {
    return (
      `<div class="card__status-btns">
        <button class="card__save" type="submit">save</button>

        <button class="card__delete" type="button">delete</button>
      </div>`
    );
  }
}
