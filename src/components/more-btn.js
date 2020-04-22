import AbstractComponent from './abstract-component';

export default class MoreBtn extends AbstractComponent {
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  _getTmpl() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }
}
