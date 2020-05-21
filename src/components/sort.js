import AbstractComponent from './abstract-component';
import {getHandlerWithProp} from '../helpers';
import {SortType} from '../constants';

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._itemsData = [
      {
        id: SortType.DEFAULT,
        name: `SORT BY DEFAULT`
      },
      {
        id: SortType.DATE_UP,
        name: `SORT BY DATE up`
      },
      {
        id: SortType.DATE_DOWN,
        name: `SORT BY DATE down`
      },
    ];
  }

  setSortItemClickHandler(handler) {
    const handlerWithProp = getHandlerWithProp(`.board__filter`, handler);

    this.getElement().addEventListener(`click`, handlerWithProp);
  }

  _getItems() {
    return this._itemsData.reduce((prev, item) => {
      const {id, name} = item;

      return (
        `${prev}<a
          href="#"
          class="board__filter"
          data-prop="${id}"
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
