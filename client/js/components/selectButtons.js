;(function() {
  'use strict';

  $(document).ready(function() {
    var $blockLabels = $('.block-label input[type="radio"], .block-label input[type="checkbox"]');

    new GOVUK.SelectionButtons($blockLabels); // eslint-disable-line
  });

})();
