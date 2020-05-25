import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import flatpickr from 'flatpickr';
import AbstractSmartComponent from '../abstract-smart-component';
import {COLORS_HEX, PIE_CHART_OPTIONS, LINE_CHART_OPTIONS} from './constants';
import {getTasksQuantityByColor, getTasksQuantityByDay, getArchivedTasksBetweenFromTo, getDaysBetweenFromTo, getPeriod, getPlurals} from '../../helpers/';

import 'flatpickr/dist/flatpickr.min.css';

const DURATION_IN_DAYS = 7;

export default class Statistic extends AbstractSmartComponent {
  constructor(tasks) {
    super();

    this._dateTo = new Date();
    const today = new Date();
    this._dateFrom = today.setDate(today.getDate() - DURATION_IN_DAYS);
    this._tasks = getArchivedTasksBetweenFromTo(tasks, this._dateFrom, this._dateTo);
    this._days = getDaysBetweenFromTo(this._dateFrom, this._dateTo);
    this._placeholder = getPeriod(this._dateFrom, this._dateTo);
    this._flatpickr = null;
    this._updateDates = this._updateDates.bind(this);

    this._addFlatpickr();

    this._setChangeDateHandler();
  }

  renderPieChart() {
    const canvasColors = this.getElement().querySelector(`.statistic__colors`);
    const colorsData = getTasksQuantityByColor(this._tasks);
    const labels = Object.keys(colorsData);
    const data = Object.values(colorsData);
    const backgroundColor = labels.map((color) => COLORS_HEX[color]);

    return new Chart(canvasColors, {
      type: `pie`,
      data: {
        datasets: [{
          data,
          backgroundColor,
          label: `Dataset 1`
        }],
        labels
      },
      options: PIE_CHART_OPTIONS
    });
  }

  renderLineChart() {
    const canvasColors = this.getElement().querySelector(`.statistic__days`);
    const daysData = getTasksQuantityByDay(this._days, this._tasks);
    const labels = Object.keys(daysData);
    const data = Object.values(daysData);

    return new Chart(canvasColors, {
      plugins: [ChartDataLabels],
      type: `line`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `transparent`,
          borderColor: `#000000`,
          borderWidth: 1,
          lineTension: 0,
          pointRadius: 8,
          pointHoverRadius: 8,
          pointBackgroundColor: `#000000`
        }]
      },
      options: LINE_CHART_OPTIONS
    });
  }

  _getDateElement() {
    if (this._dateElement) {
      return this._dateElement;
    }

    this._dateElement = this.getElement().querySelector(`.statistic__period-input`);

    return this._dateElement;
  }

  _setChangeDateHandler() {
    const control = this._getDateElement();

    control.addEventListener(`change`, this._updateDates);
  }

  _updateDates() {
    const [from, to] = this._flatpickr.selectedDates;

    if (!to) {
      return;
    }

    this._dateFrom = from;
    this._dateTo = to;
    this._days = getDaysBetweenFromTo(this._dateFrom, this._dateTo);
    this._placeholder = getPeriod(this._dateFrom, this._dateTo);
    this._dateElement = null;
    this.rerender();

    this._addFlatpickr();
    this.renderPieChart();
    this.renderLineChart();
  }

  _recoveryListeners() {
    this._setChangeDateHandler();
  }

  _addFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const config = {
      altInput: true,
      allowInput: true,
      altFormat: `j F`,
      mode: `range`,
      dateFormat: `Y-m-d`,
      defaultDate: [this._dateFrom, this._dateTo],
    };

    this._flatpickr = flatpickr(this._getDateElement(), config);
  }

  _getTmpl() {
    const tasksQuantity = this._tasks.length;
    const tasksPlurals = getPlurals(tasksQuantity, [`task was`, `tasks were`]);

    return (
      `<section class="statistic container">
        <div class="statistic__line">
          <div class="statistic__period">
            <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

            <div class="statistic-input-wrap">
              <input
                class="statistic__period-input"
                type="text"
                placeholder="${this._placeholder}"
              />
            </div>

            <p class="statistic__period-result">
              In total for the specified period
              <span class="statistic__task-found">
                ${this._tasks.length}
              </span> ${tasksPlurals} fulfilled.
            </p>
          </div>
          <div class="statistic__line-graphic">
            <canvas class="statistic__days" width="550" height="150"></canvas>
          </div>
        </div>

        <div class="statistic__circle">
          <div class="statistic__colors-wrap">
            <canvas class="statistic__colors" width="400" height="300"></canvas>
          </div>
        </div>
      </section>`
    );
  }
}
