const fs = require('fs');
const promisify = require('../utils/promisify');

class Packager {
  constructor(bundle) {
    this.bundle = bundle;
    this.setup();
  }

  setup() {
    this.dest = fs.createWriteStream(this.bundle.name);
    this.dest.write = promisify(this.dest.write.bind(this.dest));
    this.dest.end = promisify(this.dest.end.bind(this.dest));
  }

  async start() {}

  async addAsset(asset) {
    throw new Error('Must be implemented by subclasses');
  }

  async end() {
    await this.dest.end();
  }
}

module.exports = Packager;
