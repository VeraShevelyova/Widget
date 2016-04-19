'use strict';

var controllers = angular.module('controllers', []);


controllers.controller('DefaultViewController', ['$scope', '$location', 'Tips', 
    function($scope, $location, Tips) {
    $scope.filterText = ""
    $scope.x = -1;
    $scope.limit = 5;
    $scope.foods = [];

    var tipsList = angular.element(document.querySelector('ul'));

    Tips.get({}, function(data){
        $scope.foods = data.fruits;
        $scope.filteredFoods = [];
    });

    $scope.addTipToInput = function(elem) {
        $scope.query = $scope.query.substring(0, $scope.query.lastIndexOf(',') + 1) + " ";
        $scope.query = $scope.query + elem + ", ";
        $scope.emptyTipsList();
    };

    $scope.getFilteredTipsList = function(event) {
    	var keyCode = event.which || event.keyCode
    	if(keyCode == 38 || keyCode == 40 || keyCode == 13){
    		event.preventDefault();
    		$scope.navigateViaKeyBoard(keyCode);
    	} else {
    		tipsList[0].classList.remove("emptyList");
        	$scope.filterText = $scope.query.substring($scope.query.lastIndexOf(',') + 1).trim();
        	$scope.filteredFoods = $scope.foods
        }
    }

    $scope.setTipActive = function(index){
    	$scope.removeActiveFromAllTips();

    	$scope.x = index;
    	if(index != -1 && tipsList.find('li').length > 0) 
        tipsList.find('li')[index].classList.add("active");
    	
    };

    $scope.emptyTipsList = function(){
        $scope.filteredFoods = [];
        tipsList[0].classList.add('emptyList');
    }

    $scope.submit = function(event){
        event.preventDefault();
        var weight = $scope.getWeight();

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

    $scope.navigateViaKeyBoard = function(keyCode) {
        var items = tipsList.find("li");        
        if (keyCode == 38) {
            $scope.x = ($scope.x ==  -1) ? items.length - 1: $scope.x -1;
            $scope.setTipActive( $scope.x );
        } else if (keyCode == 40) {
            $scope.x = ($scope.x == items.length - 1)? -1: $scope.x +1;
            $scope.setTipActive($scope.x);
        } else if (keyCode == 13) {
            $scope.addTipOnEnterClick();
            $scope.filteredFoods = [];
            $scope.x = -1;
        } else return;
    }

    $scope.removeActiveFromAllTips = function(){
      angular.forEach(tipsList.find('li'), function(tip){
        tip.classList.remove("active");
        });
    };

    $scope.addTipOnEnterClick = function(){
      var item = tipsList.find("li")[$scope.x].innerHTML.trim();
      $scope.addTipToInput(item);
    }

    $scope.getWeight = function(){
        var selectedFoods = $scope.query.split(',');
        if(selectedFoods[selectedFoods.splice.length - 1].trim() == "")
        selectedFoods.splice(selectedFoods.splice.length - 1);
        var weight = 0;

        selectedFoods.forEach(function(selectedFood){
            $scope.foods.forEach(function(food){
                if(food.name == selectedFood.trim())
                    weight = weight + food.weight;
            })
        });

        return weight;
    };

}]);


controllers.controller('SuggestionController', ['$scope', '$routeParams', 'Suggestion',
  function($scope, $routeParams, Suggestion) {
    $scope.suggestion = Suggestion.get({suggestionId: $routeParams.suggestionId}, function(suggestion) {
      
    });
  }])
