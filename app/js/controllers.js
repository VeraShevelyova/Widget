'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);


controllers.controller('FoodsController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.filterText = ""
    $scope.x = -1;
    $scope.limit = 5;

    $http.get('data/foods.json').success(function(data) {
        $scope.foods = data.fruits;
        $scope.filteredFoods = [];
    });

    $scope.add = function(elem) {
        $scope.query = $scope.query.substring(0, $scope.query.lastIndexOf(',') + 1) + " ";
        $scope.query = $scope.query + elem + ", ";
        angular.element(document.querySelector('ul'))[0].classList.add("emptyList");
        $scope.filteredFoods = [];
    };

    $scope.getFilteredList = function(event) {
    	var keyCode = event.which || event.keyCode
    	if(keyCode == 38 || keyCode == 40 || keyCode == 13){
    		event.preventDefault();
    		$scope.setActiveElements(keyCode)
    	} else {
    		angular.element(document.querySelector('ul'))[0].classList.remove("emptyList");
        	$scope.filterText = $scope.query.substring($scope.query.lastIndexOf(',') + 1).trim();
        	$scope.filteredFoods = $scope.foods
        }
    }

    $scope.setActiveElements = function(keyCode) {
    	var items = angular.element(document.querySelector('#list')).find("li");    	
        if (keyCode == 38) {
            $scope.x = ($scope.x ==  -1) ? items.length - 1: $scope.x -1;
            $scope.addActive( $scope.x );
        } else if (keyCode == 40) {
            $scope.x = ($scope.x == items.length - 1)? -1: $scope.x +1;
            $scope.addActive($scope.x);
        } else if (keyCode == 13) {
        	$scope.addElementOnClick();
        	$scope.filteredFoods = [];
            $scope.x = -1;
        } else return;
    }

    $scope.addActive = function(index){
    	var items = angular.element(document.querySelector('#list')).find("li");
    	for(var i=0; i<items.length; i++)
    	{
    		$scope.removeActive(i);
    	}

    	$scope.x = index;
    	if(index != -1 && items.length > 0) items[index].classList.add("active");
    	
    }

        $scope.removeActive = function(index){
        var items = angular.element(document.querySelector('#list')).find("li");
    	items[index].classList.remove("active");
    	}

    $scope.addElementOnClick = function(){
    	var item = angular.element(document.querySelector('#list')).find("li")[$scope.x].innerHTML.trim();
    	$scope.add(item);
    }

    $scope.submit = function(){
    	var selectedFoods = $scope.query.split(',');
		var weight = 0;

		selectedFoods.forEach(function(selectedFood){
			$scope.foods.forEach(function(food){
				if(food.name == selectedFood.trim())
					weight = weight + food.weight;
			})
		});

		if(weight < 25){
			alert("Your racion is normal for today, you will not get fat. It is " 
				 + weight);
			$location.url('/foods/normal');
		} else{
			alert("You it too much today, you will get fat. It is " 
				 + weight);
			$location.url('/foods/overweight');
		}
    }

}]);


controllers.controller('ActionController', ['$scope', '$routeParams', 'Suggestion',
  function($scope, $routeParams, Suggestion) {
    $scope.suggestion = Suggestion.get({suggestionId: $routeParams.suggestionId}, function(suggestion) {
      
    });
  }])
