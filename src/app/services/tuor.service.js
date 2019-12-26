(function () {
    'use strict';
    angular
        .module('app.services')
        .factory('tourService', tourService)

    function tourService($q, _, $http, localStorageService) {
        var basePath = 'https://api-tour.smartworld.cl';
        return {
            getTours: getTours,
            switchTour: switchTour,
            crearTour: crearTour,
            uploadFile: uploadFile
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

        function switchTour(tour) {
            var token = localStorageService.get('token');
            return $http.put(basePath + '/api/tours',tour, {
                headers: {
                    'x-token': token
                }
            }).then(function successCallback(response) {
                return response.data
            })
        }

        function crearTour(tour) {
            var token = localStorageService.get('token');
            return $http.post(basePath + '/api/tours',tour, {
                headers: {
                    'x-token': token
                }
            }).then(function successCallback(response) {
                return response.data
            })
        }

        function uploadFile(file, tour) {
            var token = localStorageService.get('token');
            const formData = new FormData();
            formData.append("id_tour",tour);
            formData.append("image",file,file.name);

            return $http.post(basePath + '/api/upload/',formData, {
                headers: {
                    'x-token': token
                }
            }).then(function successCallback(response) {
                return response.data
            })
        }



    }
})();