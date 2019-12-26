(function () {
    'use strict';
    angular
        .module('app.services')
        .factory('usersService', usersService)

    function usersService($q, _, $http, localStorageService) {
        var basePath = 'https://api-tour.smartworld.cl';
        return {
            getUsers: getUsers,
            switchUser: switchUser
        }
       
        function getUsers() {
            var token = localStorageService.get('token');
            return $http.get(basePath + '/api/user/verUsuarios', {
                headers: {
                    'x-token': token
                }
            }).then(function successCallback(response) {
                return response.data
            })
        }

        function switchUser(user) {
            var token = localStorageService.get('token');
            return $http.post(basePath + '/api/user/update',user, {
                headers: {
                    'x-token': token
                }
            }).then(function successCallback(response) {
                return response.data
            })
        }



    }
})();