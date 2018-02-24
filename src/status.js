import GameObject from './game-object';

class Status extends GameObject {
  constructor (game) {
    super(game);

    const element = GameObject.div('chess-status');
    element.innerHTML = `
        <div class="chess-status-players">
          <div class="chess-status-player chess-status-player-white"><label></label></div>
          <div class="chess-status-player chess-status-player-black"><label></label></div>
        </div>
        <div class="chess-status-message"><span></span></div>
    `.trim();
    this.message = element.querySelector('.chess-status-message span');
    this.whiteStatus = element.querySelector('.chess-status-player-white');
    this.whiteLabel = this.whiteStatus.querySelector('label');
    this.blackStatus = element.querySelector('.chess-status-player-black');
    this.blackLabel = this.blackStatus.querySelector('label');
    this.container.appendChild(element);
    this.element = element;
  }

  setMessage (html) {
    this.message.innerHTML = html;
  }

  setWhiteLabel (text) {
    this.whiteLabel.innerHTML = text;
  }

  setBlackLabel (text) {
    this.blackLabel.innerHTML = text;
  }

  addWhitePiece (element) {
    this.whiteStatus.appendChild(element);
  }

  addBlackPiece (element) {
    this.blackStatus.appendChild(element);
  }
}

export default Status;