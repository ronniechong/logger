# @digitalronin/logger

![NPM](https://img.shields.io/npm/l/@digitalronin/logger)
[![npm (scoped)](https://img.shields.io/npm/v/@digitalronin/logger)](https://npmjs.org/package/@digitalronin/logger "View this project on npm")
[![Build Status](https://travis-ci.org/ronniechong/logger.svg?branch=master)](https://travis-ci.com/ronniechong/logger)

A simple wrapper for `console.log` for Node or browser. The former supports colors, using `chalk` [Link](https://github.com/chalk/chalk)

## Installation

```bash
# Using Yarn
> yarn add @digitalronin/logger --dev

# Using NPM
> npm install @digitalronin/logger -D
```

## Usage

### Browser

```javascript
const Logger = require('@digitalronin/logger');
const l = new Logger();

// console.log
l.log('Test log');

// console.error
l.error('Test error');

// console.log
l.info('Test info');
```

### Node

```javascript
const Logger = require('@digitalronin/logger');
const l = new Logger();

// console.log in white
l.log('Test log');

// console.log in red
l.error('Test error');

// console.log in blue
l.info('Test info');
```

#### Overwriting default colors

Only the following [colors](https://github.com/chalk/chalk#colors) is supported

```javascript
const Logger = require('@digitalronin/logger');
const l = new Logger({
  error: 'blue',
  info: 'white',
  log: 'green',
});
```