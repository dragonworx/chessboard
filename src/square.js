import GameObject from './game-object';
import drag from './drag';

class Square extends GameObject {
  constructor (game, coord, isWhite) {
    super(game);

    this.coord = coord;
    this.isWhite = isWhite;
    const element = GameObject.div(`chess-square chess-square-${isWhite ? 'white' : 'black'} chess-square-${coord}`);
    this.element = element;
    this.boardElement.appendChild(element);
    this.piece = null;
    this.moves = [];

    element.addEventListener('mouseover', this.onMouseOver.bind(this));
    element.addEventListener('mouseout', this.onMouseOut.bind(this));
    element.addEventListener('mousedown', this.onMouseDown.bind(this));
    element.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  setPosition (left, top) {
    this.element.style.left = left;
    this.element.style.top = top;
  }

  assign (piece) {
    this.piece = piece;
    this.element.appendChild(piece.element);
  }

  release () {
    const piece = this.piece;
    this.piece = null;
    this.element.removeChild(piece.element);
    return piece;
  }

  onMouseOver (e) {
    if (this.board.isLocked && this.board.isValidMove(this)) {
      this.addClass('chess-square-move-hover');
      return;
    }
    if (!this.piece || !this.moves.length || this.board.isLocked) {
      return;
    }
    this.addClass('chess-square-hover');
    this.moves.forEach(move => {
      const square = this.board.square(move.to);
      square.addClass('chess-square-move');
    });
  }

  onMouseOut (e) {
    if (this.board.isLocked && this.board.isValidMove(this)) {
      this.removeClass('chess-square-move-hover');
      return;
    }
    if (!this.piece || !this.moves.length || this.board.isLocked) {
      return;
    }
    this.removeClass('chess-square-hover');
    this.moves.forEach(move => {
      const square = this.board.square(move.to);
      square.removeClass('chess-square-move');
    });
  }

  onMouseDown (e) {
    if (!this.piece || !this.moves.length || this.board.isLocked) {
      return;
    }
    this.board.isLocked = true;
    this.board.fromSquare = this;
    return drag.start(this.piece, e);
  }

  onMouseUp (e) {
    if (!this.board.isLocked) {
      return;
    }
    if (!this.board.isValidMove(this)) {
      this.board.cancelMove();
      return;
    }
    drag.end();
    this.board.moveTo(this);
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  clearMoves () {
    this.moves = [];
  }

  addMove (move) {
    this.moves.push(move);
  }

  getMoveTo (coord) {
    return this.moves.find(move => move.to === coord);
  }

  movePieceTo (square) {
    const piece = this.release();
    square.assign(piece);
  }

  addClass (cssClass) {
    this.element.classList.add(cssClass);
  }

  removeClass (cssClass) {
    this.element.classList.remove(cssClass);
  }

  removeClasses () {
    this.removeClass('chess-square-hover');
    this.moves.forEach(move => {
      const square = this.board.square(move.to);
      square.removeClass('chess-square-move');
      square.removeClass('chess-square-move-hover');
    });
  }
}

export default Square;