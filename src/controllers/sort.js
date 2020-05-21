import SortComponent from '../components/sort';
import {replaceElement, renderElement} from '../helpers';

export default class Sort {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._currentSort = this._tasksModel.getSortType();

    this._setSortType = this._setSortType.bind(this);
    this._onSortChange = this._onSortChange.bind(this);

    this._tasksModel.addSortChangeHandler(this._onSortChange);
  }

  _setSortType(sortType) {
    this._tasksModel.setSortType(sortType);
  }

  _onDataChange() {
    this.render();
  }

  _onSortChange() {
    const newSort = this._tasksModel.getSortType();

    if (newSort === this._currentSort) {
      return;
    }

    this._currentSort = newSort;
  }

  render() {
    const oldSortComponent = this._SortComponent;
    const tasks = this._tasksModel.getAllTasks();
    this._SortComponent = new SortComponent({
      items: tasks,
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
