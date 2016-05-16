'use strict';

var mainPage = function(){
  var input = element(by.id('input'));
  var inputSelector = "$('#input')";
  var tipItems = element.all(by.css('.inputWithTips li'));
  var submitButton = element(by.buttonText('Send'));

  this.typeTextInInput = function(text){
     input.sendKeys(text);
  };

  this.getInputText = function(){
  	return input.getText();

  };

  this.getTipItems = function(){
  	return tipItems;
  };

  this.getTipItem = function(index){
  	return tipItems.get(index);
  };

  this.getTipItemsCount = function(){
    return tipItems.count();
  };

  this.clickArrowDown = function(){
  	input.sendKeys('\uE015');
  };

    this.clickArrowUp = function(){
  	input.sendKeys('\uE013');
  };

  this.mouseClickOnElement = function(elem){
  	browser.actions().click(elem).perform();
  }

  this.tipContainsClass = function(tipIndex, className){
    if(typeof tipIndex  === 'number'){
      return this.getTipItem(tipIndex).getAttribute('class').then(function (classes) {
       return classes.split(' ').indexOf(className) !== -1;
        });  
    }
    else{
          return tipIndex.getAttribute('class').then(function (classes) {
       return classes.split(' ').indexOf(className) !== -1;
        }); 
    }
  	 
  };

  this.submit = function(){
  	submitButton.click();
  };

  this.checkTipItemsCount = function(expectedCount){
     expect(this.getTipItemsCount()).toBe(expectedCount);
  }

  this.checkTipItems = function(expectedTipItems){
      this.getTipItems().each(function(tipItem, index) {
        expect(tipItem.getText()).toBe(expectedTipItems[index]);
      });
  }

  this.getActiveTips = function(){
    var self = this;
     return this.getTipItems().filter(function(tip, index){
      return self.tipContainsClass(index, 'active');
    });
  }
};

module.exports = mainPage;