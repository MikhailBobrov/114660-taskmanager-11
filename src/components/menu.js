import AbstractComponent from './abstract-component';

export default class Menu extends AbstractComponent {
  constructor() {
    super();

    this._itemsData = [
      {
        id: `new-task`,
        name: `+ ADD NEW TASK`,
      },
      {
        id: `tasks`,
        name: `TASKS`
      },
      {
        id: `statistic`,
        name: `STATISTICS`
      },
    ];
  }

  setAddNewTaskClickHandler(handler) {
    const control = document.getElementById(`control__new-task`);

    control.addEventListener(`click`, handler);
  }

  setTasksClickHandler(handler) {
    const control = document.getElementById(`control__tasks`);

    control.addEventListener(`click`, handler);
  }

  setStatisticClickHandler(handler) {
    const control = document.getElementById(`control__statistic`);

    control.addEventListener(`click`, handler);
  }

  _getItems() {
    return this._itemsData.reduce((prev, item) => {
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

  _getTmpl() {
    return (
      `<section class="control__btn-wrap">
        ${this._getItems()}
      </section>`
    );
  }
}
