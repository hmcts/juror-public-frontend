;(function() {
  'use strict';

  // Input fields which are highlighted on select
  $('.focus-select-all').click(function() {
    $(this).select();
  });

  // Clear all child fields when using a js-hide toggle element
  $('.toggle-reset input').change(function() {
    toggleClearFields($(this));
  });

  $('.selection-button-radio').change(function() {
    $('.selection-button-radio').each(function() {
      if (typeof $(this).data('target') !== 'undefined') {
        toggleClearFields($(this).find('input[type="radio"]').first());
      }
      if (typeof $(this).attr('aria-controls') !== 'undefined') {
        toggleClearFieldsGDS($(this));
      }
    });
  });

  $('.selection-button-radio-gds').change(function() {
    if (typeof $(this).attr('aria-controls') !== 'undefined') {
      toggleClearFieldsGDS($(this));
    }
  });


  function toggleClearFields(ctx) {
    var isSelected = ctx.parent().hasClass('selected')
      , dataTarget = ctx.parent().data('target');

    if (!isSelected) {
      $('#' + dataTarget).find(':input').each(function() {
        switch (this.type) {
        case 'password':
        case 'text':
        case 'textarea':
        case 'file':
        case 'select-one':
        case 'select-multiple':
        case 'date':
        case 'number':
        case 'tel':
        case 'email':
          $(this).val('');
          break;
        case 'checkbox':
        case 'radio':
          this.checked = false;
          break;
        }
      });
    }
  }

  function toggleClearFieldsGDS(ctx) {
    var isSelected = ctx.hasClass('checked')
      , dataTarget = ctx.attr('aria-controls');

    if (!isSelected) {
      $('#' + dataTarget).find(':input').each(function() {
        switch (this.type) {
        case 'password':
        case 'text':
        case 'textarea':
        case 'file':
        case 'select-one':
        case 'select-multiple':
        case 'date':
        case 'number':
        case 'tel':
        case 'email':
          $(this).val('');
          break;
        case 'checkbox':
        case 'radio':
          this.checked = false;
          break;
        }
      });
    }
  }

})();
