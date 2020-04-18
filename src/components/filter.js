import AbstractComponent from './abstract-component';

export default class Filter extends AbstractComponent {
  constructor({items, currentFilter}) {
    super();

    this._items = items;
    this._currentFilter = currentFilter;
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
}
