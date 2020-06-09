export class routeParams {
  static configSchema = {};
  static contextSchema = {};

  constructor(dataCallback) {
    this.dataCallback = dataCallback;
    this.dataCallback({});
  }

  update(config, context) {
    this.config = config;
    if (context) this.dataCallback(context);
  }

  connect() {
  }

  disconnect() {
  }
}
