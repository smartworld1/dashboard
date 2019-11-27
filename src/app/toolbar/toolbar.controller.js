(function() {
    'use strict';

    angular
        .module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /** @ngInject */
    function ToolbarController($scope, $rootScope, $q, $state, $timeout, $mdSidenav, $translate, $mdToast, $log, authService, msNavigationService) {
        var vm = this;

        // Data
        $rootScope.global = {
            search: ''
        };

        vm.bodyEl = angular.element('body');
        vm.languages = {
            en: {
                'title': 'English',
                'translation': 'TOOLBAR.ENGLISH',
                'code': 'en',
                'flag': 'us'
            },
            es: {
                'title': 'Spanish',
                'translation': 'TOOLBAR.SPANISH',
                'code': 'es',
                'flag': 'es'
            }
        };

        // Methods
        vm.toggleSidenav= toggleSidenav;
        vm.logout = logout;
        vm.changeLanguage = changeLanguage;
        vm.toggleHorizontalMobileMenu = toggleHorizontalMobileMenu;
        vm.toggleMsNavigationFolded = toggleMsNavigationFolded;
        vm.search = search;
        vm.searchResultClick = searchResultClick;



        //////////

        init();

        /**
         * Initialize
         */
        function init() {
            vm.selectedLanguage = vm.languages[$translate.preferredLanguage()];
        }


       


        function toggleSidenav(sidenavId) {
            $mdSidenav(sidenavId).toggle();
        }


      
    

        /*
         * Logout Function
         */
        function logout() {
            authService.logout().then(function(){
                $state.go('app.auth_login');
            })

        }

        /**
         * Change Language
         */
        function changeLanguage(lang) {
            vm.selectedLanguage = lang;
            $translate.use(lang.code);
        }

        /**
         * Toggle horizontal mobile menu
         */
        function toggleHorizontalMobileMenu() {
            vm.bodyEl.toggleClass('ms-navigation-horizontal-mobile-menu-active');
        }

        /**
         * Toggle msNavigation folded
         */
        function toggleMsNavigationFolded() {
            msNavigationService.toggleFolded();
        }

        /**
         * Search action
         *
         * @param query
         * @returns {Promise}
         */
        function search(query) {
            var navigation = [],
                flatNavigation = msNavigationService.getFlatNavigation(),
                deferred = $q.defer();

            // Iterate through the navigation array and
            // make sure it doesn't have any groups or
            // none ui-sref items
            for (var x = 0; x < flatNavigation.length; x++) {
                if (flatNavigation[x].uisref) {
                    navigation.push(flatNavigation[x]);
                }
            }

            // Todo acceso directo a nodos
            if (query) {
                navigation = navigation.filter(function(item) {
                    if (angular.lowercase(item.title).search(angular.lowercase(query)) > -1) {
                        return true;
                    }
                });
            }

            // Fake service delay
            $timeout(function() {
                deferred.resolve(navigation);
            }, 1000);

            return deferred.promise;
        }

        /**
         * Search result click action
         *
         * @param item
         */
        function searchResultClick(item) {
            // If item has a link
            if (item.uisref) {
                // If there are state params,
                // use them...
                if (item.stateParams) {
                    $state.go(item.state, item.stateParams);
                } else {
                    $state.go(item.state);
                }
            }
        }
    }

})();