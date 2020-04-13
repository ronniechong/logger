const Logger = require('./');
const chalk = require('chalk');

describe('Logger in node environment', () => {
  const origProcess = process;
  const spyErrorLog = jest.fn();
  const spyInfoLog = jest.fn();
  const spyLogLog = jest.fn();

  beforeEach(() => {
    process = {
      version: 'v13.12.0',
      versions: {
        node: '13.12.0'
      },
      platform: 'mock-node-platform'
    }
    console.error = spyErrorLog;
    console.info = spyInfoLog;
    console.log = spyLogLog;
  })

  afterEach(() => {
    process = origProcess;
    jest.clearAllMocks();
  });
 
  test('is called with correct default colors', () => {
    const logger = new Logger();
    const spyLog = jest.spyOn(logger, 'log');
    const spyError = jest.spyOn(logger, 'error');
    const spyInfo = jest.spyOn(logger, 'info');
    const spyLogging = jest.spyOn(logger, '__logger');
  
    logger.log('test log');
    expect(spyLogLog).toHaveBeenCalled();
    expect(spyLog).toHaveBeenCalledWith('test log');
    expect(spyLogging).toHaveBeenCalledWith(chalk.white, 'test log');

    logger.error('test error');
    expect(spyLogLog).toHaveBeenCalled();
    expect(spyError).toHaveBeenCalledWith('test error');
    expect(spyLogging).toHaveBeenCalledWith(chalk.red, 'test error');

    logger.info('test info');
    expect(spyLogLog).toHaveBeenCalled();
    expect(spyInfo).toHaveBeenCalledWith('test info');
    expect(spyLogging).toHaveBeenCalledWith(chalk.blue, 'test info');
  });

  test('is called with correct custom colors', () => {
    const custom = {
      error: 'green',
      unknown: 'yellow'
    }
    const logger = new Logger(custom);
    const spyError = jest.spyOn(logger, 'error');
    const spyLogging = jest.spyOn(logger, '__logger');

    logger.error('test error');
    expect(spyLogLog).toHaveBeenCalled();
    expect(spyError).toHaveBeenCalledWith('test error');
    expect(spyLogging).toHaveBeenCalledWith(chalk.green, 'test error');
  })

  test('is called with white color if custom color not supported', () => {
    const custom = {
      error: 'lightBrown',
    }
    const logger = new Logger(custom);
    const spyError = jest.spyOn(logger, 'error');
    const spyLogging = jest.spyOn(logger, '__logger');

    logger.error('test error');
    expect(spyLogLog).toHaveBeenCalled();
    expect(spyError).toHaveBeenCalledWith('test error');
    expect(spyLogging).toHaveBeenCalledWith(chalk.white, 'test error');
  })

  test('is not called if there is no message', () => {
    const logger = new Logger();

    logger.error('test');
    expect(spyLogLog).toHaveBeenCalledTimes(1);
    logger.error();
    logger.error();
    expect(spyLogLog).toHaveBeenCalledTimes(1);
  })
});

describe('Logger in browser environment', () => {
  const origProcess = process;
  const origConsole = console;
  let spyErrorLog;
  let spyInfoLog;
  let spyLogLog;

  beforeEach(() => {
    jest.clearAllMocks();
    spyErrorLog = jest.fn();
    spyInfoLog = jest.fn();
    spyLogLog = jest.fn();

    process = {
      version: undefined,
      versions: {}
    };
    console = {
      error: spyErrorLog,
      info: spyInfoLog,
      log: spyLogLog
    }
  })

  afterEach(() => {
    process = origProcess;
    console = origConsole;
    spyErrorLog.mockClear();
    spyInfoLog.mockClear();
    spyLogLog.mockClear();
  });
 
  test('is called with correct console methods', () => {
    const logger = new Logger();
  
    logger.log('test log');
    expect(spyLogLog).toHaveBeenCalled();

    logger.error('test error');
    expect(spyErrorLog).toHaveBeenCalled();

    logger.info('test info');
    expect(spyInfoLog).toHaveBeenCalled();
  });

  test('is not called if there is no message', () => {
    const logger = new Logger();
  
    logger.log();
    expect(spyLogLog).not.toHaveBeenCalled();

    logger.error();
    expect(spyErrorLog).not.toHaveBeenCalled();

    logger.info();
    expect(spyInfoLog).not.toHaveBeenCalled();
  });


  test('is called with console.log only', () => {
    const logger = new Logger();
    console = {
      error: undefined,
      info: undefined,
      log: spyLogLog
    }
  
    logger.log('test log');
    expect(spyLogLog).toHaveBeenCalledTimes(1);
    expect(spyLogLog).toHaveBeenCalled();

    logger.error('test error');
    expect(spyErrorLog).not.toHaveBeenCalled();
    expect(spyLogLog).toHaveBeenCalled();
    expect(spyLogLog).toHaveBeenCalledTimes(2);

    logger.info('test info');
    expect(spyInfoLog).not.toHaveBeenCalled();
    expect(spyLogLog).toHaveBeenCalled();
    expect(spyLogLog).toHaveBeenCalledTimes(3);
  });
});