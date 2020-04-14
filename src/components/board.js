import {MAX_CARDS_SHOW} from '../constants';

import {createElement} from '../helpers';

import Sort from './sort';
import Card from './card';

export default class Board {
  constructor(cardsData) {
    this._cardsData = cardsData;
    this._quantityLoaded = 0;
    this._sort = new Sort();
    this._element = this._createSectionElement();
    this._tasksElement = this._createTasksElement();
    this._moreBtnElement = this._createMoreBtnElement();

    this._fillSection();

    this._addCards = this._addCards.bind(this);
    this._moreBtnElement.addEventListener(`click`, this._addCards);
  }

  _addCards() {
    const nextLoadStart = this._quantityLoaded + MAX_CARDS_SHOW;
    const cardsDataToShow = this._cardsData.slice(this._quantityLoaded, nextLoadStart);

    this._quantityLoaded = nextLoadStart;

    if (this._quantityLoaded >= this._cardsData.length) {
      this._moreBtnElement.remove();
    }

    for (const data of cardsDataToShow) {
      this._tasksElement.append(new Card(data).getElement());
    }
  }

  _createSectionElement() {
    return createElement(`<section class="board container"></section>`);
  }

  _createTasksElement() {
    return createElement(`<div class="board__tasks"></div>`);
  }

  _createMoreBtnElement() {
    return createElement(`<button class="load-more" type="button">load more</button>`);
  }

  _fillSection() {
    this._element.append(this._sort.getElement());
    this._element.append(this._tasksElement);
    this._addCards();
    this._element.append(this._moreBtnElement);
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
