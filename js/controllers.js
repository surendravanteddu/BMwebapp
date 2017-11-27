(function () {
    'use strict';
    loggerApp.controller("loginController", ['$scope','AppConfig','$http','$state','$location',function($scope,AppConfig,$http,$state,$location){
        $scope.signup = {};
        $scope.login = {};
        $scope.loginFailed = false;
        $scope.signupFailed = false;

        $scope.signIn= function(){
            $http.post(AppConfig.forms.userLogin, $scope.login, {headers: {'Content-Type': 'application/json'} })
                .then(function (response) {
                var rdata = response.data;
                console.log(rdata.message);
                var token = response.headers()['x-jwt-token'];
                var status = response.status;
                var statusText = response.statusText;
                if(status == 200){
                    localStorage.setItem('token',rdata.token); 
                    localStorage.setItem('username',$scope.login.email.split("@")[0]); 
                    $state.go('home');
                }
            },function(error){
                $scope.loginFailed = true;
                $scope.loginError = error.data.message;
            });
        };

        $scope.signUp = function(){
            if($scope.signup.password == $scope.signup.repassword){
                $http.post(AppConfig.forms.userRegister, $scope.signup, {headers: {'Content-Type': 'application/json'} })
                    .then(function (response) {
                    var rdata = response.data;
                    var token = response.headers()['x-jwt-token'];
                    var status = response.status;
                    var statusText = response.statusText;
                    if(status == 201){
                        localStorage.setItem('token',rdata.token); 
                        $state.go('home');
                    }
                },function(error){
                    $scope.signupFailed = true;
                    $scope.signupError = error.data.message;
                });
            }else{
                $scope.signupFailed = true;
                $scope.signupError = "Passwords doesnot match";
            }
        };

    }])

        .controller('homeController',['$scope','AppConfig','$http','$state',function($scope,AppConfig,$http,$state,searchSuggestions,seriesInfo){
            $scope.username = localStorage.getItem("username");
            $scope.logout = function(){
                localStorage.clear();
                $state.go('login');    
            };
        }]);

})();    




