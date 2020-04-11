import {MAX_CARDS, MAX_CARDS_SHOW} from './constants.js';

import Menu from './components/menu';
import Filter from './components/filter';
import Board from './components/board';

import {getCardsData} from './mocks/cards';
import {getFilterItems} from './mocks/filter';

const controlElem = document.querySelector(`.control`);
const mainElem = document.querySelector(`.main`);

const cardsData = getCardsData(MAX_CARDS);

const menu = new Menu();
const filter = new Filter(getFilterItems(cardsData));
const board = new Board(cardsData);

const render = (target, elem) => {
  target.append(elem);
};

render(controlElem, menu.render());
render(mainElem, filter.render());
render(mainElem, board.render());
