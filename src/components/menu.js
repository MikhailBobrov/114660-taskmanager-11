import {createElement} from '../helpers';

export default class Menu {
  constructor() {
    this._itemsData = [
      {
        id: `new-task`,
        name: `+ ADD NEW TASK`,
      },
      {
        id: `task`,
        name: `TASKS`
      },
      {
        id: `statistic`,
        name: `STATISTICS`
      },
    ];

    this._element = createElement(this._getTmpl());
  }

  _getItems() {
    return this._itemsData.reduce((prev, item) => {
      const {id, name} = item;
      return (
        `${prev}<input
          type="radio"
          name="control"
          id="control__${id}"
          class="control__input visually-hidden"
        />
        <label
          for="control__${id}"
          class="control__label control__label--${id}"
          >${name}</label>`
      );
    }, ``);
  }

  _getTmpl() {
    return (
      `<section class="control__btn-wrap">
        ${this._getItems()}
      </section>`
    );
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
