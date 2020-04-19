import AbstractComponent from '../abstract-component';

export default class MoreBtn extends AbstractComponent {
  _getTmpl() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }
}
