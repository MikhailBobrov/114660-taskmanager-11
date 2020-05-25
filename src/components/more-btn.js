import AbstractSmartComponent from './abstract-smart-component';

export default class MoreBtn extends AbstractSmartComponent {
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  _getTmpl() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }
}
