import StatisticComponent from "../components/statistic";
import {renderElement, replaceElement} from "../helpers";

export default class StatisticController {
  constructor(container, taskModel) {
    this._container = container;
    this._taskModel = taskModel;

    this._onDataChange = this._onDataChange.bind(this);

    this._taskModel.addDataChangeHandler(this._onDataChange);
  }

  hide() {
    this._statisticComponent.hide();
  }

  show() {
    this._statisticComponent.show();
  }

  _onDataChange() {
    this.render();
    this.hide();
  }

  render() {
    const oldStatisticComponent = this._statisticComponent;
    this._statisticComponent = new StatisticComponent(this._taskModel.getAllTasks());

    renderElement(this._container, this._statisticComponent);

    if (oldStatisticComponent) {
      replaceElement(oldStatisticComponent, this._statisticComponent);
    } else {
      renderElement(this._container, this._statisticComponent);
    }

    this._statisticComponent.renderPieChart();
    this._statisticComponent.renderLineChart();
  }
}
