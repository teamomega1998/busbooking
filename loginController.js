var  myModule = angular.module("myLoginModule",[]);

myModule.config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  });

myModule.controller('addLoginController',function($scope,$http,$log){
    $scope.login = function() { 
        $scope.user =  $http({
              method: 'POST',
              url: 'https://busbookingteamomega.herokuapp.com/api/users/login',
              data: {
                  email: $scope.email,
                  password: $scope.password
              },
              headers:{    
                'Content-Type': 'application/json'
            },
          })
          .then(function(response){

              window.location.href = '/Bookings.html';

          }, function (response) {
              $scope.error = response.data;
              alert("unsuccessful call");
             console.log($scope.error);
          });
  }

 
});

myModule.controller('addSignUpController',function($scope,$http,$log){
    $scope.signUp = function() { 
        $scope.user =  $http({
              method: 'POST',
              url: 'https://busbookingteamomega.herokuapp.com/api/users/signup',
              data: {
                  name: $scope.name ,
                  email: $scope.email,
                  password: $scope.password,
                  passwordConfirm: $scope.passwordConfirm 
              },
              headers:{    
                'Content-Type': 'application/json'
            },
          })
          .then(function(response){
              $scope.userData = response.data;
              $scope.status = response.status;
              $scope.headers = response.headers;
              $scope.config = response.config;
              window.location.href = '/Bookings.html';
          }, function (response) {
              $scope.error = response.data;
              alert("unsuccessful call");
             console.log($scope.error);
          });
    }
});


myModule.controller('addForgotPasswordController',function($scope,$http,$log){
    $scope.forgotPassword = function() { 
        $scope.user =  $http({
              method: 'POST',
              url: 'https://busbookingteamomega.herokuapp.com/api/users/forgotPassword',
              data: {
                  email: $scope.email,
              },
              headers:{    
                'Content-Type': 'application/json'
            },
          })
          .then(function(response){
              $scope.userData = response.data;
              $scope.status = response.status;
              $scope.headers = response.headers;
              $scope.config = response.config;
              alert(response.data.message);
          }, function (response) {
              $scope.error = response.data;
              alert("unsuccessful call");
             console.log($scope.error);
          });
    }
});