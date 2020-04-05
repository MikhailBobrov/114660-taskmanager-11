import Menu from './components/menu';
import Filter from './components/filter';
import Board from './components/board';

const controlElem = document.querySelector(`.control`);
const mainElem = document.querySelector(`.main`);

const menu = new Menu();
const filter = new Filter();
const board = new Board();

const render = (elem, template) => {
  elem.insertAdjacentHTML(`beforeend`, template);
};

render(controlElem, menu.getTmpl());
render(mainElem, filter.getTmpl());
render(mainElem, board.getTmpl());
