import {createElement} from '../helpers';

export default class Sort {
  constructor() {
    this.itemsData = [
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

  getItems() {
    return this.itemsData.reduce((prev, item) => {
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

  getTmpl() {
    return (
      `<div class="board__filter-list">
        ${this.getItems()}
      </div>`
    );
  }

  getElement() {
    return createElement(this.getTmpl());
  }
}
