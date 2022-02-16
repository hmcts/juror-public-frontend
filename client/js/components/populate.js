;(function() {

  'use strict';

  function populateFields() {
    $('#title').val('Mr');
    $('#firstName').val('John');
    $('#lastName').val('Appleseed');
    $('#addressLineOne').val('10 High Street');
    $('#addressTown').val('Small Town');
    $('#addressCounty').val('Eastshire');
    $('#addressPostcode').val('EA12 3YZ');
  }

  $('.populate-fields').click(function(e) {
    e.preventDefault();
    populateFields();
  });

})();
