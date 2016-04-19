'use strict';

var suggestionPage = function(){
  this.open = function(pageId){
    browser.get('index.html#/foods/' + pageId);
  };

  this.getTitle = function(){
    return element(by.css('h1')).getText();
  };
};

module.exports = suggestionPage;