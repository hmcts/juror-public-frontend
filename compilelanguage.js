/* eslint-disable */
var path = require('path');
var fs = require('fs-extra');
var _ = require('lodash');

var languageBaseDir = path.resolve(__dirname, 'client/js/i18n');
var languageSaveDir = path.resolve(__dirname, process.env.NODE_ENV, 'client/js/i18n');


function createSaveDir() {
  try {
    fs.ensureDirSync(languageSaveDir);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function loadLanguages() {

  try {
    var dirResults = fs.readdirSync(languageBaseDir);

    return dirResults.filter(function(dirItem) {
      if (fs.lstatSync(path.resolve(languageBaseDir, dirItem)).isDirectory()) {
        return true;
      }
    });
  } catch (e) {
    console.log(e);
    return [];
  }

}


function loadLanguageFiles(availableLanguages) {
  var languageFiles = {};

  availableLanguages.forEach(function(languageName) {

    var languageDirectory = path.resolve(languageBaseDir, languageName);
    var languageFilesTmp = fs.readdirSync(languageDirectory);

    try {
      languageFiles[languageName] = [];
      languageFilesTmp.forEach(function(file) {
        languageFiles[languageName].push(path.resolve(languageDirectory, file));
      });
    } catch (e) {
      console.log(e);
    }

  });

  return languageFiles;
}


function generateLanguageOutput(languageFiles) {
  var returnedObj = {};

  Object.keys(languageFiles).forEach(function(languageName) {

    var outputLanguage = {};

    languageFiles[languageName].forEach(function(languageFile) {

      try {
        var languageFileContents = fs.readJsonSync(languageFile);

        var newObjTmp = {};
        newObjTmp[path.basename(languageFile).replace('.json', '')] = languageFileContents;
        outputLanguage = _.merge(outputLanguage, newObjTmp);
      } catch (e) {
        // do nothing, it's okay
        console.log('Could not load language file, likely caused by invalid JSON:');
        console.log(languageFile);
      }

    });

    returnedObj[languageName] = outputLanguage;

  });

  return returnedObj;
}


function storeCombinedOutput(combinedContents) {
  Object.keys(languageFiles).forEach(function(languageName) {

    var saveFileName = path.resolve(languageSaveDir, languageName + '.json');
    var saveContents = combinedContents[languageName];

    try {
      fs.writeJsonSync(saveFileName, saveContents);
    } catch (e) {
      // do nothing for now
    }
  });
}


// Kick things off
var folderExists = createSaveDir();
if (folderExists) {
  var availableLanguages = loadLanguages();
  var languageFiles = loadLanguageFiles(availableLanguages);
  var combinedContent = generateLanguageOutput(languageFiles);
  storeCombinedOutput(combinedContent);
}
