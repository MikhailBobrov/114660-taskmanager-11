import {createElement} from '../helpers/createElement';

export default class Filter {
  constructor(items) {
    this.items = items;
  }
  getInputMarkup({name, count, isChecked}) {
    const checkedAttr = isChecked ? `checked` : ``;
    const disabledAttr = !count ? `disabled` : ``;

    return (
      `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${checkedAttr}
        ${disabledAttr}
      />
      <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__${name}-count">${count}</span>
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
