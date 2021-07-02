var  myModule = angular.module("myFindBusModule",[]);

const stripe = Stripe('pk_test_51Ia2WwA6psh4p5qdfIuQwbELJwICfex0iZYGZLPU5s9mv7vc8ogdSdmDut5kfBdqAWhIHy5NbNus3GBPqFkO828000Q14T7DbW');


myModule.config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  });

myModule.controller('findbusController',function($scope,$http,$compile){
    $scope.findbuses = function() { 
        $scope.user =  $http({
              method: 'GET',
              url: `http://127.0.0.1:3000/api/buses/availableBuses?from=${$scope.from}&to=${$scope.to}&type=${$scope.type}`,
             
          })
          .then(function(response){
              response.data.data.data.forEach(bus => {
                angular.element(document.querySelector(".bus-view")).append($compile(myHtml(bus))($scope));
                
              });
             // alert("Thankyou for giving feedback");

          }, function (response) {
              $scope.error = response.data;
              alert("unsuccessful call");
             console.log($scope.error);
          });
  }

  $scope.bookNow =  function (id) {
    $http({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/buses/${id}`,
    })
    .then(function(response){
      
      $http({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/bookings/checkout-session/${id}`
      }).then(async function(session){
             // 2) Create checkout form + chanre credit card
        try{
          await stripe.redirectToCheckout({
             sessionId: session.data.session.id
          });
        } catch (err) {
          alert('error'); 
       }
      },function (response) {
         alert("You're not loggin in");
      });
     

  }, function (response) {
      $scope.error = response.data;
      alert("unsuccessful call");
      console.log($scope.error);
   });
  }

 
});



function myHtml(bus) {
    return  `
    <div class="busContainer">
    <div>
        <img src="./bus.jpg" alt="" srcset="" style="width: 150px;height: 150px;">
    </div>
    <div>
        <br>
        <h5>${bus.name}</h5>
    </div>
    <div>
        <div><div class="row bs-wizard" style="border-bottom:0;">
    </div>
    <div>
        <div>
            <p class="booking-item-price">LKR ${bus.price}</p>
        </div>
        <p class="booking-item-flight-class">Available seats: ${bus.available_seats}/${bus.no_of_seats}</p>
        <div class="gap-small"></div>
        <a class="btn btn-primary btn-block btn-lg" ng-click="bookNow('${bus._id}')"><strong>Book Now</strong></a>
    </div>
   </div>
    `;
 }
 

