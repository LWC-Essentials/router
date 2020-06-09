export class history {
  static configSchema = {};
  static contextSchema = {};

  constructor(dataCallback) {
    this.dataCallback = dataCallback;
    this.dataCallback({});
  }

  update(config, context) {
    this.config = config;
    this.dataCallback(context);
  }

  connect() {
  }

  disconnect() {}
}
