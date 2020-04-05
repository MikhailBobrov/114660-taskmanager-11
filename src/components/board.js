import Sort from './sort';
import CardForm from './card-form';
import Card from './card';

const MAX_CARDS = 3;

const cardsData = [
  {
    text: `Example task with default color.`,
    date: `23 September`,
    time: `16:15`,
    mods: [`black`]
  },
  {
    text: `Example task with custom color.`,
    date: `23 September`,
    time: `16:15`,
    mods: [`blue`]
  },
  {
    text: `Example task with custom color and without date.`,
    mods: [`yellow`]
  },
  {
    text: `Example task with custom color.`,
    date: `23 September`,
    time: `16:15`,
    mods: [`green`]
  },
  {
    text: `Example task without date.`,
    mods: [`black`]
  },
  {
    text: `It is example of repeating task. It marks by wave.`,
    date: `23 September`,
    time: `16:15`,
    mods: [`pink`, `repeat`]
  },
  {
    text: `This is task with missing deadline.`,
    mods: [`red`, `deadline`]
  },
  {
    text: `This is task with missing deadline. Deadline always marked by red line.`,
    date: `23 September`,
    time: `16:15`,
    mods: [`black`, `deadline`]
  }
];

const formCardData = {
  text: `Here is a card with filled data`,
  date: `23 September`,
  time: `16:15`,
  mods: [`edit`, `yellow`, `repeat`]
};

export default class Board {
  getMoreBtn() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }

  getCards() {
    const cardsDataToShow = cardsData.slice(0, MAX_CARDS);

    return cardsDataToShow
      .reduce((prev, data) => {
        return prev + new Card().getTmpl(data);
      }, ``);
  }

  getTmpl() {
    return (
      `<section class="board container">
        ${new Sort().getTmpl()}

        <div class="board__tasks">
          ${new CardForm().getTmpl(formCardData)}
          ${this.getCards()}
        </div>

        ${this.getMoreBtn()}
      </section>`
    );
  }
}
