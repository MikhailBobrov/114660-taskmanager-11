import AbstractComponent from '../abstract-component';
import Card from '../card';

export default class TasksContainer extends AbstractComponent {
  addCards(cardsData) {
    const element = this.getElement();

    for (const data of cardsData) {
      element.append(new Card(data).getElement());
    }
  }

  _getTmpl() {
    return (
      `<div class="board__tasks"></div>`
    );
  }
}
