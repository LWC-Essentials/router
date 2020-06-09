import { LightningElement, api, wire } from 'lwc';
import { routeParams } from '@lwce/router';

export default class Link extends LightningElement {
    @wire(routeParams, { target: '$target' }) params;

    constructor() {
        super();
        this.target = this;
    }
}
