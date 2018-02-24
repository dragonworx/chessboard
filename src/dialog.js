import GameObject from './game-object';
import StandardDialog from './dialog-standard';

const TRANSITION_END = (function () {
  let t;
  const el = document.createElement('fakeelement');
  const transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  };

  for (t in transitions) {
    if(el.style[t] !== undefined) {
      return transitions[t];
    }
  }
})();

class Dialog extends GameObject {
  constructor (game) {
    super(game);

    // create group container
    const wrapper = GameObject.div('chess-dialog-wrapper');
    wrapper.style.display = 'none';
    this.wrapper = wrapper;
    this.container.appendChild(wrapper);

    // create overlay
    const overlay = GameObject.div('chess-dialog-overlay');
    wrapper.appendChild(overlay);

    // create flex container
    const container = GameObject.div('chess-dialog-container');
    wrapper.appendChild(container);

    // create dialog element
    const element = GameObject.div('chess-dialog-content');
    container.appendChild(element);
    this.element = element;

    this.isOpen = false;
    this.modal = false;
    this.isClosing = false;

    // listen for transition end of opacity to cleanup hidden state
    document.body.addEventListener(TRANSITION_END, e => {
      if (e.target === this.wrapper) {
        if (this.isClosing) {
          this.wrapper.style.display = 'none';
          this.isOpen = false;
          this.isClosing = false;
        }
      }
    }, true);

    // set event listeners
    window.addEventListener('keyup', e => {
      if (this.isOpen) {
        if (!this.modal && e.keyCode === 27) {
          this.hide();
        }
      }
    });
    container.addEventListener('click', e => {
      if (this.isOpen && !this.modal && e.target.classList.contains('chess-dialog-container')) {
          this.hide();
      }
    });
  }

  show () {
    this.wrapper.removeAttribute('style');
    setTimeout(() => {
      this.wrapper.style.opacity = 1;
      this.isOpen = true;
    }, 0);
  }

  hide () {
    this.wrapper.style.opacity = 0;
    this.isClosing = true;
  }

  setInstance (instance) {
    this.element.innerHTML = '';
    this.element.appendChild(instance.element);
  }

  load (type, settings) {
    this.modal = settings.hasOwnProperty('modal') ? settings.modal : this.modal;
    if (type === Dialog.ALERT) {
      this.setInstance(new StandardDialog(settings));
    }
    this.element.setAttribute('class', `chess-dialog-content ${type}`);
  }
}

Dialog.ALERT = 'alert';

export default Dialog;