import { LightningElement, api, createContextProvider } from "lwc";
import { createBrowserHistory } from "history";
import matchPath from "./matchPath.js";
import { history } from "../../../wire-adapters/history";

const historyContextProvider = createContextProvider(history);

export default class Router extends LightningElement {
  @api base = "";
  routes = [];
  setup = false;

  @api getHistory() {
    return this.history;
  }

  constructor() {
    super();

    this.addEventListener(
      "lwcerouter_addrouteeventlistener",
      this.addRoute.bind(this)
    );
    this.addEventListener(
      "lwcerouter_removeeventlistener",
      this.removeRoute.bind(this)
    );

    this.history = createBrowserHistory();
    this.unlisten = this.history.listen((location, action) => {
      this.checkRoutes(location);
    });
  }

  renderedCallback() {
    if (!this.setup) {
      this.setup = true;

      historyContextProvider(this, {
        consumerConnectedCallback: consumer => {
          consumer.provide(this.history);
        },
      });
    }
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
      (route) =>
        route.path === detail.path && route.callback === detail.callback
    );

    if (routeToRemove === -1) console.warn("Cannot find route to remove!");
    else this.routes.splice(indexToRemove, 1);

    this.checkRoutes(window.location);
  }

  checkRoutes(location) {
    let aRouteMatched = false;

    this.routes.forEach((route) => {
      if (route.default) return;

      if (route.path === "*") {
        aRouteMatched = true;
        return route.callback({ found: true });
      }

      const found = matchPath(location.pathname, {
        ...route,
        path: this.base + route.path,
      });

      if (found) {
        aRouteMatched = true;
        route.callback({ found: true, data: found.params });
      } else {
        route.callback({ found: false });
      }
    });

    this.routes.forEach((route) => {
      if (route.default) {
        route.callback({ found: !aRouteMatched });
      }
    });
  }

  navigate(e) {
    this.history.push(this.base + e.detail);
  }
}
