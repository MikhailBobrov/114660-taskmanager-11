import AbstractComponent from './abstract-component';
import {getFilteredTasks, getHandlerWithValue} from '../helpers';
import {FilterType} from '../constants';

export default class Filter extends AbstractComponent {
  constructor({items, currentFilter}) {
    super();

    this._items = items;
    this._currentFilter = currentFilter;
  }

  setFilterItemClickHandler(handler) {
    const handlerWihValue = getHandlerWithValue(`.filter__input`, handler);
    this.getElement().addEventListener(`click`, handlerWihValue);
  }

  _getInputMarkup({type, count}) {
    const checkedAttr = type === this._currentFilter ? `checked` : ``;
    const disabledAttr = !count ? `disabled` : ``;

    return (
      `<input
        type="radio"
        id="filter__${type}"
        class="filter__input visually-hidden"
        name="filter"
        value="${type}"
        ${checkedAttr}
        ${disabledAttr}
      />
      <label for="filter__${type}" class="filter__label">
        ${type} <span class="filter__${type}-count">${count}</span>
      </label>`
    );
  }

  _getItems() {
    return Object.values(FilterType)
      .reduce((prev, type) => {
        const count = getFilteredTasks(this._items, type).length;
        return prev + this._getInputMarkup({type, count});
      }, ``);
  }

  _getTmpl() {
    return (
      `<section class="main__filter filter container">
        ${this._getItems()}
      </section>`
    );
  }
}
