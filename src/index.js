class Key {
  constructor(key, code) {
    this.key = key;
    this.code = code;
  }

  getVisualPresentation() {
    const keys = { Tab: '\t' };
    return keys[this.key] || this.key;
  }

  render() {
    return `<div class='key ${this.code}'>${this.key}</div>`;
  }
}

class Keyboard {
  constructor() {
    this.keysList = [
      { key: '`', code: 'BackQuote' }, { key: '1', code: 'Digit1' },
      { key: '2', code: 'Digit2' }, { key: '3', code: 'Digit3' },
      { key: '4', code: 'Digit4' }, { key: '5', code: 'Digit5' },
      { key: '6', code: 'Digit6' }, { key: '7', code: 'Digit7' },
      { key: '8', code: 'Digit8' }, { key: '9', code: 'Digit9' },
      { key: '0', code: 'Digit0' }, { key: '-', code: 'Minus' },
      { key: '=', code: 'Equal' }, { key: 'Backspace', code: 'Backspace' },
      { key: 'Tab', code: 'Tab' }, { key: 'q', code: 'KeyQ' },
      { key: 'w', code: 'KeyW' }, { key: 'e', code: 'KeyE' },
      { key: 'r', code: 'KeyR' }, { key: 't', code: 'KeyT' },
      { key: 'y', code: 'KeyY' }, { key: 'u', code: 'KeyU' },
      { key: 'i', code: 'KeyI' }, { key: 'o', code: 'KeyO' },
      { key: 'p', code: 'KeyP' }, { key: '[', code: 'BracketLeft' },
      { key: ']', code: 'BracketRight' }, { key: '\\', code: 'BackSlash' },
      { key: 'Del', code: 'Delete', class: 'del-key' },
      { key: 'CapsLock', code: 'CapsLock' }, { key: 'a', code: 'KeyA' },
      { key: 's', code: 'KeyS' }, { key: 'd', code: 'KeyD' },
      { key: 'f', code: 'KeyF' }, { key: 'g', code: 'KeyG' },
      { key: 'h', code: 'KeyH' }, { key: 'j', code: 'KeyJ' },
      { key: 'k', code: 'KeyK' }, { key: 'l', code: 'KeyL' },
      { key: ';', code: 'Semicolon' }, { key: "'", code: 'Quote' },
      { key: 'Enter', code: 'Enter' }, { key: 'Shift', code: 'ShiftLeft' },
      { key: 'z', code: 'KeyZ' }, { key: 'x', code: 'KeyX' },
      { key: 'c', code: 'KeyC' }, { key: 'v', code: 'KeyV' }, { key: 'b', code: 'KeyB' },
      { key: 'n', code: 'KeyN' }, { key: 'm', code: 'KeyM' }, { key: ',', code: 'Comma' },
      { key: '.', code: 'Period' }, { key: '/', code: 'Slash' },
      { key: '&#9650', code: 'ArrowUp' }, { key: 'Shift', code: 'ShiftRight' },
      { key: 'Ctrl', code: 'ControlLeft' }, { key: 'Win', code: 'MetaLeft' },
      { key: 'Alt', code: 'AltRight' }, { key: ' ', code: 'Space' },
      { key: 'Alt', code: 'AltLeft' }, { key: '&#9664', code: 'ArrowLeft' }, { key: '&#9660', code: 'ArrowDown' },
      { key: '&#9658', code: 'ArrowUp' }, { key: 'Ctrl', code: 'ControlRight' }];
  }

  render() {
    let element = document.createElement('textarea');
    element.className = 'keyboard-display';
    element.readOnly = true;
    document.body.append(element);
    element = document.createElement('div');
    element.className = 'keyboard';
    let keyboardHtml = '';
    this.keysList.forEach((key) => { keyboardHtml += (new Key(key.key, key.code)).render(); });
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

  getKeyDomElementByEventKey(eventKey) {
    return Array.from(document.querySelectorAll('.keyboard .key')).filter((element) => element.textContent === eventKey).shift();
  }
}

const keyboard = new Keyboard();
keyboard.render();

const addKeyDownEventHandler = function () {
  document.addEventListener('keydown', (event) => {
    keyboard.renderPressedKey(event.key);
    keyboard.getKeyDomElementByEventKey(event.key);
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  });
};

window.onload = function (e) {
  addKeyDownEventHandler();
};
