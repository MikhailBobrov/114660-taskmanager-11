import MenuComponent from '../components/menu';
import {replaceElement, renderElement} from '../helpers';

export default class MenuController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;
  }

  setAddNewTaskClickHandler(handler) {
    this._menuComponent.setAddNewTaskClickHandler(handler);
  }

  setTasksClickHandler(handler) {
    this._menuComponent.setTasksClickHandler(handler);
  }

  setStatisticClickHandler(handler) {
    this._menuComponent.setStatisticClickHandler(handler);
  }

  reset() {
    this._menuComponent.rerender();
  }

  render() {
    const oldMenuComponent = this._menuComponent;
    this._menuComponent = new MenuComponent();

    if (oldMenuComponent) {
      replaceElement(oldMenuComponent, this._menuComponent);
    } else {
      renderElement(this._container, this._menuComponent);
    }
  }
}
