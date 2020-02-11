import { LightningElement, api } from 'lwc';
import route from './route.html';
import empty from './empty.html';

export default class Route extends LightningElement {
    @api path;

    routeParams = {};
    rendered = false;
    wireAdapters = [];

    constructor() {
        super();
        this._routeChange = this.routeChange.bind(this);

        this.addEventListener(
            'lwcerouter_addwireadapter',
            this.addWireAdapter.bind(this)
        );

        this.addEventListener(
            'lwcerouter_removewireadapter',
            this.removeWireAdapter.bind(this)
        );
    }

    render() {
        return this.rendered ? route : empty;
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

    routeChange({ found, data = {} }) {
        this.rendered = found;
        this.routeParams = data;
        this.sendRouteParams();
    }

    addWireAdapter(event) {
        event.stopPropagation();
        this.wireAdapters.push(event.detail);
        this.sendRouteParams();
    }

    removeWireAdapter(event) {
        event.stopPropagation();
        this.wireAdapters.splice(this.wireAdapters.indexOf(event.detail), 1);
    }

    sendRouteParams() {
        this.wireAdapters.forEach(adapter => adapter(this.routeParams));
    }
}
