let playerCount = 1;

class Player {
  constructor (name = `Player ${playerCount++}`) {
    this.name = name;
  }

  move (turn, onDone) {
    throw new Error('Player move method unimplemented');
  }
}

export default Player;