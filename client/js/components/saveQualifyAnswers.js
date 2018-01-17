;(function() {

  'use strict';

  function writeOptions(name, value, csrf){
    $.post($('#store_url').val(), {
      name: name,
      value: value,
      _csrf: csrf
    });
  }

  $('.store-updated-information').change(function() {
    writeOptions($(this).attr('name'), $(this).val(), $('#_csrf').val());
  });


  $('.form-control').on('focusout', function(){
    writeOptions($(this).attr('name'), $(this).val(), $('#_csrf').val());
  });

})();
