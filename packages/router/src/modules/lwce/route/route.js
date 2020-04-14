import { LightningElement, api } from "lwc";
import route from "./route.html";

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
  wireAdapters = [];

  constructor() {
    super();

    this.uniqueId = getUniqueId();
    this.routeChange = this._routeChange.bind(this);

    this.addEventListener(
      "lwcerouter_addwireadapter",
      this.addWireAdapter.bind(this)
    );

    this.addEventListener(
      "lwcerouter_removewireadapter",
      this.removeWireAdapter.bind(this)
    );

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

  interceptChildRouteEvent(name, event) {
    if (event.detail.uniqueId !== this.uniqueId) {
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
    if (this.rendered) {
      this.wireAdapters.forEach((adapter) => adapter(this.routeParams));
    }
  }
}
