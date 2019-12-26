(function () {
    'use strict';
    angular
        .module('app.services')
        .factory('tourService', tourService)

    function tourService($q, _, $http, localStorageService) {
        var basePath = 'https://api-tour.smartworld.cl';
        return {
            getTours: getTours,
            getAgencias: getAgencias,
            switchTour: switchTour,
            crearTour: crearTour,
            uploadFile: uploadFile,
            updateTour:updateTour
        }
       
        function getTours() {
            var token = localStorageService.get('token');
            return $http.get(basePath + '/api/tours?type=free', {
                headers: {
                    'x-token': token
                }
            }).then(function successCallback(response) {
                return response.data
            })
        }

         
        function getAgencias() {
            var token = localStorageService.get('token');
            return $http.get(basePath + '/api/tours?type=agencia', {
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
        function updateTour(tour) {
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

        function uploadFile(file, id) {
            var token = localStorageService.get('token');
            console.log(file)
            console.log(file.name)
            console.log(id)

            var formData = new FormData();
            formData.append("id_tour",id);
            formData.append("image",file,file.name);
            console.log(formData)
            return $http.post(basePath + '/api/upload',formData, {
                transformRequest: angular.identity,
                headers: {
                    'x-token': token,
                    'Content-Type': undefined 
                }
            }).then(function successCallback(response) {
                return response.data
            })
        }



    }
})();