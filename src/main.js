import Game from './game';
import LocalPlayer from './player-local';

const game = window.game = new Game({
  container: 'board',
//  fen: 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19',
  showNotation: true,
  showToolbar: false,
  showStatus: true,
  heightScale: 1.3,
  size: 500,
  //white: new LocalPlayer('Evil White'),
  //black: new LocalPlayer('Brutal Black')
});

window.log = console.log;

//game.load(['[Event "Casual Game"]',
//  '[Site "Berlin GER"]',
//  '[Date "1852.??.??"]',
//  '[EventDate "?"]',
//  '[Round "?"]',
//  '[Result "1-0"]',
//  '[White "Adolf Anderssen"]',
//  '[Black "Jean Dufresne"]',
//  '[ECO "C52"]',
//  '[WhiteElo "?"]',
//  '[BlackElo "?"]',
//  '[PlyCount "47"]',
//  '',
//  '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
//  'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
//  'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
//  'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
//  '23.Bd7+ Kf8 24.Bxe7# 1-0'].join('\n'));

function resize () {
  game.setSize(Math.min(window.innerWidth, window.innerHeight * (1 / game.settings.heightScale)) - 20);
}

window.onresize = resize;
resize();

game.start();

// test UI
(() => {
  game.showDialog({
    heading: 'Abc',
    title:'title',
    modal: false
  });
  game.setMessage('Testing');
  game.status.setWhiteLabel(game.white.name);
  game.status.setBlackLabel(game.black.name);
  game.status.addWhitePiece(game.piece('a8').cloneElement());
  ['a1', 'b1', 'c1', 'd1', 'e1', 'g1', 'h2'].forEach(coord => game.status.addBlackPiece(game.piece(coord).cloneElement()));
})();