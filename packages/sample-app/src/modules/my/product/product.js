import { LightningElement, api, wire } from 'lwc';
import { routeParams } from '../wire/wire.js';

export default class Link extends LightningElement {
  @wire(routeParams) params;
}
