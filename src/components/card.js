import {getClass} from '../helpers/getClass';

export default class Card {
  getDatesTmpl(date, time) {
    if (!date || !time) {
      return ``;
    }

    return (
      `<div class="card__dates">
        <div class="card__date-deadline">
          <p class="card__input-deadline-wrap">
            <span class="card__date">${date}</span>
            <span class="card__time">${time}</span>
          </p>
        </div>
      </div>`
    );
  }

  getTmpl({text, mods, date, time}) {
    return (
      `<article class="${getClass({base: `card`, mods})}">
        <div class="card__form">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites card__btn--disabled"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <p class="card__text">${text}</p>
            </div>

            <div class="card__settings">
              <div class="card__details">
                ${this.getDatesTmpl(date, time)}
              </div>
            </div>
          </div>
        </div>
      </article>`
    );
  }
}
