import {createElement} from '../helpers';

export default class Filter {
  constructor({items, currentFilter}) {
    this._items = items;
    this._currentFilter = currentFilter;

    this._element = createElement(this._getTmpl());
  }

  _getInputMarkup({title, count}) {
    const checkedAttr = title === this._currentFilter ? `checked` : ``;
    const disabledAttr = !count ? `disabled` : ``;

    return (
      `<input
        type="radio"
        id="filter__${title}"
        class="filter__input visually-hidden"
        name="filter"
        ${checkedAttr}
        ${disabledAttr}
      />
      <label for="filter__${title}" class="filter__label">
        ${title} <span class="filter__${title}-count">${count}</span>
      </label>`
    );
  }

  _getTmpl() {
    const itemsMarkup = this._items.reduce((prev, item) => {
      return prev + this._getInputMarkup(item);
    }, ``);

    return (
      `<section class="main__filter filter container">
        ${itemsMarkup}
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
