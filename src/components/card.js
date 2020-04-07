import {getClass} from '../helpers/getClass';
import {getDate, getTime} from '../helpers/dateTime';

export default class Card {
  constructor({
    text,
    mods,
    dateTime,
    weekDays,
    colors,
    isRepeat,
    isDeadline,
    isEdit
  }) {
    this.text = text;
    this.mods = mods;
    this.date = getDate(dateTime);
    this.time = getTime(dateTime);
    this.weekDays = weekDays;
    this.colorsControls = colors.controls;
    this.currentColor = colors.current;
    this.isRepeat = isRepeat;
    this.isDeadline = isDeadline;
    this.isEdit = isEdit;

    this.className = getClass({
      base: `card`,
      mods: this.getMods()
    });
  }

  getMods() {
    const mods = [];

    if (this.isRepeat) {
      mods.push(`repeat`);
    }

    if (this.isDeadline) {
      mods.push(`deadline`);
    }

    if (this.isEdit) {
      mods.push(`edit`);
    }

    if (this.currentColor) {
      mods.push(this.currentColor);
    }

    return mods;
  }

  getDayMarkup({name, isChecked}) {
    const checkedAttr = isChecked ? `checked` : ``;

    return (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${name}"
        name="repeat"
        value="${name}"
        ${checkedAttr}
      />
      <label
        class="card__repeat-day"
        for="repeat-${name}"
      >${name}</label>`
    );
  }

  getWeekDays() {
    if (!this.isEdit) {
      return ``;
    }
    if (!this.isRepeat) {
      return ``;
    }

    if (!this.weekDays || this.weekDays.length === 0) {
      return ``;
    }

    const weekDaysMarkupList = this.weekDays.map((weekDay) => {
      return this.getDayMarkup(weekDay);
    });

    return `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${weekDaysMarkupList.join(``)}
      </div>
    </fieldset>`;
  }

  getColorMarkup({name, isChecked}) {
    const checkedAttr = isChecked ? `checked` : ``;

    return (
      `<input
        type="radio"
        id="color-${name}"
        class="card__color-input card__color-input--${name} visually-hidden"
        name="color"
        value="${name}"
        ${checkedAttr}
      />
      <label
        for="color-${name}"
        class="card__color card__color--${name}"
        >${name}</label
      >`
    );
  }

  getColors() {
    if (!this.isEdit) {
      return ``;
    }

    if (!this.colorsControls || this.colorsControls.length === 0) {
      return ``;
    }

    const colorsMarkupList = this.colorsControls.map((color) => {
      return this.getColorMarkup(color);
    });

    return (
      `<div class="card__colors-inner">
        <h3 class="card__colors-title">Color</h3>
        <div class="card__colors-wrap">
          ${colorsMarkupList.join(``)}
        </div>
      </div>`
    );
  }

  getDeadlineInput() {
    let value = ``;

    if (this.isRepeat) {
      return ``;
    }

    if (this.date && this.time) {
      value = `${this.date} ${this.time}`;
    }

    return (
      `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder="Set date"
            name="date"
            value="${value}"
          />
        </label>
      </fieldset>`
    );
  }

  getText() {
    const text = this.text || ``;

    return (
      `<label>
        <textarea
          class="card__text"
          placeholder="Start typing your text here..."
          name="text"
        >${text}</textarea>
      </label>`
    );
  }

  getYesNo(value) {
    if (value) {
      return `yes`;
    }

    return `no`;
  }

  getDatesEdit() {
    return (
      `<button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${this.getYesNo(this.isDeadline)}</span>
      </button>

      ${this.getDeadlineInput()}

      <button class="card__repeat-toggle" type="button">
        repeat: <span class="card__repeat-status">${this.getYesNo(this.isRepeat)}</span>
      </button>

      ${this.getWeekDays()}`
    );
  }

  getDatesShow() {
    if (!this.date || !this.time) {
      return ``;
    }

    return (
      `<div class="card__date-deadline">
        <p class="card__input-deadline-wrap">
          <span class="card__date">${this.date}</span>
          <span class="card__time">${this.time}</span>
        </p>
      </div>`
    );
  }

  getDatesContent() {
    if (this.isEdit) {
      return this.getDatesEdit();
    }

    return this.getDatesShow();
  }

  getCardControls() {
    if (this.isEdit) {
      return ``;
    }

    return (
      `<div class="card__control">
        <button type="button"
          class="card__btn card__btn--edit">
          edit
        </button>

        <button type="button"
          class="card__btn card__btn--archive">
          archive
        </button>

        <button type="button"
          class="card__btn card__btn--favorites ">
          favorites
        </button>
      </div>`
    );
  }

  getFormActionsControls() {
    if (!this.isEdit) {
      return ``;
    }

    return (
      `<div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>`
    );
  }

  render() {
    return (
      `<article class="${this.className}">
        <form class="card__form" method="get">
          <div class="card__inner">
            ${this.getCardControls()}

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              ${this.getText()}
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  ${this.getDatesContent()}
                </div>
              </div>

              ${this.getColors()}
            </div>

            ${this.getFormActionsControls()}
          </div>
        </form>
      </article>`
    );
  }
}
