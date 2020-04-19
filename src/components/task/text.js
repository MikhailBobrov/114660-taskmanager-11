import AbstractComponent from '../abstract-component';

export default class Text extends AbstractComponent {
  constructor({description, isEdit}) {
    super();

    this._description = description || ``;
    this._isEdit = isEdit;
  }

  _getTmpl() {
    let content = `<p class="card__text">${this._description}</p>`;

    if (this._isEdit) {
      content = `<label>
        <textarea
          class="card__text"
          placeholder="Start typing your text here..."
          name="description"
        >${this._description}</textarea>
      </label>`;
    }

    return (
      `<div class="card__textarea-wrap">${content}</div>`
    );
  }
}
