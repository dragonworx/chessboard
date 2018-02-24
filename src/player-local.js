/**
 * A human player local to the client, who can interact with the default board
 */

import Player from './player';
import GameObject from './game-object'

class LocalPlayer extends Player {
  move (turn, onDone) {
    // get available moves
    // enable drag on legal move pieces
    // wait for valid drop
    // set that move

    GameObject.game.board.selectMove(turn.moves, move => {
      onDone({
        from: move.from,
        to: move.to,
        promotion: null
      })
    });
  }
}

export default LocalPlayer;