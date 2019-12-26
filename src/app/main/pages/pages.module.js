(function ()
{
    'use strict';
    angular
        .module('app.pages', [
            'app.pages.home',
            'app.pages.users',
            'app.pages.agencias'

        ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider)
    {
            $stateProvider
            .state('app.pages', {
                abstract: true,
                url: '/dashboard'
            });
        
    }
})();