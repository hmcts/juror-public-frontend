;(function(){
  'use strict';

  var utils = require('./utils')
    , fse = require('fs-extra')
    , config = require('../config/environment')()
    , logger = require('../components/logger')(config);

  describe('Utility Component:', function() {

    it('should force https by redirecting when not on https', function() {
      var reqStub = {
          headers: {'x-forwarded-proto': 'http'},
          get: function(key) {
            var options = {
              'Host': 'localhost:3000'
            };

            if (options.hasOwnProperty(key)) {
              return options[key];
            }
            return;
          },
          url: '/'
        }
        , resStub = {
          redirect: function(status, host) {
            return {
              status: status,
              host: host
            };
          }
        }
        , cb = function() {
          // Empty Callback
        }
        , result = utils.forceHttps(reqStub, resStub, cb);

      expect(result.status).to.equal(302);
      expect(result.host).to.equal('https://localhost:3000/');
    });

    it('should not redirect if already on https', function() {
      var reqStub = {
          headers: {'x-forwarded-proto': 'https'}
        }
        , resStub = {}
        , cb = function() {
          // Empty Callback
          return true;
        }
        , result = utils.forceHttps(reqStub, resStub, cb);

      expect(result).to.equal(true);
    });

    it('should reject request due to authorisation if username and password are not set for basicAuth', function() {
      var username
        , password
        , basicAuthStub = function() {}
        , basicAuth = utils.basicAuth(logger, username, password, basicAuthStub)
        , reqStub = {}
        , resStub = {
          statusValue: '',
          renderPath: '',
          status: function(status) {
            this.statusValue = status;
            return this;
          },
          render: function(view) {
            this.renderPath = view;
            return this;
          }
        }
        , cb = function() {}

        , result = basicAuth(reqStub, resStub, cb);

      expect(result.statusValue).to.equal(401);
    });

    // eslint-disable-next-line max-len
    it('should reject request if username and password provided do not match defined values for basicAuth', function() {
      var username = 'admin'
        , password = 'password'
        , basicAuthStub = function(req) {
          return {
            name: req.name,
            pass: req.pass
          };
        }
        , basicAuth = utils.basicAuth(logger, username, password, basicAuthStub)
        , reqStub = {
          name: 'bob',
          pass: 'test'
        }
        , resStub = {
          values: {
            'status': '',
            'WWW-Authenticate': ''
          },
          set: function(key, value) {
            this.values[key] = value;
            return this;
          },
          sendStatus: function(status) {
            this.values.status = status;
            return this;
          }
        }
        , cb = function() {

        }


        , result = basicAuth(reqStub, resStub, cb);

      expect(result.values['WWW-Authenticate']).to.equal('Basic realm=Authorization Required');
      expect(result.values['status']).to.equal(401);
    });

    it('should continue normal execution if basicAuth passes', function() {
      var username = 'admin'
        , password = 'password'
        , basicAuthStub = function(req) {
          return {
            name: req.name,
            pass: req.pass
          };
        }
        , basicAuth = utils.basicAuth(logger, username, password, basicAuthStub)
        , reqStub = {
          name: 'admin',
          pass: 'password'
        }
        , resStub = {}
        , cb = function() {
          return true;
        }

        , result = basicAuth(reqStub, resStub, cb);

      expect(result).to.equal(true);
    });

    it('should create directory if not already present', function() {

      var checkDir = 'tmpTestDir/'
        , result
        , verify;

      // Prepare by ensuring directory doesn't exist
      fse.removeSync(checkDir);

      // Perform check/create
      result = utils.checkDirectoryCreate(checkDir);

      // Directory should exist
      try {
        fse.accessSync(checkDir, fse.F_OK);
        verify = true;
        // Do something
      } catch (e) {
        // It isn't accessible
        verify = false;
      }

      // Verify
      expect(result).to.equal(true);
      expect(verify).to.equal(true);
    });

    it('should not create directory if permissions check fails', function() {

      var checkDir = '/tmpTestDir/'
        , result
        , verify;

      // Prepare by ensuring directory doesn't exist
      fse.removeSync(checkDir);

      // Perform check/create
      result = utils.checkDirectoryCreate(checkDir);

      // Directory should exist
      try {
        fse.accessSync(checkDir, fse.F_OK);
        verify = true;
        // Do something
      } catch (e) {
        // It isn't accessible
        verify = false;
      }

      // Verify
      expect(result).to.equal(false);
      expect(verify).to.equal(false);
    });

    it('should transform object to expected format', function() {

      var bodyStub = {
          data: {
            key: 'value'
          }
        }
        , transformedBodyWithData = utils.basicDataTransform(bodyStub)
        , transformedBodyWithoutData = utils.basicDataTransform(bodyStub.data);

      expect(transformedBodyWithData).to.equal(bodyStub.data);
      expect(transformedBodyWithoutData).to.equal(bodyStub.data);
    });


  });


})();
