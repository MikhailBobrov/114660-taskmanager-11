import AbstractComponent from './abstract-component';

export default class Board extends AbstractComponent {
  _getTmpl() {
    return (
      `<section class="board container"></section>`
    );
  }
}
