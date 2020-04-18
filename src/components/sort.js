import AbstractComponent from './abstract-component';

export default class Sort extends AbstractComponent {
  constructor() {
    super();

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
}
