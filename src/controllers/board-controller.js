import AbstractComponent from '../components/abstract-component';
import Sort from '../components/sort';
import TasksContainer from '../components/tasks-container';
import MoreBtn from '../components/more-btn';
import {MAX_CARDS_SHOW} from '../constants';
import {createElement, renderElement, removeElement} from '../helpers';

export default class BoardController extends AbstractComponent {
  constructor(container) {
    super();

    this._container = container;
    this._quantityLoaded = 0;
    this._sort = new Sort();
    this._tasksContainer = new TasksContainer();
    this._moreBtn = new MoreBtn();

    this._moreBtnClickHandler = this._moreBtnClickHandler.bind(this);
    this._moreBtn.setClickHandler(this._moreBtnClickHandler);
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

    renderElement(element, [
      this._sort,
      this._tasksContainer,
      this._moreBtn
    ]);

    this._addCards();

    return element;
  }

  render(cardsData) {
    this._cardsData = cardsData;
    renderElement(this._container, this.getElement());
  }
}
