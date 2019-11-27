(function ()
{
    'use strict';
    angular
        .module('app.services')
        .factory('authService',authService)

        function authService($q,_){
            return{
                login:login,
                logout:logout,
                isAdmin:isAdmin,
                isAuth:isAuth
            }

            function isAdmin(user){
                return $q.when(true);
            }

            function isAdminNoCache(user){    
                return $q.when(true);
            }           

            function login(email, password){
               return $q.when(true);
            }

            function getCurrentUser(){
                return $q.when(true);
            }

            function isAuth() {
                return $q.when(true);
            }

            function logout(){
                return $q.when(true);
            }


        }
})();