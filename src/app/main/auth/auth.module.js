(function ()
{
    'use strict';

    angular
        .module('app.auth', [
            'app.auth.login'
            ,

        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {

    }
})();