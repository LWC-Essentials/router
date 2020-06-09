export class history {
  connected = false;
  constructor(dataCallback) {
    this.dataCallback = dataCallback;
  }

  update(config) {
    this.config = config;
    this.setup();
  }

  historyParamsChanged(history) {
    this.dataCallback(history);
  }

  connect() {
    this.connected = true;
    this.setup();
  }

  disconnect() {}

  setup() {
    if (this.connected && this.config) {
      this.config.target.dispatchEvent(
        new CustomEvent("lwcerouter_addhistoryadapter", {
          detail: historyParamsChanged.bind(this),
          composed: true,
          bubbles: true,
        })
      );
    }
  }
}
