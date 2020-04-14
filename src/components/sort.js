import {createElement} from '../helpers';

export default class Sort {
  constructor() {
    this._itemsData = [
      {
        id: `default`,
        name: `SORT BY DEFAULT`
      },
      {
        id: `date-up`,
        name: `SORT BY DATE up`
      },
      {
        id: `date-down`,
        name: `SORT BY DATE down`
      },
    ];

    this._element = createElement(this._getTmpl());
  }

  _getItems() {
    return this._itemsData.reduce((prev, item) => {
      const {id, name} = item;
      return (
        `${prev}<a
          href="#"
          class="board__filter"
          data-sort-type="${id}"
        >
          ${name}
        </a>`
      );
    }, ``);
  }

  _getTmpl() {
    return (
      `<div class="board__filter-list">
        ${this._getItems()}
      </div>`
    );
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
