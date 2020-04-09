import {MAX_CARDS_SHOW} from '../const.js';

import {createElement} from '../helpers';

import Sort from './sort';
import Card from './card';

let quantityLoaded = 0;

export default class Board {
  constructor(cardsData) {
    this.cardsData = cardsData;
    this.section = createElement(this.getTmpl());
    this.tasksElem = this.section.querySelector(`.board__tasks`);

    this.moreBtn = this.section.querySelector(`.load-more`);

    this.addCards = this.addCards.bind(this);
    this.moreBtn.addEventListener(`click`, this.addCards);
  }

  getCards() {
    const cardsDataToShow = this.cardsData.slice(quantityLoaded, quantityLoaded + MAX_CARDS_SHOW);

    quantityLoaded += MAX_CARDS_SHOW;

    if (quantityLoaded >= this.cardsData.length) {
      this.moreBtn.remove();
    }

    return cardsDataToShow
      .reduce((prev, data) => {
        return prev + new Card(data).render();
      }, ``);
  }

  addCards() {
    this.tasksElem.insertAdjacentHTML(`beforeend`, this.getCards());
  }

  getTmpl() {
    return (
      `<section class="board container">
        ${new Sort().getTmpl()}

        <div class="board__tasks">
          ${this.getCards()}
        </div>

        <button class="load-more" type="button">load more</button>
      </section>`
    );
  }

  render() {
    return this.section;
  }
}
