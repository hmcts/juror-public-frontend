;(function(){
  'use strict';

  var config = require('../../config/environment')()
    , logger
    , spy;

  describe('Logging Component:', function() {

    it('should contain at least one transport', function() {
      logger = require('./')(config);

      expect(Object.keys(logger.transports).length).not.to.equal(0);
    });

    it('should only contain console transport if config.logConsole is not false', function() {
      var transportsWithConsoleCount
        , transportsWithoutConsoleCount;

      config.logConsole = 'trace';
      logger = require('./')(config);
      transportsWithConsoleCount = Object.keys(logger.transports).length;

      config.logConsole = false;
      logger = require('./')(config);
      transportsWithoutConsoleCount = Object.keys(logger.transports).length;

      expect(transportsWithoutConsoleCount).to.be.equal(transportsWithConsoleCount - 1);
    });

    it('should log a trace entry', function() {
      config.logConsole = 'trace';
      spy = sinon.spy(logger, 'trace');
      logger.trace('This is a trace');
      expect(spy.withArgs('This is a trace').calledOnce).to.equal(true);
    });

    it('should log a debug entry', function() {
      config.logConsole = 'trace';
      spy = sinon.spy(logger, 'debug');
      logger.debug('This is a debug');
      expect(spy.withArgs('This is a debug').calledOnce).to.equal(true);
    });

    it('should log an info entry', function() {
      config.logConsole = 'trace';
      spy = sinon.spy(logger, 'info');
      logger.info('This is an info');
      expect(spy.withArgs('This is an info').calledOnce).to.equal(true);
    });

    it('should log a warn entry', function() {
      config.logConsole = 'trace';
      spy = sinon.spy(logger, 'warn');
      logger.warn('This is a warn');
      expect(spy.withArgs('This is a warn').calledOnce).to.equal(true);
    });

    it('should log a crit entry', function() {
      config.logConsole = 'trace';
      spy = sinon.spy(logger, 'crit');
      logger.crit('This is a crit');
      expect(spy.withArgs('This is a crit').calledOnce).to.equal(true);
    });

    it('should log a fatal entry', function() {
      config.logConsole = 'trace';
      spy = sinon.spy(logger, 'fatal');
      logger.fatal('This is a fatal');
      expect(spy.withArgs('This is a fatal').calledOnce).to.equal(true);
    });

    it('should handle a generic error message', function() {
      config.logConsole = 'trace';
      spy = sinon.spy(logger, 'log');
      logger.log('error', new Error('This is a tester'));
      expect(spy.withArgs('error', new Error('This is a test')).calledOnce).to.equal(true);
    });

    it('should log a message with an object', function() {
      var latestLogStub = {
        '@message': 'This is a fatal with data',
        '@fields': { hello: 'world' }
      };

      config.logConsole = 'trace';
      logger.fatal('This is a fatal with data', { hello: 'world' });
      expect({
        '@message': logger.transports.jurorLogger.latestLog['message'],
        '@fields': {
          'hello': logger.transports.jurorLogger.latestLog['@fields'].hello,
        }
      }).to.deep.equal(latestLogStub);
    });

  });

})();
