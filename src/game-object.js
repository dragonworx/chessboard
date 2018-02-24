class GameObject {
  constructor (game) {
    this.game = game;
    GameObject.game = game;
  }

  get container () {
    return this.game.container;
  }

  get board () {
    return this.game.board;
  }

  get boardElement () {
    return this.game.board.element;
  }

  get gameElement () {
    return this.game.element;
  }

  get chess () {
    return this.game.chess;
  }

  get white () {
    return this.game.white;
  }

  get black () {
    return this.game.black;
  }

  get settings () {
    return this.game.settings;
  }

  static create (tagName, classes) {
    const div = document.createElement(tagName);
    if (classes) {
      div.setAttribute('class', classes);
    }
    return div;
  }

  static div (classes) {
    return this.create('div', classes);
  }

  static img (src, classes) {
    const img = this.create('img', classes);
    img.src = src;
    return img;
  }

  static button (text, classes) {
    const button = this.create('button', classes);
    button.value = text;
    button.innerHTML = text;
    return button;
  }
}

export default GameObject;