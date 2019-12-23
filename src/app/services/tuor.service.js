(function () {
    'use strict';
    angular
        .module('app.services')
        .factory('tourService', tourService)

    function tourService($q, _, $http, localStorageService) {
        var basePath = 'https://api-tour.smartworld.cl';
        return {
            getTours: getTours
        }
       
        function getTours() {
            var token = localStorageService.get('token');
            return $http.get(basePath + '/api/tours', {
                headers: {
                    'x-token': token
                }
            }).then(function successCallback(response) {
                return response.data
            })
        }



    }
})();