import { modal, closeModalBtn, gameArea } from './createLayout.js';

export default class Modal {
  constructor(element) {
    this.element = element;
    this.modal = modal;
    this.message;
    this.overlay = overlay;
    this.component;
  }

  create(element, message) {
    modal.innerHTML = '';
    modal.appendChild(closeModalBtn);
    let component = document.createElement(element);
    component.innerHTML = message;
    component.classList.add('modal-body');
    modal.appendChild(component);
    modal.classList.add('active');
    overlay.classList.add('active');
    gameArea.appendChild(modal);
  }

  append(component) {
    this.modal.appendChild(component);
  }

  close() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
}
