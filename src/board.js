import GameObject from './game-object'
import Piece from './piece';
import Square from './square';
import drag from './drag';

const fileValues = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();
const rankValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

/**
 * Terminology:
 * - vertical/columns = "Files" (1,2,3,4,5,6,7,8)
 * - horizontal/rows = "Ranks" (a,b,c,d,e,f,g,h)
 */

class Board extends GameObject {
  constructor (game) {
    super(game);

    this.game.board = this;
    this.pieces = [];
    this.squares = new Map();
    this.moves = null;
    this.isLocked = false;

    // create board container
    const boardContainer = GameObject.div('chess-board-container');
    this.boardContainer = boardContainer;
    this.container.appendChild(boardContainer);

    // create board
    this.element = GameObject.div('chess-board');

    // create notation
    this.notationLeft = this.createNotationElement(fileValues, 'left');
    this.notationTop = this.createNotationElement(rankValues, 'top');
    this.notationRight = this.createNotationElement(fileValues, 'right');
    this.notationBottom = this.createNotationElement(rankValues, 'bottom');

    // create top row
    const topRow = GameObject.div('chess-container-top chess-notation-container');
    const topLeftSpacer = GameObject.div('chess-spacer');
    const topRightSpacer = GameObject.div('chess-spacer');
    topRow.appendChild(topLeftSpacer);
    topRow.appendChild(this.notationTop);
    topRow.appendChild(topRightSpacer);
    this.boardContainer.appendChild(topRow);

    // create middle row
    const middleRow = GameObject.div('chess-container-middle');
    middleRow.appendChild(this.notationLeft);
    middleRow.appendChild(this.element);
    middleRow.appendChild(this.notationRight);
    this.boardContainer.appendChild(middleRow);

    // create bottom row
    const bottomRow = GameObject.div('chess-container-bottom chess-notation-container');
    const bottomLeftSpacer = GameObject.div('chess-spacer');
    const bottomRightSpacer = GameObject.div('chess-spacer');
    bottomRow.appendChild(bottomLeftSpacer);
    bottomRow.appendChild(this.notationBottom);
    bottomRow.appendChild(bottomRightSpacer);
    this.boardContainer.appendChild(bottomRow);

    // create squares
    let isWhite = true;
    let left = 0;
    let top = 0;
    for (let rank = 8; rank >= 1; rank--) {
      for (let file = 97; file <= 104; file++) {
        // create square for coord
        const coord = `${String.fromCharCode(file)}${rank}`;
        const square = new Square(this.game, coord, isWhite);
        this.squares.set(coord, square);
        square.setPosition(`${left}%`, `${top}%`);
        left += 12.5;
        isWhite = !isWhite;
      }
      left = 0;
      top += 12.5;
      isWhite = !isWhite;
    }
  }

  square (coord) {
    return this.squares.get(coord);
  }

  clear () {
    this.pieces.forEach(piece => piece.remove());
    this.pieces = [];
  }

  setup () {
    this.clear();

    for (let rank = 8; rank >= 1; rank--) {
      for (let file = 97; file <= 104; file++) {
        const coord = `${String.fromCharCode(file)}${rank}`;
        // create piece at current coord based on starting FEN
        const pieceInfo = this.chess.get(coord);
        if (pieceInfo !== null) {
          const type = Piece.TYPE[pieceInfo.type];
          const piece = new Piece(this.game, type, pieceInfo.color, coord);
          this.pieces.push(piece);
        }
      }
    }
  }

  createNotationElement (values, side) {
    const notation = GameObject.div(`chess-notation chess-notation-${side} chess-notation-${side === 'left' || side === 'right' ? 'vertical' : 'horizontal'}${side === 'left' || side === 'right' ? ' chess-notation-container' : ''}`)
    let html = '';
    values.forEach(value => {
      html += `<div class="chess-notation-value"><span>${value}</span></div>`;
    });
    notation.innerHTML = html;
    return notation;
  }

  clearMoves () {
    this.moves = [];
  }

  cancelMove () {
    log("cancel move");
    this.isLocked = false;
    this.fromSquare = null;
    for (let square of this.squares.values()) {
      square.removeClasses();
    }
    drag.end();
  }

  selectMove (moves, onDone) {
    this.clearMoves();
    this.moves = moves;
    this.onMoveDone = onDone;
    moves.forEach(move => {
      const square = this.square(move.from);
      square.addMove(move);
    });
  }
  
  moveTo (toSquare) {
    const move = this.fromSquare.getMoveTo(toSquare.coord);
    if (move.isCapture) {
      toSquare.release();
    }
    this.fromSquare.movePieceTo(toSquare);
    this.isLocked = false;
    this.fromSquare = null;
    for (let square of this.squares.values()) {
      square.removeClasses();
      square.clearMoves();
    }
    drag.end();
    this.board.onMoveDone(move);
  }

  isValidMove (toSquare) {
    return this.moves.some(move => {
      const isValid = move.to === toSquare.coord;
      if (this.isLocked) {
        return isValid && (move.from === this.fromSquare.coord);
      }
      return isValid;
    });
  }
}

export default Board;