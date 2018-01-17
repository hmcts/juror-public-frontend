;(function() {
  'use strict';

  var $tabContainer = $('.tab-container');

  if ($tabContainer.find('.js-tabs').length) {
    $tabContainer.tabs({
      scrollOnload: true
    });

    // Default first tab to selected
    $tabContainer.find('.js-tabs li:first-child').addClass('tabs-selected');
    $tabContainer.find('.tab-content .tab-pane:not(:first-child)').removeClass('tabs-panel-selected');
  }

})();
