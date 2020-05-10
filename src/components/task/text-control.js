import AbstractComponent from '../abstract-component';
import {getActualDesc} from '../../helpers';

export default class TextControl extends AbstractComponent {
  constructor(taskData) {
    super();

    this._description = getActualDesc(taskData);
  }

  setTextInputHandler(handler) {
    const control = this.getElement().querySelector(`.card__text`);

    control.addEventListener(`input`, () => {
      handler(control.value);
    });
  }

  _getTmpl() {
    return (
      `<div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="description"
          >${this._description}</textarea>
        </label>
      </div>`
    );
  }
}
