import AbstractComponent from './abstract-component';
import Card from './card';
import CardEdit from './card-edit';
import {renderElement, replaceElement} from '../helpers';

export default class TasksContainer extends AbstractComponent {
  renderTask(element, data) {
    const card = new Card(data);
    data.isEdit = true;
    const cardEdit = new CardEdit(data);

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
