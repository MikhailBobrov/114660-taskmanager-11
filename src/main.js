import {MAX_CARDS} from './constants';

import Menu from './components/menu';
import Filter from './components/filter';
import BoardController from './controllers/board';

import {getCardsData} from './mocks/cards';
import {getFilterItems} from './mocks/filter';

import {renderElement} from './helpers';

const controlElem = document.querySelector(`.control`);
const mainElem = document.querySelector(`.main`);

const cardsData = getCardsData(MAX_CARDS);
const filterItems = getFilterItems(cardsData);

const menu = new Menu();
const filter = new Filter({items: filterItems, currentFilter: `all`});
const boardController = new BoardController(mainElem);

renderElement(controlElem, menu);
renderElement(mainElem, filter);

boardController.render(cardsData);
