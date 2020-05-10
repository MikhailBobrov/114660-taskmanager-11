import AbstractComponent from '../abstract-component';

export default class TextControl extends AbstractComponent {
  constructor({description, savedDescription}) {
    super();

    this._description = savedDescription || description || ``;
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
