import FilterComponent from '../components/filter';
import {replaceElement, renderElement} from '../helpers';

export default class Filter {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._currentFilter = this._tasksModel.getFilterType();

    this._setFilterType = this._setFilterType.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._tasksModel.addDataChangeHandler(this._onDataChange);
    this._tasksModel.addFilterChangeHandler(this._onFilterChange);
  }

  _setFilterType(filterType) {
    this._tasksModel.setFilterType(filterType);
  }

  _onDataChange() {
    this.render();
  }

  _onFilterChange() {
    const newFilter = this._tasksModel.getFilterType();

    if (newFilter === this._currentFilter) {
      return;
    }

    this._currentFilter = newFilter;
    this.render();
  }

  render() {
    const oldFilterComponent = this._filterComponent;
    const tasks = this._tasksModel.getAllTasks();
    this._filterComponent = new FilterComponent({
      items: tasks,
      currentFilter: this._tasksModel.getFilterType()
    });

    this._filterComponent.setFilterItemClickHandler(this._setFilterType);

    if (oldFilterComponent) {
      replaceElement(oldFilterComponent, this._filterComponent);
    } else {
      renderElement(this._container, this._filterComponent);
    }
  }
}
