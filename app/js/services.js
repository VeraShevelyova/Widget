'use strict';

/* Services */

var suggestionServices = angular.module('suggestionServices', ['ngResource']);

suggestionServices.factory('Suggestion', ['$resource',
  function($resource){
    return $resource('suggestions/:suggestionId.json', {}, {
      query: {method:'GET', params:{suggestionId:'suggestion'}, isArray:true}
    });
  }]);

suggestionServices.factory('Tips', ['$resource',
  function($resource){
    return $resource('data/foods.json', {}, {
      query: {method:'GET', isArray:false}
    });
 }]);