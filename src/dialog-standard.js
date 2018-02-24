import GameObject from './game-object';

class StandardAlert {
  constructor (settings) {
    // create layout
    const element = GameObject.div('chess-dialog-standard');
    element.innerHTML = `
        <header></header>
        <div class="chess-dialog-standard-body"></div>
        <footer></footer>
    `.trim();
    this.header = element.querySelector('header');
    this.body = element.querySelector('div');
    this.footer = element.querySelector('footer');
    this.element = element;

    // set header
    if (settings.heading) {
      this.header.innerHTML = settings.heading;
    }

    // set body
    this.body.innerHTML = settings.title || '';

    // add buttons
    (settings.buttons || [{text:'Close', click: () => GameObject.game.hideDialog()}]).forEach((buttonDescriptor, i) => {
      const button = GameObject.button(buttonDescriptor.text);
      if (buttonDescriptor.click) {
        button.addEventListener('click', e => {
          buttonDescriptor.click(e);
          e.preventDefault();
          e.stopPropagation();
          return false;
        });
      }
      this.footer.appendChild(button);
      if (i === 0) {
        button.setAttribute('autofocus', 'true');
      }
    });
  }
}

export default StandardAlert;