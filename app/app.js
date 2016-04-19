'use strict';

var myApp = angular.module('myApp', []);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/foods', {
        templateUrl: 'index.html',
        controller: 'FoodsController'
      }).
      when('/foods/:suggestionId', {
        templateUrl: 'Partials/suggestion.html',
        controller: 'SuggestionController'
      }).
      otherwise({
        redirectTo: '/foods'
      });
  }]);
