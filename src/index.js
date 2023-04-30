class Key {
  constructor(eventKey, isShift) {
    this.eventKey = eventKey;
    this.isShift = isShift;
  }

  getVisualPresentation() {
    const keys = { Tab: '\t' };
    return keys[this.eventKey] || this.eventKey;
  }
}

class Keyboard {
  constructor() {
    this.keysList = [{ key: '`', class: 'back-tick-key' }, { key: '1', class: 'default-key' },
      { key: '2', class: 'default-key' }, { key: '3', class: 'default-key' }, { key: '4', class: 'default-key' },
      { key: '5', class: 'default-key' }, { key: '6', class: 'default-key' }, { key: '7', class: 'default-key' },
      { key: '8', class: 'default-key' }, { key: '9', class: 'default-key' }, { key: '0', class: 'default-key' },
      { key: '-', class: 'default-key' }, { key: '=', class: 'default-key' }, { key: 'Backspace', class: 'backspace-key highlighted' },
      { key: 'Tab', class: 'tab-key' }, { key: 'q', class: 'default-key' }, { key: 'w', class: 'default-key' },
      { key: 'e', class: 'default-key' }, { key: 'r', class: 'default-key' }, { key: 't', class: 'default-key' },
      { key: 'y', class: 'default-key' }, { key: 'u', class: 'default-key' }, { key: 'i', class: 'default-key' },
      { key: 'o', class: 'default-key' }, { key: 'p', class: 'default-key' }, { key: '[', class: 'default-key' },
      { key: ']', class: 'default-key' }, { key: '\\', class: 'default-key' }, { key: 'Del', class: 'del-key' },
      { key: 'CapsLock', class: 'capslock-key' }, { key: 'a', class: 'default-key' }, { key: 's', class: 'default-key' },
      { key: 'd', class: 'default-key' }, { key: 'f', class: 'default-key' }, { key: 'g, ', class: 'default-key' },
      { key: 'h', class: 'default-key' }, { key: 'j', class: 'default-key' }, { key: 'k', class: 'default-key' },
      { key: 'l', class: 'default-key' }, { key: ';', class: 'default-key' }, { key: "'", class: 'default-key' },
      { key: 'Enter', class: 'enter-key' }, { key: 'Shift', class: 'left-shift-key' },
      { key: 'z', class: 'default-key' }, { key: 'x', class: 'default-key' }, { key: 'c', class: 'default-key' },
      { key: 'v', class: 'default-key' }, { key: 'v', class: 'default-key' }, { key: 'b', class: 'default-key' },
      { key: 'n', class: 'default-key' }, { key: 'm', class: 'default-key' }, { key: ',', class: 'default-key' },
      { key: '.', class: 'default-key' }, { key: '/', class: 'default-key' }, { key: '&#9650', class: 'default-key' },
      { key: 'Shift', class: 'right-shift-key' }, { key: 'Ctrl', class: 'default-key' }, { key: 'Win', class: 'default-key' },
      { key: 'Alt', class: 'default-key' }, { key: ' ', class: 'space-key' }, { key: 'Alt', class: 'default-key' },
      { key: '&#9664', class: 'default-key' }, { key: '&#9660', class: 'default-key' }, { key: '&#9658', class: 'default-key' },
      { key: 'Ctrl', class: 'default-key' }];
  }

  render() {
    let element = document.createElement('textarea');
    element.className = 'keyboard-display';
    element.readOnly = true;
    document.body.append(element);
    element = document.createElement('div');
    element.className = 'keyboard';
    let keyboardHtml = '';
    this.keysList.forEach((key) => { keyboardHtml += `<div class='key ${key.class}'>${key.key}</div>`; });
    element.innerHTML = keyboardHtml;
    document.body.append(element);
  }

  renderPressedKey(key) {
    const element = this.getDisplayArea();
    if (key === 'Backspace') {
      element.textContent = element.textContent.slice(0, -1);
      return;
    }

    if (key === 'Delete') {
      element.textContent = element.textContent.slice(0, element.selectionStart)
      + element.textContent.slice(element.selectionEnd);
      return;
    }

    const keyVisualRepresentation = (new Key(key)).getVisualPresentation();
    element.textContent += keyVisualRepresentation;
  }

  getDisplayArea() {
    return document.querySelector('.keyboard-display');
  }
}

const keyboard = new Keyboard();
keyboard.render();

const addKeyDownEventHandler = function () {
  document.addEventListener('keydown', (event) => {
    keyboard.renderPressedKey(event.key);
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  });
};

window.onload = function (e) {
  addKeyDownEventHandler();
};
