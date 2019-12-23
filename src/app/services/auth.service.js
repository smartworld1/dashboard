(function () {
    'use strict';
    angular
        .module('app.services')
        .factory('authService', authService)

    function authService($q, _, $http, localStorageService) {
        var basePath = 'https://api-tour.smartworld.cl';
        return {
            login: login,
            getUser: getUser,
            logout: logout,
            isAdmin: isAdmin,
            isAuth: isAuth
        }

        function isAdmin(user) {
            return $q.when(true);
        }

        function login(user) {
            return $http.post(basePath + '/api/user/login', user
            ).then(function successCallback(response) {
                return response.data
            })

        }

        function getUser() {
            var token = localStorageService.get('token');
            return $http.get(basePath + '/api/user/', {
                headers: {
                    'x-token': token
                }
            }).then(function successCallback(response) {
                return response.data
            })
        }

        function isAuth() {
            var token = localStorageService.get('token');
            return token?true:false;
        }

        function logout() {
            localStorageService.clearAll();
            return $q.when(true);
        }


    }
})();