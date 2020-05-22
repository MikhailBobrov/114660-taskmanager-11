import he from 'he';
import AbstractComponent from '../abstract-component';

export default class TextControl extends AbstractComponent {
  constructor(taskData) {
    super();

    this._description = taskData.description || ``;
  }

  setTextInputHandler(handler) {
    const control = this.getElement().querySelector(`.card__text`);

    control.addEventListener(`input`, () => {
      handler(he.encode(control.value));
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
