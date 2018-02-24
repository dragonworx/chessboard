import Player from './player';

class RemotePlayer extends Player {
  move (turn, onDone) {
    // async call to remote service, pass turn with all info...
  }
}

export default RemotePlayer;