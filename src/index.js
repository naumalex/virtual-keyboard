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
    const keys = { Tab: '\t' };
    let visualPresentation = keys[this.key] || ((this.lang === 'english') || (!this.otherLangKey)) ? this.key : this.otherLangKey;
    if (this.isShowUpperCase(isCapsLockOn, isShiftPressed)) {
      visualPresentation = visualPresentation.toUpperCase();
    }
    return visualPresentation;
  }

  render() {
    const key = (this.lang === 'russian') && (this.otherLangKey) ? this.otherLangKey : this.key;
    return `<div class='key ${this.code}'>${key.toUpperCase()}</div>`;
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
      { key: '&#9650', code: 'ArrowUp' }, { key: 'Shift', code: 'ShiftRight' },
      { key: 'Ctrl', code: 'ControlLeft' }, { key: 'Win', code: 'MetaLeft' },
      { key: 'Alt', code: 'AltRight' }, { key: ' ', code: 'Space' },
      { key: 'Alt', code: 'AltLeft' }, { key: '&#9664', code: 'ArrowLeft' },
      { key: '&#9660', code: 'ArrowDown' }, { key: '&#9658', code: 'ArrowUp' },
      { key: 'Ctrl', code: 'ControlRight' }];
  }

  render() {
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
          .render();
      },
    );
    element.innerHTML = keyboardHtml;
    document.body.append(element);
  }

  renderPressedKey(code, isCapsLockOn, isShiftPressed) {
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
      .getVisualPresentation(isCapsLockOn, isShiftPressed);
    element.textContent += keyVisualRepresentation;
  }

  getDisplayArea() {
    return document.querySelector('.keyboard-display');
  }

  getKeyDomElementByEventCode(eventCode) {
    return document.querySelector(`.${eventCode}`);
  }

  toggleKeyActiveStatus(keyCode, isTemporaryActive) {
    const element = this.getKeyDomElementByEventCode(keyCode);
    element.classList.toggle('active');
    if (isTemporaryActive) {
      setTimeout((activeKey) => activeKey.classList.toggle('active'), 500, element);
    }
  }

  isCapsLockOn() {
    const element = this.getKeyDomElementByEventCode('CapsLock');
    return element.classList.contains('active');
  }

  switchlanguage() {
    this.language = this.language === 'english' ? 'russian' : 'english';
    sessionStorage.setItem('valueDisplayedInDisplayArea', this.getDisplayArea().textContent);
    const isCapsLockOn = this.isCapsLockOn();
    this.render();
    if (isCapsLockOn) {
      this.toggleKeyActiveStatus('CapsLock');
    }
  }
}

const keyboard = new Keyboard();
keyboard.render();

const addKeyDownEventHandler = function () {
  document.addEventListener('keydown', (event) => {
    let isTemporaryChange = true;
    // let isCapsLockOn = event.getModifierState('CapsLock');
    const isCapsLockOn = keyboard.isCapsLockOn();
    keyboard.renderPressedKey(event.code, isCapsLockOn, event.shiftKey);

    if (event.code === 'CapsLock') {
      isTemporaryChange = false;
    }
    keyboard.toggleKeyActiveStatus(event.code, isTemporaryChange);
    if (event.altKey && event.ctrlKey) {
      keyboard.switchlanguage();
    }
    if (event.code === 'Tab') {
      event.preventDefault();
    }
  });
};

window.onload = function () {
  addKeyDownEventHandler();
};
