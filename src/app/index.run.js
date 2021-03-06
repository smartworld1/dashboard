(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $log,$timeout, $state,$location,amMoment, authService)
    {


        //Change locate moment 
        amMoment.changeLocale('es');

        

        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function ()
        {
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });


        var restrictedPage = $.inArray($location.path(), ['/']) === -1;
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if (restrictedPage && !authService.isAuth()) {
                $location.path('/');
            } 
            if ($location.path()=='/' && authService.isAuth()) {
                $location.path('/home');
            }            
        });

        
    }
})();