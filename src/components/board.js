import {MAX_CARDS_SHOW} from '../constants';

import {createElement} from '../helpers';

import Sort from './sort';
import Card from './card';

export default class Board {
  constructor(cardsData) {
    this.cardsData = cardsData;
    this.quantityLoaded = 0;
    this.section = this.createSectionElement();
    this.tasksElem = this.createTasksElement();
    this.sortElem = new Sort().getElement();
    this.moreBtn = this.createMoreBtnElement();

    this.fillSection();

    this.addCards = this.addCards.bind(this);
    this.moreBtn.addEventListener(`click`, this.addCards);
  }

  addCards() {
    const nextLoadStart = this.quantityLoaded + MAX_CARDS_SHOW;
    const cardsDataToShow = this.cardsData.slice(this.quantityLoaded, nextLoadStart);

    this.quantityLoaded = nextLoadStart;

    if (this.quantityLoaded >= this.cardsData.length) {
      this.moreBtn.remove();
    }

    for (const data of cardsDataToShow) {
      this.tasksElem.append(new Card(data).getElement());
    }
  }

  createSectionElement() {
    return createElement(`<section class="board container"></section>`);
  }

  createTasksElement() {
    return createElement(`<div class="board__tasks"></div>`);
  }

  createMoreBtnElement() {
    return createElement(`<button class="load-more" type="button">load more</button>`);
  }

  fillSection() {
    this.section.append(this.sortElem);
    this.section.append(this.tasksElem);
    this.addCards();
    this.section.append(this.moreBtn);
  }

  getElement() {
    return this.section;
  }
}
