import {getClass, getDate, getTime} from '../helpers';
import {COLORS_NAMES} from '../constants';

export default class Card {
  constructor({
    description,
    mods,
    dueDate,
    weekDays,
    color,
    isRepeat,
    isDeadline,
    isEdit
  }) {
    this.description = description;
    this.mods = mods;
    this.date = getDate(dueDate);
    this.time = getTime(dueDate);
    this.weekDays = weekDays;
    this.color = color;
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

    if (this.color) {
      mods.push(this.color);
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
    if (!this.isEdit ||
        !this.isRepeat ||
        (!this.weekDays || this.weekDays.length === 0)) {
      return ``;
    }

    const weekDaysMarkupList = Object.entries(this.weekDays)
      .map(([name, isChecked]) => {
        return this.getDayMarkup({name, isChecked});
      });

    return `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${weekDaysMarkupList.join(``)}
      </div>
    </fieldset>`;
  }

  getColorMarkup(name) {
    const checkedAttr = name === this.color ? `checked` : ``;

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

    const colorsMarkupList = COLORS_NAMES.map((color) => {
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
    if (this.isRepeat) {
      return ``;
    }

    const value = this.date && this.time ? `${this.date} ${this.time}` : ``;

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
    const description = this.description || ``;

    if (!this.isEdit) {
      return `<p class="card__text">${description}</p>`;
    }

    return (
      `<label>
        <textarea
          class="card__text"
          placeholder="Start typing your text here..."
          name="description"
        >${description}</textarea>
      </label>`
    );
  }

  getToggleStatus(value) {
    return value ? `yes` : `no`;
  }

  getDatesEdit() {
    return (
      `<button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">
          ${this.getToggleStatus(this.isDeadline)}
        </span>
      </button>

      ${this.getDeadlineInput()}

      <button class="card__repeat-toggle" type="button">
        repeat: <span class="card__repeat-status">
          ${this.getToggleStatus(this.isRepeat)}
        </span>
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
          class="card__btn card__btn--favorites">
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

  getContainerTag() {
    if (this.isEdit) {
      return {
        open: `<form class="card__form" method="get">`,
        close: `</form>`
      };
    }

    return {
      open: `<div class="card__form">`,
      close: `</div>`
    };
  }

  render() {
    const containerTag = this.getContainerTag();

    return (
      `<article class="${this.className}">
        ${containerTag.open}
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
        ${containerTag.close}
      </article>`
    );
  }
}
