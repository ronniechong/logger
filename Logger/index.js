const chalk = require('chalk');
const { isNode } = require('@digitalronin/browser-or-node');
const {
  NODE,
  BROWSER,
  LOG,
  INFO,
  ERROR
} = require('./constants');

class Logger {
  constructor(params = {}) {
    this.env = isNode() ? NODE : BROWSER;
    this.default = {
      error: chalk.red,
      info: chalk.blue,
      log: chalk.white,
    }
    const keys = Object.keys(this.default);
    this.params = keys.reduce(function(acc, i) {
      if (params[i]) {
        const param = chalk[params[i]];
        acc[i] = param ? param : chalk.white;
        return acc;
      }
      return acc;
    }, this.default);
  }

  __logger(logType, msg) {
    if (!msg) {
      return;
    }

    if (this.env === NODE) {
      console.log(logType(msg));
    } else {
      if (typeof console[logType] === 'function') {
        console[logType](msg);
      } else {
        console.log(msg);
      }
    }
  }

  error(msg) {
    const type = this.env === NODE ? this.params.error : ERROR;
    this.__logger(type, msg);
  }

  info(msg) {
    const type = this.env === NODE ? this.params.info : INFO;
    this.__logger(type, msg);
  }

  log(msg) {
    const type = this.env === NODE ? this.params.log : LOG;
    this.__logger(type, msg);
  }
}

module.exports = Logger;