var loggerApp;
var apiUrl = (window.location.href.includes('https')) ? 'https://bmwebservices.herokuapp.com/webapi/' : 'http://localhost:8080/booksManagement/webapi/';
(function () {
    'use strict';
    loggerApp =  angular
        .module("loggerApp", [
        'ui.router',
        'ngResource',
        'ngRoute'
    ]).run(run);

    run.$inject = ['$rootScope', '$location', '$state','$http'];
    function run($rootScope, $location, $state, $http) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            $http.get(API_URL+"validatetoken/"+localStorage.getItem('token'))
                .then(function(data){
                 if(data.data !== "valid"){
                    $location.path('/login'); 
                 }
            });
        });
    }
    
    var API_URL = apiUrl;

    loggerApp.constant('AppConfig', {
        apiUrl: API_URL,
        forms: {
            userLogin: API_URL + 'login',
            userRegister: API_URL + 'register'
        }
    });
})();
