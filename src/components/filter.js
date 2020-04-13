import {createElement} from '../helpers';

export default class Filter {
  constructor({items, currentFilter}) {
    this.items = items;
    this.currentFilter = currentFilter;
  }

  getInputMarkup({title, count}) {
    const checkedAttr = title === this.currentFilter ? `checked` : ``;
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

  getTmpl() {
    const itemsMarkup = this.items.reduce((prev, item) => {
      return prev + this.getInputMarkup(item);
    }, ``);

    return (
      `<section class="main__filter filter container">
        ${itemsMarkup}
      </section>`
    );
  }

  render() {
    return createElement(this.getTmpl());
  }
}
