import {createElement} from '../helpers/createElement';

export default class Filter {
  constructor(items) {
    this.items = items;
  }
  getInputMarkup({title, count, isChecked}) {
    const checkedAttr = isChecked ? `checked` : ``;
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
