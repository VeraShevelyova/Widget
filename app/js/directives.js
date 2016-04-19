var directives = angular.module('directives', []);

directives.directive('onDocumentClick', ['$document', '$parse', 
  function($document, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        var onClick = function() {
          var isChild = $(element).has(event.target).length > 0;
          if(!isChild){
            scope.$apply(function() {
            var enterSubmitFunction = $parse(attrs['onDocumentClick']);                                 
            enterSubmitFunction(scope, { $event: event });
          });
          }
        };

        $document.on('click', onClick);
      }
    };
  }
]);