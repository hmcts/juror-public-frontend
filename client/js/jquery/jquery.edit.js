/* eslint-disable */
jQuery.fn.inlineEdit = function(settings){
	//configurable options
	var o = $.extend({},settings);

	return $(this).each(function(){

		//reference to container
		var editBlock = $(this);


    // Once javascript has been enabled, we show primary
    // and hide secondary.
    //
    // primary = block with rendered value and toggle button
    // secondary = block with editable area
    editBlock.find('.primary').each(function() {
      $(this).addClass('show');
    });

    editBlock.find('.secondary').each(function() {
      $(this).addClass('hide');
    });


    // Add show class to change button,
    // this ensures the change button only shows
    // when javascript is available
    editBlock.find('.inline-edit-toggle').each(function() {
      $(this).addClass('show');
    });


    // Add click trigger toggle between show and hide of sections
    editBlock.find('.inline-edit-toggle').click(function(e) {

      var visibleRow = editBlock.find('.inline-section.show')
        , hiddenRow = editBlock.find('.inline-section.hide');

      visibleRow.each(function() {
        $(this).removeClass('show').addClass('hide');
      });

      hiddenRow.each(function() {
        $(this).removeClass('hide').addClass('show');
        $(this).find('input').first().focus();
      });

      e.preventDefault();
    });
	});
};
