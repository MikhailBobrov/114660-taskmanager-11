import {getClass, getDate, getTime, createElement} from '../helpers';
import {COLORS_NAMES} from '../constants';

export default class Card {
  constructor({
    description,
    dueDate,
    weekDays,
    color,
    isRepeat,
    isDeadline,
    isEdit
  }) {
    this._description = description;
    this._date = getDate(dueDate);
    this._time = getTime(dueDate);
    this._weekDays = weekDays;
    this._color = color;
    this._isRepeat = isRepeat;
    this._isDeadline = isDeadline;
    this._isEdit = isEdit;

    this._element = this.createElement();

    this.addCardEvents();
  }

  _getMods() {
    const mods = [];

    if (this._isRepeat) {
      mods.push(`repeat`);
    }

    if (this._isDeadline) {
      mods.push(`deadline`);
    }

    if (this._isEdit) {
      mods.push(`edit`);
    }

    if (this._color) {
      mods.push(this._color);
    }

    return mods;
  }

  _getDayMarkup({name, isChecked}) {
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

  _getWeekDays() {
    if (!this._isEdit ||
        !this._isRepeat ||
        (!this._weekDays || this._weekDays.length === 0)) {
      return ``;
    }

    const weekDaysMarkupList = Object.entries(this._weekDays)
      .map(([name, isChecked]) => {
        return this._getDayMarkup({name, isChecked});
      });

    return `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${weekDaysMarkupList.join(``)}
      </div>
    </fieldset>`;
  }

  _getColorMarkup(name) {
    const checkedAttr = name === this._color ? `checked` : ``;

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

  _getColors() {
    if (!this._isEdit) {
      return ``;
    }

    const colorsMarkupList = COLORS_NAMES.map((color) => {
      return this._getColorMarkup(color);
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

  _getDeadlineInput() {
    if (this._isRepeat) {
      return ``;
    }

    const value = this._date && this._time ? `${this._date} ${this._time}` : ``;

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

  _getText() {
    const description = this._description || ``;

    if (!this._isEdit) {
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

  _getToggleStatus(value) {
    return value ? `yes` : `no`;
  }

  _getDatesEdit() {
    return (
      `<button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">
          ${this._getToggleStatus(this._isDeadline)}
        </span>
      </button>

      ${this._getDeadlineInput()}

      <button class="card__repeat-toggle" type="button">
        repeat: <span class="card__repeat-status">
          ${this._getToggleStatus(this._isRepeat)}
        </span>
      </button>

      ${this._getWeekDays()}`
    );
  }

  _getDatesShow() {
    if (!this._date || !this._time) {
      return ``;
    }

    return (
      `<div class="card__date-deadline">
        <p class="card__input-deadline-wrap">
          <span class="card__date">${this._date}</span>
          <span class="card__time">${this._time}</span>
        </p>
      </div>`
    );
  }

  _getDatesContent() {
    if (this._isEdit) {
      return this._getDatesEdit();
    }

    return this._getDatesShow();
  }

  _getCardControls() {
    if (this._isEdit) {
      return ``;
    }

    return (
      `<div class="card__control">
        <button type="button"
          class="card__btn card__btn--edit"
          data-action="_edit">
          edit
        </button>

        <button type="button"
          class="card__btn card__btn--archive"
          data-action="_toggleArchive">
          archive
        </button>

        <button type="button"
          class="card__btn card__btn--favorites"
          data-action="_toggleFavorites">
          favorites
        </button>
      </div>`
    );
  }

  _getFormActionsControls() {
    if (!this._isEdit) {
      return ``;
    }

    return (
      `<div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>`
    );
  }

  _getContainerTag() {
    if (this._isEdit) {
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

  _getTmpl() {
    const containerTag = this._getContainerTag();
    const className = getClass({
      base: `card`,
      mods: this._getMods()
    });

    return (
      `<article class="${className}">
        ${containerTag.open}
          <div class="card__inner">
            ${this._getCardControls()}

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              ${this._getText()}
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  ${this._getDatesContent()}
                </div>
              </div>

              ${this._getColors()}
            </div>

            ${this._getFormActionsControls()}
          </div>
        ${containerTag.close}
      </article>`
    );
  }

  _edit() {
    this._isEdit = true;
    this.updateElement();
    this.addFormEvents();
  }

  _save() {
    this._isEdit = false;
    this.updateElement();
    this.addCardEvents();
  }

  addCardEvents() {
    const cardControls = this._element.querySelector(`.card__control`);

    if (!cardControls) {
      return;
    }

    cardControls.addEventListener(`click`, (event) => {
      const {action} = event.target.dataset;

      if (!action || !this[action]) {
        return;
      }

      this[action]();
    });
  }

  addFormEvents() {
    const form = this._element.querySelector(`form`);

    if (!form) {
      return;
    }

    form.addEventListener(`submit`, (event) => {
      event.preventDefault();

      this._save();
    });
  }

  createElement() {
    return createElement(this._getTmpl());
  }

  updateElement() {
    const newElement = this.createElement();
    this._element.replaceWith(newElement);
    this._element = newElement;
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
