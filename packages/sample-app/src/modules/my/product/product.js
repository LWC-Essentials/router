import { LightningElement, api, wire } from 'lwc';
import { routeParams, history } from '@lwce/router';

export default class Link extends LightningElement {
    @wire(routeParams) params;
    @wire(history) history;

    constructor() {
        super();
        this.target = this;
    }

    renderedCallback() {
        console.log(this.history);
    }
}
