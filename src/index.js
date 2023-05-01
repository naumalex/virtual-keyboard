class Key {
  constructor(key, code, otherLangKey, lang) {
    this.key = key;
    this.code = code;
    this.otherLangKey = otherLangKey;
    this.lang = lang || 'english';
  }

  isShowUpperCase(isCapsLockOn, isShiftPressed) {
    return (isCapsLockOn && !isShiftPressed) || (!isCapsLockOn && isShiftPressed);
  }

  getVisualPresentation(isCapsLockOn, isShiftPressed) {
    const keys = {
      Tab: '\t',
      CapsLock: '',
      Enter: '\n',
      Shift: '',
      Ctrl: '',
      Win: '',
      Alt: '',
    };
    if (!(keys[this.key] === undefined)) {
      return keys[this.key];
    }

    let visualPresentation = ((this.lang === 'english')
      || (!this.otherLangKey)) ? this.key : this.otherLangKey;

    if (this.isShowUpperCase(isCapsLockOn, isShiftPressed)) {
      visualPresentation = visualPresentation.toUpperCase();
    }
    return visualPresentation;
  }

  render(isCapsLockOn) {
    let key = (this.lang === 'russian') && (this.otherLangKey) ? this.otherLangKey : this.key;
    // only alpha characters to show uppercase
    if (this.isShowUpperCase(isCapsLockOn) && this.otherLangKey) {
      key = key.toUpperCase();
    }
    return `<div class='key ${this.code}'>${key}</div>`;
  }
}

class Keyboard {
  static language;

  constructor() {
    this.language = this.language || 'english';
    this.keysList = [
      { key: '`', code: 'BackQuote' }, { key: '1', code: 'Digit1' },
      { key: '2', code: 'Digit2' }, { key: '3', code: 'Digit3' },
      { key: '4', code: 'Digit4' }, { key: '5', code: 'Digit5' },
      { key: '6', code: 'Digit6' }, { key: '7', code: 'Digit7' },
      { key: '8', code: 'Digit8' }, { key: '9', code: 'Digit9' },
      { key: '0', code: 'Digit0' }, { key: '-', code: 'Minus' },
      { key: '=', code: 'Equal' }, { key: 'Backspace', code: 'Backspace' },
      { key: 'Tab', code: 'Tab' }, { key: 'q', otherLangKey: 'й', code: 'KeyQ' },
      { key: 'w', otherLangKey: 'ц', code: 'KeyW' }, { key: 'e', otherLangKey: 'у', code: 'KeyE' },
      { key: 'r', otherLangKey: 'k', code: 'KeyR' }, { key: 't', otherLangKey: 'е', code: 'KeyT' },
      { key: 'y', otherLangKey: 'н', code: 'KeyY' }, { key: 'u', otherLangKey: 'г', code: 'KeyU' },
      { key: 'i', otherLangKey: 'ш', code: 'KeyI' }, { key: 'o', otherLangKey: 'щ', code: 'KeyO' },
      { key: 'p', otherLangKey: 'з', code: 'KeyP' }, { key: '[', code: 'BracketLeft' },
      { key: ']', code: 'BracketRight' }, { key: '\\', code: 'BackSlash' },
      { key: 'Del', code: 'Delete', class: 'del-key' },
      { key: 'CapsLock', code: 'CapsLock' }, { key: 'a', otherLangKey: 'ф', code: 'KeyA' },
      { key: 's', otherLangKey: 'ы', code: 'KeyS' }, { key: 'd', otherLangKey: 'в', code: 'KeyD' },
      { key: 'f', otherLangKey: 'а', code: 'KeyF' }, { key: 'g', otherLangKey: 'п', code: 'KeyG' },
      { key: 'h', otherLangKey: 'р', code: 'KeyH' }, { key: 'j', otherLangKey: 'о', code: 'KeyJ' },
      { key: 'k', otherLangKey: 'л', code: 'KeyK' }, { key: 'l', otherLangKey: 'д', code: 'KeyL' },
      { key: ';', code: 'Semicolon' }, { key: "'", code: 'Quote' },
      { key: 'Enter', code: 'Enter' }, { key: 'Shift', code: 'ShiftLeft' },
      { key: 'z', otherLangKey: 'я', code: 'KeyZ' }, { key: 'x', otherLangKey: 'ч', code: 'KeyX' },
      { key: 'c', otherLangKey: 'с', code: 'KeyC' }, { key: 'v', otherLangKey: 'м', code: 'KeyV' },
      { key: 'b', otherLangKey: 'и', code: 'KeyB' },
      { key: 'n', otherLangKey: 'т', code: 'KeyN' }, { key: 'm', otherLangKey: 'ь', code: 'KeyM' }, { key: ',', otherLangKey: 'б', code: 'Comma' },
      { key: '.', otherLangKey: 'ю', code: 'Period' }, { key: '/', code: 'Slash' },
      { key: '&#9650;', code: 'ArrowUp' }, { key: 'Shift', code: 'ShiftRight' },
      { key: 'Ctrl', code: 'ControlLeft' }, { key: 'Win', code: 'MetaLeft' },
      { key: 'Alt', code: 'AltRight' }, { key: ' ', code: 'Space' },
      { key: 'Alt', code: 'AltLeft' }, { key: '&#9664;', code: 'ArrowLeft' },
      { key: '&#9660;', code: 'ArrowDown' }, { key: '&#9654;', code: 'ArrowRight' },
      { key: 'Ctrl', code: 'ControlRight' }];
  }

  render() {
    const isCapsLockOn = this.isCapsLockOn();
    document.body.innerHTML = '';
    let element = document.createElement('textarea');
    element.className = 'keyboard-display';
    element.readOnly = true;
    element.textContent = sessionStorage.getItem('valueDisplayedInDisplayArea') || '';
    sessionStorage.setItem('valueDisplayedInDisplayArea', '');
    document.body.append(element);
    element = document.createElement('div');
    element.className = 'keyboard';
    let keyboardHtml = '';
    this.keysList.forEach(
      (key) => {
        keyboardHtml += (new Key(key.key, key.code, key.otherLangKey, this.language))
          .render(isCapsLockOn);
      },
    );
    element.innerHTML = keyboardHtml;
    document.body.append(element);
  }

  renderPressedKey(code, isShiftPressed) {
    const element = this.getDisplayArea();
    if (code === 'Backspace') {
      element.textContent = element.textContent.slice(0, -1);
      return;
    }
    if (code === 'Delete') {
      element.textContent = element.textContent.slice(0, element.selectionStart)
      + element.textContent.slice(element.selectionEnd);
      return;
    }
    const keyItem = this.keysList.find((key) => key.code === code);
    const keyVisualRepresentation = (new Key(
      keyItem.key,
      keyItem.code,
      keyItem.otherLangKey,
      this.language,
    ))
      .getVisualPresentation(this.isCapsLockOn(), isShiftPressed);
    element.innerHTML += keyVisualRepresentation;
  }

  getDisplayArea() {
    return document.querySelector('.keyboard-display');
  }

  getKeyboardElement() {
    return document.querySelector('.keyboard');
  }

  getKeyDomElementByEventCode(eventCode) {
    return document.querySelector(`.${eventCode}`);
  }

  hightlightKey(keyCode) {
    let isTemporaryChange = true;
    if (keyCode === 'CapsLock') {
      isTemporaryChange = false;
    }
    const element = this.getKeyDomElementByEventCode(keyCode);
    element.classList.toggle('active');
    if (isTemporaryChange) {
      setTimeout((activeKey) => activeKey.classList.toggle('active'), 500, element);
    }
  }

  switchCapsLock() {
    sessionStorage.setItem('valueDisplayedInDisplayArea', this.getDisplayArea().textContent);
    const isCapsLockOn = this.isCapsLockOn();
    this.render();
    if (isCapsLockOn) {
      this.hightlightKey('CapsLock');
    }
  }

  isCapsLockOn() {
    const element = this.getKeyDomElementByEventCode('CapsLock');
    return element && element.classList.contains('active');
  }

  switchlanguage() {
    this.language = this.language === 'english' ? 'russian' : 'english';
    sessionStorage.setItem('valueDisplayedInDisplayArea', this.getDisplayArea().textContent);
    const isCapsLockOn = this.isCapsLockOn();
    this.render();
    if (isCapsLockOn) {
      this.hightlightKey('CapsLock');
    }
  }
}

const keyboard = new Keyboard();
keyboard.render();

const addKeyDownEventHandler = function () {
  document.addEventListener('keydown', (event) => {
    keyboard.renderPressedKey(event.code, event.shiftKey);
    keyboard.hightlightKey(event.code);
    if (event.code === 'CapsLock') {
      keyboard.switchCapsLock();
    }
    if (event.altKey && event.ctrlKey) {
      keyboard.switchlanguage();
    }
    if (event.code === 'Tab') {
      event.preventDefault();
    }
  });
};

const mouseClickEventHandler = function (event) {
  if (!event.target.classList.contains('key')) {
    return;
  }
  const keyCode = event.target.classList[1];
  keyboard.renderPressedKey(keyCode, event.shiftKey);
  keyboard.hightlightKey(keyCode);
};

const addMouseClickEventHandler = function () {
  document.addEventListener('click', mouseClickEventHandler);
};

window.onload = function () {
  addKeyDownEventHandler();
  addMouseClickEventHandler();
};
