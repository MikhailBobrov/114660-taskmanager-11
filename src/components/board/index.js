import AbstractComponent from '../abstract-component';
import Sort from '../sort';
import TasksContainer from './tasks-container';
import MoreBtn from './more-btn';
import {MAX_CARDS_SHOW} from '../../constants';
import {createElement, renderElement, removeElement} from '../../helpers';

export default class Board extends AbstractComponent {
  constructor(cardsData) {
    super();

    this._cardsData = cardsData;
    this._quantityLoaded = 0;
    this._sort = new Sort();
    this._tasksContainer = new TasksContainer();
    this._moreBtn = new MoreBtn();

    this._moreBtnClickHandler = this._moreBtnClickHandler.bind(this);
  }

  _moreBtnClickHandler() {
    this._addCards();
  }

  _addCards() {
    const nextLoadStart = this._quantityLoaded + MAX_CARDS_SHOW;
    const cardsDataToShow = this._cardsData.slice(this._quantityLoaded, nextLoadStart);

    this._quantityLoaded = nextLoadStart;

    if (this._quantityLoaded >= this._cardsData.length) {
      removeElement(this._moreBtn);
    }

    this._tasksContainer.addCards(cardsDataToShow);
  }

  _getTmpl() {
    return (
      `<section class="board container"></section>`
    );
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    renderElement(element, this._sort);
    renderElement(element, this._tasksContainer);

    this._addCards();

    renderElement(element, this._moreBtn);
    this._moreBtn.setClickHandler(this._moreBtnClickHandler);

    return element;
  }
}
