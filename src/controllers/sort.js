import SortComponent from '../components/sort';
import {replaceElement, renderElement} from '../helpers';

export default class SortController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._currentSortType = this._tasksModel.getSortType();

    this._setSortType = this._setSortType.bind(this);
    this._onSortChange = this._onSortChange.bind(this);

    this._tasksModel.addSortChangeHandler(this._onSortChange);
  }

  hide() {
    this._SortComponent.hide();
  }

  show() {
    this._SortComponent.show();
  }

  _setSortType(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._tasksModel.setSortType(sortType);
  }

  _onSortChange() {
    const newSortType = this._tasksModel.getSortType();

    this._currentSortType = newSortType;

    this.render();
  }

  render() {
    const oldSortComponent = this._SortComponent;
    this._SortComponent = new SortComponent({
      currentSort: this._tasksModel.getSortType()
    });

    this._SortComponent.setSortItemClickHandler(this._setSortType);

    if (oldSortComponent) {
      replaceElement(oldSortComponent, this._SortComponent);
    } else {
      renderElement(this._container, this._SortComponent);
    }
  }
}
