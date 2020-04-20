import AbstractComponent from '../abstract-component';
import Text from './text';
import Settings from './settings';
import {getClass, createElement, renderElement} from '../../helpers';

export default class Task extends AbstractComponent {
  constructor() {
    super();

    if (new.target === Task) {
      throw new Error(`Task is not allowed as a constructor`);
    }
  }

  _init(taskData) {
    const {
      color,
      isRepeat,
      isDeadline,
      isEdit
    } = taskData;

    this._color = color;
    this._isRepeat = isRepeat;
    this._isDeadline = isDeadline;
    this._isEdit = isEdit;

    this._text = new Text(taskData);
    this._settings = new Settings(taskData);
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

  _getColorbarElement() {
    const markup = `<div class="card__color-bar">
      <svg class="card__color-bar-wave" width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
    </div>`;

    return createElement(markup);
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    const innerElement = element.querySelector(`.card__inner`);

    if (this._cardControls) {
      renderElement(innerElement, this._cardControls);
    }

    renderElement(innerElement, [
      this._getColorbarElement(),
      this._text,
      this._settings
    ]);

    if (this._formControls) {
      renderElement(innerElement, this._formControls);
    }

    return element;
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
          <div class="card__inner"></div>
        ${containerTag.close}
      </article>`
    );
  }
}
