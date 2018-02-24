import Chess from 'chess.js';
import Board from './board';
import Dialog from './dialog';
import Toolbar from './toolbar';
import Status from './status';
import Piece from './piece';
import LocalPlayer from './player-local';
import RemotePlayer from './player-remote';
import GameObject from './game-object';
import GameLogic from './game-logic';

const defaultSettings = {
  heightScale: 1.3,
  showNotation: false
};

class Game {
  constructor (settings = {}) {
    this.settings = {...defaultSettings, ...settings};

    // establish container
    this.element = typeof settings.container === 'string' ? document.getElementById(settings.container) : settings.container;
    this.element.classList.add('chess');

    this.container = GameObject.div('chess-container');
    this.element.appendChild(this.container);

    // initialise chess engine
    this.chess = new Chess(settings.fen);

    // initialise game logic
    this.logic = new GameLogic(this);

    // load PGN if provided
    if (settings.pgn) {
      if (!this.chess.load_pgn(settings.pgn)) {
        throw new Error('Cannot load chess game - invalid PGN!');
      }
    }

    // create toolbar
    this.toolbar = new Toolbar(this);

    // create board
    this.board = new Board(this, settings);

    // create toolbar
    this.status = new Status(this);

    // create dialog
    this.dialog = new Dialog(this);

    // initialise players
    this.white = settings.white || new LocalPlayer();
    this.black = settings.black || new LocalPlayer();
    this.white.color = Piece.WHITE;
    this.black.color = Piece.BLACK;

    // setup board
    this.board.setup();

    // set size if given
    if (settings.size) {
      this.setSize(settings.size);
    }

    // apply visual settings
    this.applyVisualSettings();
  }

  applyVisualSettings () {
    // show/hide notation
    if (this.settings.showNotation) {
      this.container.classList.remove('chess-hide-notation');
    } else {
      this.container.classList.add('chess-hide-notation');
    }

    // show/hide toolbar
    if (this.settings.showToolbar) {
      this.container.classList.remove('chess-hide-toolbar');
    } else {
      this.container.classList.add('chess-hide-toolbar');
    }

    // show/hide status
    if (this.settings.showStatus) {
      this.container.classList.remove('chess-hide-status');
    } else {
      this.container.classList.add('chess-hide-status');
    }
  }

  updateVisualSettings(settings) {
    this.settings.showNotation = settings.hasOwnProperty('showNotation') ? settings.showNotation : this.settings.showNotation;
    this.settings.showToolbar = settings.hasOwnProperty('showToolbar') ? settings.showToolbar : this.settings.showToolbar;
    this.settings.showStatus = settings.hasOwnProperty('showStatus') ? settings.showStatus : this.settings.showStatus;
    this.applyVisualSettings();
  }

  load (pgn, options) {
    this.chess.load_pgn(pgn, options);
    this.board.setup();
  }

  clear () {
    this.chess.clear();
    this.board.clear();
  }

  start () {
    this.logic.nextMove();
  }

  setSize (size) {
    this.container.style.width = `${size}px`;
    this.container.style.height = `${size * this.settings.heightScale}px`;
  }

  setMessage (message) {
    this.status.setMessage(message);
  }

  showDialog (settings = {}) {
    this.dialog.load(settings.type || Dialog.ALERT, settings);
    this.dialog.show();
  }

  hideDialog () {
    this.dialog.hide();
  }

  piece (coord) {
    return this.board.square(coord).piece;
  }
}

Game.LocalPlayer = LocalPlayer;
Game.RemotePlayer = RemotePlayer;

// TODO: transparent dialog type for custom client overlay elements?
Game.ALERT = Dialog.ALERT;

export default Game;