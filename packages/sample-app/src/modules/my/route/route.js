import { LightningElement, api } from 'lwc';

export default class Route extends LightningElement {
    @api
    path;

    rendered = false;

    constructor() {
        super();
        this._routeChange = this.routeChange.bind(this);
    }

    connectedCallback() {
        this.dispatchEvent(
            new CustomEvent('lwcerouter_addrouteeventlistener', {
                detail: {
                    path: this.path,
                    callback: this._routeChange
                },
                bubbles: true,
                composed: true
            })
        );
    }

    disconnectedCallback() {
        this.dispatchEvent(
            new CustomEvent('lwcerouter_removeeventlistener', {
                detail: {
                    path: this.path,
                    callback: this._routeChange
                },
                bubbles: true,
                composed: true
            })
        );
    }

    routeChange({ found, data }) {
        this.rendered = found;
    }

    setThis() {
        this.rendered = !this.rendered;
    }
}
