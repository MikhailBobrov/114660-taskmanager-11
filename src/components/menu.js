import AbstractSmartComponent from './abstract-smart-component';

export default class Menu extends AbstractSmartComponent {
  constructor() {
    super();

    this._itemsData = [
      {
        id: `new-task`,
        name: `+ ADD NEW TASK`,
      },
      {
        id: `tasks`,
        name: `TASKS`,
        isDefault: true
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

    this._addNewTaskClickHandler = handler;
  }

  setTasksClickHandler(handler) {
    const control = document.getElementById(`control__tasks`);

    control.addEventListener(`click`, handler);

    this._tasksClickHandler = handler;
  }

  setStatisticClickHandler(handler) {
    const control = document.getElementById(`control__statistic`);

    control.addEventListener(`click`, handler);

    this._statisticClickHandler = handler;
  }

  _recoveryListeners() {
    this.setAddNewTaskClickHandler(this._addNewTaskClickHandler);
    this.setTasksClickHandler(this._tasksClickHandler);
    this.setStatisticClickHandler(this._statisticClickHandler);
  }

  _getItems() {
    return this._itemsData.reduce((prev, item) => {
      const {id, name, isDefault} = item;
      const checkedAttr = isDefault ? `checked` : ``;

      return (
        `${prev}<input
          type="radio"
          name="control"
          id="control__${id}"
          class="control__input visually-hidden"
          ${checkedAttr}
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
