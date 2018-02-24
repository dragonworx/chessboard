import GameObject from './game-object';

let isDragging = false;
let drag = {
  piece: null,
  start: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
};

function onMouseMove (e) {
  const deltaX = e.clientX - drag.start.x + drag.start.offsetX;
  const deltaY = e.clientY - drag.start.y + drag.start.offsetY;
  setPiecePosition(deltaX, deltaY);
}

function onMouseUp (e) {
  if (GameObject.game.dialog.isOpen || !GameObject.game.board.isLocked) {
    return;
  }
  log('drag mouseup');
  restore();
  GameObject.game.board.cancelMove();
}

function setPiecePosition (deltaX, deltaY) {
  drag.piece.element.style.left = `${deltaX}px`;
  drag.piece.element.style.top = `${deltaY}px`;
}

function start (piece, e) {
  const r = piece.element.getBoundingClientRect();
  piece.element.classList.add('chess-dragging');
  drag.piece = piece;
  drag.start.x = e.clientX;
  drag.start.y = e.clientY;
  drag.start.width = piece.element.clientWidth;
  drag.start.height = piece.element.clientHeight;
  drag.start.offsetX = e.clientX - (r.left + (r.width * 0.5));
  drag.start.offsetY = e.clientY - (r.top + (r.height * 0.5));
  setPiecePosition(drag.start.offsetX, drag.start.offsetY);
  isDragging = true;
  window.addEventListener('mousemove', onMouseMove);
  e.preventDefault();
  return false;
}

function restore () {
  setPiecePosition(0, 0);
  drag.piece.element.classList.remove('chess-dragging');
}

function end () {
  restore();
  window.removeEventListener('mousemove', onMouseMove);
  isDragging = false;
}

window.addEventListener('mouseup', onMouseUp);

export default {
  start: start,
  restore: restore,
  end: end
}