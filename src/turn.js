import Piece from './piece';

class Turn {
  constructor(game) {
    const chess = game.chess;
    this.isWhite = chess.turn() === Piece.WHITE;
    this.isBlack = !this.isWhite;
    this.fen = chess.fen();
    this.pgn = chess.pgn();
    this.history = chess.history();
    const moves = chess.moves({verbose:true});
    this.moves = moves.map(move =>
      ({
        from: move.from,
        to: move.to,
        piece: move.piece,
        flags: move.flags,
        captured: move.captured,
        promotion: move.promotion,
        isNonCapture: move.flags.indexOf('n') > -1,
        isPawnPush2Squares: move.flags.indexOf('b') > -1,
        isEnPassantCapture: move.flags.indexOf('e') > -1,
        isCapture: move.flags.indexOf('c') > -1,
        isPromotion: move.flags.indexOf('p') > -1,
        isKingsideCastling: move.flags.indexOf('k') > -1,
        isQueensideCastling: move.flags.indexOf('q') > -1,
      })
    );
  }
}

export default Turn;