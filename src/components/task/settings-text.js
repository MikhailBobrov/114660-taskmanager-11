import AbstractComponent from '../abstract-component';
import {getDate, getTime} from '../../helpers';

export default class SettingsText extends AbstractComponent {
  constructor({isRepeat, dueDate}) {
    super();

    this.isRepeat = isRepeat;
    this._date = getDate(dueDate);
    this._time = getTime(dueDate);
  }

  _getTmpl() {
    if (this.isRepeat) {
      return ``;
    }

    return (
      `<div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <div class="card__date-deadline">
              <p class="card__input-deadline-wrap">
                <span class="card__date">${this._date}</span>

                <span class="card__time">${this._time}</span>
              </p>
            </div>
          </div>
        </div>
      </div>`
    );
  }
}
