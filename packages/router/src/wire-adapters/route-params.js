export class routeParams {
  connected = false;

  constructor(dataCallback) {
    this.dataCallback = dataCallback;
    this.dataCallback({});
    this.routeParamsChanged = this._routeParamsChanged.bind(this);
  }

  update(config, a, b) {
    this.config = config;
    this.setup();
  }

  _routeParamsChanged(routeParams) {
    this.dataCallback(routeParams);
  }

  connect() {
    this.connected = true;
    this.setup();
  }

  setup() {
    if (this.connected && this.config) {
      this.config.target.dispatchEvent(
        new CustomEvent(
          "lwcerouter_addwireadapter",
          {
            bubbles: true,
            composed: true,
            detail: this.routeParamsChanged
          }
        )
      );
    }
  }

  disconnect() {
    if (this.config) {
      this.config.target.dispatchEvent(
        new CustomEvent(
          "lwcerouter_removewireadapter",
          {
            bubbles: true,
            composed: true,
            detail: this.routeParamsChanged
          }
        )
      );
    }
  }
}
