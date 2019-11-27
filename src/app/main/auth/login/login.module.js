(function() {
    'use strict';

    angular
        .module('app.auth.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider.state('app.auth_login', {
            url: '/',
            views: {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.auth_login': {
                    templateUrl: 'app/main/auth/login/login.html',
                    controller: 'LoginController as vm'
                }
            },
            bodyClass: 'login'
        });

        


    }

})();