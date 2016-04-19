'use strict';

/* jasmine specs for controllers go here */
describe('Widget controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('myApp'));
  beforeEach(module('suggestionServices'));

  describe('DefaultViewController', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('data/foods.json').
          respond({fruits : [{name: 'apple'}, {name: 'cherry'}]});

      scope = $rootScope.$new();
      ctrl = $controller('DefaultViewController', {$scope: scope});
    }));


    it('should create the list of tips with 2 items in it', function() {
      expect(scope.tips).toEqualData([]);
      $httpBackend.flush();

      expect(scope.tips).toEqualData(
          [{name: 'apple'}, {name: 'cherry'}]);
    });

  });


  describe('SuggestionController', function(){
    var scope, $httpBackend, ctrl,
        xyzSuggestionData = function() {
          return {
            picture: 'img/xyr.png',
            result: 'Success!!!'
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('suggestions/xyz.json').respond(xyzSuggestionData());

      $routeParams.suggestionId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('SuggestionController', {$scope: scope});
    }));


    it('should fetch suggestion detail', function() {
      expect(scope.suggestion).toEqualData({});
      $httpBackend.flush();

      expect(scope.suggestion).toEqualData(xyzSuggestionData());
    });
  });
});
