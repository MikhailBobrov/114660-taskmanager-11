import {MAX_CARDS_SHOW} from '../constants';

import {createElement} from '../helpers';

import Sort from './sort';
import Card from './card';

export default class Board {
  constructor(cardsData) {
    this._cardsData = cardsData;
    this._quantityLoaded = 0;
    this._sort = new Sort();
    this._sectionElem = this._createSectionElem();
    this._tasksElem = this._createTasksElem();
    this._moreBtn = this._createMoreBtnElem();

    this._fillSection();

    this._addCards = this._addCards.bind(this);
    this._moreBtn.addEventListener(`click`, this._addCards);
  }

  _addCards() {
    const nextLoadStart = this._quantityLoaded + MAX_CARDS_SHOW;
    const cardsDataToShow = this._cardsData.slice(this._quantityLoaded, nextLoadStart);

    this._quantityLoaded = nextLoadStart;

    if (this._quantityLoaded >= this._cardsData.length) {
      this._moreBtn.remove();
    }

    for (const data of cardsDataToShow) {
      this._tasksElem.append(new Card(data).getElement());
    }
  }

  _createSectionElem() {
    return createElement(`<section class="board container"></section>`);
  }

  _createTasksElem() {
    return createElement(`<div class="board__tasks"></div>`);
  }

  _createMoreBtnElem() {
    return createElement(`<button class="load-more" type="button">load more</button>`);
  }

  _fillSection() {
    this._sectionElem.append(this._sort.getElement());
    this._sectionElem.append(this._tasksElem);
    this._addCards();
    this._sectionElem.append(this._moreBtn);
  }

  getElement() {
    return this._sectionElem;
  }
}
