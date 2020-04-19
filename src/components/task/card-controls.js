import AbstractComponent from '../abstract-component';

export default class CardControls extends AbstractComponent {
  constructor({isEdit}) {
    super();

    this._isEdit = isEdit;
  }

  setEditBtnHandler(handler) {
    const control = this.getElement().querySelector(`.card__btn--edit`);

    control.addEventListener(`click`, handler);
  }

  _getTmpl() {
    if (this._isEdit) {
      return ``;
    }

    return (
      `<div class="card__control">
        <button type="button"
          class="card__btn card__btn--edit">
          edit
        </button>

        <button type="button"
          class="card__btn card__btn--archive">
          archive
        </button>

        <button type="button"
          class="card__btn card__btn--favorites">
          favorites
        </button>
      </div>`
    );
  }
}
