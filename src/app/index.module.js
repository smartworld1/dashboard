(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [
            // Common 3rd Party Dependencies
           
            'angularMoment',
            'LocalStorageModule',
            'md.data.table',
            'ngFileUpload',

            // Core
            'app.core',

            //Auth
            'app.auth',

            // Theme Haibu Smart
            'app.theme',

            //Services
            'app.services',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Pages
            'app.pages'

           
        ]);
})();