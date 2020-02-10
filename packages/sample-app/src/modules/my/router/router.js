import { LightningElement } from 'lwc';
import { parse, match, exec } from 'matchit';
import { createBrowserHistory } from 'history';

export default class Router extends LightningElement {
    routes = [];

    constructor() {
        super();

        this.addEventListener(
            'lwcerouter_addrouteeventlistener',
            this.addRoute.bind(this)
        );
        this.addEventListener(
            'lwcerouter_removeeventlistener',
            this.removeRoute.bind(this)
        );

        const history = (window.testHistory = createBrowserHistory());
        this.unlisten = history.listen((location, action) => {
            this.checkRoutes(location);
        });
    }

    disconnectedCallback() {
        this.unlisten();
    }

    addRoute(event) {
        this.routes.push({
            ...event.detail,
            parsedRoute: parse(event.detail.path)
        });
        this.checkRoutes(window.location);
    }

    removeRoute(event) {
        this.routes.push(event.detail);

        const indexToRemove = this.routes.findIndex(
            route =>
                route.path === detail.path && route.callback === detail.callback
        );

        if (routeToRemove === -1) console.warn('Cannot find route to remove!');
        else this.routes.splice(indexToRemove, 1);

        this.checkRoutes(window.location);
    }

    checkRoutes(location) {
        this.routes.map(route => {
            const found = match(location.pathname, [route.parsedRoute]);
            if (found && found.length) {
                const data = exec(location.pathname, found[0]);
                route.callback({ found: true, data });
            } else {
                route.callback({ found: false });
            }
        });
    }
}
