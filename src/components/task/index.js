import AbstractSmartComponent from '../abstract-smart-component';
import {getClass, createElement, shake} from '../../helpers';
import {ClassName} from '../../constants';

export default class Task extends AbstractSmartComponent {
  constructor({isEdit} = {}) {
    super();

    this._isEdit = isEdit || false;

    if (new.target === Task) {
      throw new Error(`Task is not allowed as a constructor`);
    }
  }

  highlightOnError() {
    const innerElement = this._getInnerElement();
    shake(innerElement);

    if (this._isEdit) {
      innerElement.classList.add(ClassName.ERROR);
    }
  }

  freeze() {
    const innerElement = this._getInnerElement();
    innerElement.classList.add(ClassName.DISABLED);

    this._getInputs().forEach((input) => {
      input.disabled = true;
    });
  }

  unfreeze() {
    const innerElement = this._getInnerElement();
    innerElement.classList.remove(ClassName.DISABLED);

    this._getInputs().forEach((input) => {
      input.disabled = false;
    });
  }

  _getInnerElement() {
    if (this._innerElement) {
      return this._innerElement;
    }

    return this.getElement().querySelector(`.card__inner`);
  }

  _getInputs() {
    const innerElement = this._getInnerElement();
    return innerElement.querySelectorAll(`input, button, textarea`);
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
