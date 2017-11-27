(function () {
    'use strict';
    loggerApp.config(routerConfig);
    function routerConfig($stateProvider,$urlRouterProvider){

        $stateProvider
            .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller : 'loginController'
        }).state('home',{
            url: '/',
            templateUrl: 'views/home.html',
            controller : 'homeController'
        });
        
        $urlRouterProvider.otherwise('/');
        
    };
})();






