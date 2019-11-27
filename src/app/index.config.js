(function() {
    'use strict';

    angular
        .module('fuse')
        .config(config);

    /** @ngInject */
    function config($logProvider, $translateProvider,$httpProvider,$mdDateLocaleProvider) {

     

        $mdDateLocaleProvider.firstDayOfWeek = 1;

        //URL where to access the LoopBack REST API server
        
         $httpProvider.interceptors.push(function($q, $location) {
          return {
            responseError: function(rejection) {
              if (rejection.status == 401) {
                //Now clearing the values from client browser for safe logout...
               
                $location.nextAfterLogin = $location.path();
                $location.path('/');
              }
              return $q.reject(rejection);
            }
          };
        });

        


        $logProvider.debugEnabled(true);



        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('es');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        


    }

})();