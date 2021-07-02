var  myModule = angular.module("myContactModule",[]);

myModule.controller('addContactController',function($scope,$http,$log){
    $scope.contact = function() { 
        console.log('hello');
        $scope.user =  $http({
              method: 'POST',
              url: 'http://127.0.0.1:3000/api/contacts',
              data: {
                  name: $scope.name,
                  email: $scope.email,
                  message: $scope.message
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
              alert("Thankyou for giving feedback");

          }, function (response) {
              $scope.error = response.data;
              alert("unsuccessful call");
             console.log($scope.error);
          });
  }

 
});

