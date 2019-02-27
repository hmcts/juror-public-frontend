;(function(){
  'use strict';

  var path = require('path')
    , fse = require('fs-extra')

    , environmentFile = path.resolve(__dirname, process.env.NODE_ENV+'.js')
    , environmentFileBackup = path.resolve(__dirname, 'bk_'+process.env.NODE_ENV+'.js')

    , secretFile = path.resolve(__dirname, 'secret.js')
    , secretFileBackup = path.resolve(__dirname, 'bk_secret.js');

  describe('Configuration:', function() {

    beforeEach(function(next) {
      try {
        fse.renameSync(secretFileBackup, secretFile);
        fse.renameSync(environmentFileBackup, environmentFile);
        next();
      } catch (err) {
        next();
      }
    });

    it('should not cause error when no environment level configuration file is present', function() {

      var config;

      try {
        fse.renameSync(environmentFile, environmentFileBackup);

        config = require('./')();
        expect(config.unitTesting).to.be.undefined;
      } catch (e) {
        throw new Error(e);
      }

    });

    it('should not cause error when no secret configuration file is present', function() {

      var config;

      try {
        fse.renameSync(secretFile, secretFileBackup);

        config = require('./')();
        expect(config.sessionSecret).to.be.undefined;
      } catch (e) {
        throw new Error(e);
      }

    });

    it('should allow environment and secret configuration files to be present', function() {
      var config = require('./')();

      expect(config.logConsole).to.equal('trace');
      expect(config.sessionSecret).to.equal('[super-secret-key]');
    });

  });


})();
