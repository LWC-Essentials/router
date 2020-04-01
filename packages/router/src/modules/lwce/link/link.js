import {LightningElement, api} from 'lwc';

export default class Link extends LightningElement {
  @api title;
  @api href;
  @api role;
  @api ariaPressed;

  get className() {
    return this.getAttribute('class');
  }

  navigate(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('lwcerouter_navigate', {
        detail: this.href,
        bubbles: true,
        composed: true,
      }),
    );
  }
}
