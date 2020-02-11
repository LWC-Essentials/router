import { LightningElement, api, wire } from 'lwc';
import { routeParams } from '@lwce/router';

export default class Link extends LightningElement {
  @wire(routeParams) params;
}
