(function() {
  'use strict';

  angular
    .module('fuse')
    .directive('serverValidation', serverValidation)
    .directive('apsUploadFile', apsUploadFile)
    .directive('chooseFile',chooseFile); 
    
    function chooseFile() {
      return {
        link: function (scope, elem, attrs) {
          var button = elem.find('button');
          var input = angular.element(elem[0].querySelector('input#fileInput'));
  
          button.bind('click', function() {
            input[0].click();
          });
  
          input.bind('change', function(e) {
            scope.$apply(function() {
              var files = e.target.files;
              if (files[0]) {
                scope.fileName = files[0].name;
              } else {
                scope.fileName = null;
              }
            });
          });
        }
      };
    }

  function apsUploadFile() {
      var directive = {
          restrict: 'E',
          templateUrl: 'upload.file.template.html',
          link: apsUploadFileLink
      };
      return directive;
  }

  function apsUploadFileLink(scope, element, attrs) {
      var input = $(element[0].querySelector('#fileInput'));
      var button = $(element[0].querySelector('#uploadButton'));
      var textInput = $(element[0].querySelector('#textInput'));

      if (input.length && button.length && textInput.length) {
          button.click(function (e) {
              input.click();
          });
          textInput.click(function (e) {
              input.click();
          });
      }

      input.on('change', function (e) {
          var files = e.target.files;
          if (files[0]) {
              scope.fileName = files[0].name;
          } else {
              scope.fileName = null;
          }
          scope.$apply();
      });
  };

  function serverValidation() {
    return {
      restrict: "A",
      require: "ngModel",
      scope: {
        ngModel: "=",
        serverValidation: "=" // String or array of strings with name of errors
      },

      link: function(scope, elem, attr, ngModelCtrl) {
        function setValidity(errorName) {
          ngModelCtrl.$setValidity(errorName, true);
        }
        if (typeof(scope.serverValidation) == "string") {
          scope.arrServerValidation = [scope.serverValidation];
        } else {
          scope.arrServerValidation = scope.serverValidation;
        }
        var firstError = scope.arrServerValidation[0];
        scope.$watch('ngModel', function() {
          // workaround to don't update $setValidity, then changed value of ngModel
          // update $setValidity, only when server-error is true
          if (firstError && ngModelCtrl.$error[firstError])
            angular.forEach(scope.arrServerValidation, setValidity);
        });
      },
    }
  }
  

})();