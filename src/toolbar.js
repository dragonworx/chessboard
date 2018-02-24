import GameObject from './game-object';

class Toolbar extends GameObject {
  constructor (game) {
    super(game);

    const element = GameObject.div('chess-toolbar');
    element.innerHTML = ``;
    this.container.appendChild(element);
    this.element = element;
  }
}

export default Toolbar;