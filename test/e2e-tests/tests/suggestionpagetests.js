'use strict';

describe('my app', function() {
      var suggestionPage = require('../pages/suggestion.js');
      var suggestion = new suggestionPage();

describe('suggestion page: overweight', function() {


    beforeEach(function() {
      suggestion.open('overweight');
    });


    it('should render overweight when user navigates to /overweight', function() {
      setTimeout(function(){
          expect(suggestion.getTitle()).
        toMatch(/Вы переедаете. Это может негативно сказаться на вашем весе и самочувствии!!!/);
        }, 1000);
    });

  });

    describe('normal', function() {
      
       beforeEach(function() {
      suggestion.open('normal');
    });


    it('should render normal when user navigates to /normal', function() {
      expect(suggestion.getTitle()).
        toMatch(/Вы придерживаетесь правильного рациона. Так держать!!!/);
    });

  });

  });

