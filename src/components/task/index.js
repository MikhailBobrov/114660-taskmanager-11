import AbstractSmartComponent from '../abstract-smart-component';
import {getClass, createElement} from '../../helpers';

export default class Task extends AbstractSmartComponent {
  constructor({isEdit} = {}) {
    super();

    this._isEdit = isEdit || false;

    if (new.target === Task) {
      throw new Error(`Task is not allowed as a constructor`);
    }
  }

  _getMods() {
    const {color, isRepeat, isDeadline} = this._taskData;
    const mods = [];

    if (isRepeat) {
      mods.push(`repeat`);
    }

    if (isDeadline) {
      mods.push(`deadline`);
    }

    if (this._isEdit) {
      mods.push(`edit`);
    }

    if (color) {
      mods.push(color);
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
