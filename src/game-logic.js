import GameObject from './game-object';
import Turn from './turn';
import Piece from './piece';

class GameLogic extends GameObject {
  constructor (game) {
    super(game);
  }

  nextMove () {
    const nextMove = () => {
      // next player make a move...
      const turn = new Turn(this.game);
      log('turn', turn);
      const onDone = move => {
        move = turn.moves.find(mv => mv.from === move.from && mv.to === move.to);
        log('move', move);
        const result = this.chess.move(move);
        if (result === null) {
          // TODO: handle invalid move - repeat move to same player?
        }
        this.nextMove();
      };
      if (turn.isWhite) {
        this.white.move(turn, onDone);
      } else {
        this.black.move(turn, onDone);
      }
    };

    setTimeout(() => {
      if (this.chess.game_over()) {
        return this.gameOver();
      } else if (this.chess.in_check()) {
        this.inCheck();
      } else if (this.chess.in_checkmate()) {
        // TODO: game over...
        return this.inCheckMate();
      } else if (this.chess.in_draw()) {
        this.inDraw();
      } else if (this.chess.in_stalemate()) {
        this.inStalemate();
      } else if (this.chess.in_threefold_repetition()) {
        this.inThreeFoldRepetition();
      } else if (this.chess.insufficient_material()) {
        this.insufficientMaterial();
      }
      nextMove();
    }, 0);
  }

  gameOver () {
    // TODO: figure out winner, offer restart option (new dialog type?)
    const result = 'Player 1 won';
    this.game.showDialog({
      heading: 'Game Over',
      title: result,
      modal: true
    });
  }

  inCheck () {
    this.game.showDialog({
      heading: `${this.isWhite ? 'White' : 'Black'} is in check!`,
      title: null,
      modal: false
    });
  }

  inCheckMate () {
    this.game.showDialog({
      heading: `Checkmate!`,
      title: `${!this.isWhite ? 'White' : 'Black'} wins!`,
      modal: false
    });
  }

  inDraw () {

  }

  inStalemate () {

  }

  inThreeFoldRepetition () {

  }

  insufficientMaterial () {

  }

  get isWhite () {
    return this.chess.turn() === Piece.WHITE;
  }

  get isBlack () {
    return !this.isWhite;
  }
}

export default GameLogic;