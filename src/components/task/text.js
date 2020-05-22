import AbstractComponent from '../abstract-component';

export default class Text extends AbstractComponent {
  constructor({description}) {
    super();

    this._description = description || ``;
  }

  _getTmpl() {
    return (
      `<div class="card__textarea-wrap">
        <p class="card__text">${this._description}</p>
      </div>`
    );
  }
}
