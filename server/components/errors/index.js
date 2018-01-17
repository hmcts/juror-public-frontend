/**
 * Error responses
 */

;(function(){
  'use strict';

  module.exports = function(req, res, code, redirectUri) {
    var result = {
      status: code,
    };

    if (typeof redirectUri !== 'undefined') {
      return res
        .set('Content-Type', 'text/html')
        .status(code)
        // eslint-disable-next-line max-len
        .send('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=' + redirectUri + '"></head></html>');
    }

    // Set status first off, then conditionally output info
    res.status(code);
    return res.render('_errors/'+ code + '.njk', {}, function(err, html) {
      // If something went wrong rendering the template then output JSON
      if (err) {
        return res.json(result);
      }

      // Otherwise output the template HTML
      return res.send(html);
    });
  };

})();
