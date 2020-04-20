import AbstractComponent from './abstract-component';
import Card from './card';
import CardEdit from './card-edit';
import {renderElement, replaceElement} from '../helpers';

export default class TasksContainer extends AbstractComponent {
  renderTask(element, cardData) {
    const card = new Card(cardData);
    cardData.isEdit = true;
    const cardEdit = new CardEdit(cardData);

    function replaceCardToEdit() {
      replaceElement(card, cardEdit);
    }
    function replaceEditTocard() {
      replaceElement(cardEdit, card);
    }

    card.setEditBtnHandler(replaceCardToEdit);
    cardEdit.setSubmitHandler(replaceEditTocard);

    renderElement(element, card);
  }

  addCards(cardsData) {
    const element = this.getElement();

    for (const data of cardsData) {
      this.renderTask(element, data);
    }
  }

  _getTmpl() {
    return (
      `<div class="board__tasks"></div>`
    );
  }
}
