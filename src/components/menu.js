import {createElement} from '../helpers';

export default class Menu {
  constructor() {
    this.itemsData = [
      {
        id: `new-task`,
        name: `+ ADD NEW TASK`,
      },
      {
        id: `task`,
        name: `TASKS`
      },
      {
        id: `statistic`,
        name: `STATISTICS`
      },
    ];
  }

  getItems() {
    return this.itemsData.reduce((prev, item) => {
      const {id, name} = item;
      return (
        `${prev}<input
          type="radio"
          name="control"
          id="control__${id}"
          class="control__input visually-hidden"
        />
        <label
          for="control__${id}"
          class="control__label control__label--${id}"
          >${name}</label>`
      );
    }, ``);
  }

  getTmpl() {
    return (
      `<section class="control__btn-wrap">
        ${this.getItems()}
      </section>`
    );
  }

  getElement() {
    return createElement(this.getTmpl());
  }
}
