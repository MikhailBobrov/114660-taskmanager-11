import AbstractSmartComponent from './abstract-smart-component';

export default class Board extends AbstractSmartComponent {
  _getTmpl() {
    return (
      `<section class="board container"></section>`
    );
  }
}
