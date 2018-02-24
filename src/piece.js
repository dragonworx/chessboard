// https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces
import GameObject from './game-object';

class Piece extends GameObject {
  constructor (game, type, color, coord) {
    super(game);

    this.type = type;
    this.isWhite = color === Piece.WHITE;
    this.element = GameObject.img(this.src, `chess-piece chess-piece-${this.color.toLowerCase()} chess-piece-${this.type.toLowerCase()}`);

    // assign to square
    this.setSquare(coord);
  }

  get src () {
    return `img/${this.type}-${this.color}.svg`.toLowerCase();
  }

  get isBlack () {
    return !this.isWhite;
  }

  get color () {
    return this.isWhite ? 'White' : 'Black';
  }

  setSquare (coord) {
    if (this.square) {
      this.square.release(this);
    }
    const square = this.board.square(coord);
    this.square = square;
    square.assign(this);
  }

  remove () {
    this.square.release(this);
  }

  cloneElement () {
    return GameObject.img(this.src, `chess-status-piece chess-status-piece-${this.color.toLowerCase()} chess-status-piece-${this.type.toLowerCase()}`);
  }
}

Piece.BLACK = 'b';
Piece.WHITE = 'w';
Piece.TYPE = {
  'r': 'Rook',
  'n': 'Knight',
  'b': 'Bishop',
  'k': 'King',
  'q': 'Queen',
  'p': 'Pawn'
};

export default Piece;