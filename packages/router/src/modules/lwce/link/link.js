import {LightningElement, api} from 'lwc';

export default class Link extends LightningElement {
  @api title;

  @api href;

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
