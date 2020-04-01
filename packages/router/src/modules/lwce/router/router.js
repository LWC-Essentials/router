import {LightningElement, api} from 'lwc';
import {createBrowserHistory} from 'history';
import matchPath from './matchPath.js';

export default class Router extends LightningElement {
  @api base = '';

  routes = [];

  constructor() {
    super();

    this.addEventListener(
      'lwcerouter_addhistoryadapter',
      this.addHistoryAdapter.bind(this),
    );
    this.addEventListener(
      'lwcerouter_addrouteeventlistener',
      this.addRoute.bind(this),
    );
    this.addEventListener(
      'lwcerouter_removeeventlistener',
      this.removeRoute.bind(this),
    );

    this.history = createBrowserHistory();
    this.unlisten = this.history.listen((location, action) => {
      this.checkRoutes(location);
    });
  }

  disconnectedCallback() {
    this.unlisten();
  }

  addRoute(event) {
    event.stopPropagation();

    this.routes.push({
      ...event.detail,
    });
    this.checkRoutes(window.location);
  }

  removeRoute(event) {
    event.stopPropagation();

    this.routes.push(event.detail);

    const indexToRemove = this.routes.findIndex(
      route => route.path === detail.path && route.callback === detail.callback,
    );

    if (routeToRemove === -1) console.warn('Cannot find route to remove!');
    else this.routes.splice(indexToRemove, 1);

    this.checkRoutes(window.location);
  }

  checkRoutes(location) {
    this.routes.map(route => {
      const found = matchPath(location.pathname, {
        ...route,
        path: this.base + route.path,
      });

      if (found) {
        route.callback({found: true, data: found.params});
      } else {
        route.callback({found: false});
      }
    });
  }

  addHistoryAdapter(e) {
    e.detail(this.history);
  }

  navigate(e) {
    this.history.push(this.base + e.detail);
  }
}
