
;(function(){
  'use strict';

  module.exports = {
    translate: function(ident, translations, values) {

      var identParts
        , languagePointer = translations
        , languageStr
        , key;


      // Get the targetted language string based on provided identifier
      identParts = ident.split('.');
      identParts.forEach(function(identPart) {
        if (languagePointer.hasOwnProperty(identPart)) {
          languagePointer = languagePointer[identPart];
        }
      });


      // Replace any parameters with provided values
      languageStr = languagePointer;
      if (typeof languagePointer === 'string' && typeof values !== 'undefined') {

        for (key in values) {
          if (values.hasOwnProperty(key)) {
            languageStr = languageStr.replace('{{'+key+'}}', values[key]);
            languageStr = languageStr.replace('{{ '+key+' }}', values[key]);
          }
        }
      }

      return typeof languageStr === 'string' ? languageStr : '';
    },

    prettify: function(str, upperFirst) {
      var bUpperFirst = (typeof upperFirst === 'undefined')
        , tmpStr = str
          .replace(/([A-Z]+)/g, ' $1')
          .replace(/([A-Z][a-z])/g, ' $1')
          .replace(/\s\s+/g, ' ')
          .toLowerCase();

      if (bUpperFirst) {
        return tmpStr.charAt(0).toUpperCase() + tmpStr.slice(1);
      }
      return tmpStr;
    },

    isString: function(obj) {
      return typeof obj === 'string';
    },

    translateDate: function(dateValue, sourceFormat, displayFormat, lang) {

      var mnt = require('moment')
        , returnValue

      // Set defaults
      returnValue = dateValue;
      mnt.locale('en-gb');

      if (lang === 'en'){
        lang = 'en-gb';
      }

      try {
        mnt.locale(lang);
        returnValue = mnt(dateValue, sourceFormat).format(displayFormat);
      } catch (ex){
        console.error(ex);
      }

      mnt.locale('en-gb');
      return returnValue;

    },

  };

})();
