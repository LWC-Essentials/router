import { LightningElement, api, createContextProvider } from "lwc";
import { routeParams } from "../../../wire-adapters/route-params";
import route from "./route.html";

const routeParamsContextProvider = createContextProvider(routeParams);

let id = 0;

function getUniqueId() {
  return ++id;
}

function combinePaths(a, b) {
  if (a.charAt(a.length - 1) === "/" && b.charAt(0) === "/") {
    return a + b.substring(1);
  } else {
    return a + b;
  }
}

export default class Route extends LightningElement {
  @api path;
  @api strict = false;
  @api sensitive = false;
  @api exact = false;
  @api default = false;

  routeParams = {};
  rendered = false;
  setup = false;
  wireAdapters = [];

  constructor() {
    super();

    this.uniqueId = getUniqueId();
    this.routeChange = this._routeChange.bind(this);

    this.addEventListener(
      "lwcerouter_addrouteeventlistener",
      this.interceptChildRouteEvent.bind(
        this,
        "lwcerouter_addrouteeventlistener"
      )
    );

    this.addEventListener(
      "lwcerouter_removeeventlistener",
      this.interceptChildRouteEvent.bind(this, "lwcerouter_removeeventlistener")
    );
  }


  renderedCallback() {
    if (!this.setup) {
      this.setup = true;

      routeParamsContextProvider(this, {
        consumerConnectedCallback: consumer => {
          this.wireAdapters.push(consumer);
          this.sendRouteParams();
        },
        consumerDisconnectedCallback: consumer => {
          this.wireAdapters.splice(this.wireAdapters.indexOf(consumer), 1);
        }
      });
    }
  }

  interceptChildRouteEvent(name, event) {
    if (event.detail.uniqueId !== this.uniqueId && !this.default) {
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent(name, {
          detail: {
            ...event.detail,
            path: combinePaths(this.path, event.detail.path),
            uniqueId: this.uniqueId,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  connectedCallback() {
    if (
      this.default &&
      (this.path || this.exact || this.sensitive || this.strict)
    ) {
      throw new Error("A default route cannot have other parameters!");
    }

    this.dispatchEvent(
      new CustomEvent("lwcerouter_addrouteeventlistener", {
        detail: {
          path: this.path,
          default: this.default,
          exact: this.exact,
          sensitive: this.sensitive,
          strict: this.strict,
          callback: this.routeChange,
          uniqueId: this.uniqueId,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  disconnectedCallback() {
    this.dispatchEvent(
      new CustomEvent("lwcerouter_removeeventlistener", {
        detail: {
          path: this.path,
          callback: this.routeChange,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _routeChange({ found, data = {} }) {
    this.rendered = found;
    this.routeParams = data;
    this.sendRouteParams();
  }

  sendRouteParams() {
    if (this.rendered) {
      this.wireAdapters.forEach((adapter) => adapter.provide(this.routeParams));
    }
  }
}
