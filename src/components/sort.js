import AbstractSmartComponent from './abstract-smart-component';
import {getHandlerWithProp} from '../helpers';
import {SortType} from '../constants';

const ClassName = {
  DEFAULT: `board__filter`,
  CURRENT: `board__filter--current`
};

export default class Sort extends AbstractSmartComponent {
  constructor({currentSort}) {
    super();

    this._currentSort = currentSort;

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
      let className = `${ClassName.DEFAULT}`;

      if (id === this._currentSort) {
        className += ` ${ClassName.CURRENT}`;
      }

      return (
        `${prev}<a
          href="#"
          class="${className}"
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
