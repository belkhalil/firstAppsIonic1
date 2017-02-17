// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state("meteo",{
url : "/meteo",
templateUrl : "templates/meteo.html",
controller : "meteoController"
  });
  $stateProvider.state("infoMeteo",{
url : "/infoMeteo/:city",
templateUrl : "templates/infoMeteo.html",
controller : "infoMeteoController"
  });
  $stateProvider.state("contact",{
url : "/contact",
templateUrl : "templates/contact.html"
  });
  $stateProvider.state("geo",{
url : "/geo",
templateUrl : "templates/geo.html"
  });
  $stateProvider.state("config",{
url : "/config",
templateUrl : "templates/config.html"
  });
   $urlRouterProvider.otherwise("meteo");
});

app.controller('meteoController', ['$scope','$state', function($scope,$state){
 $scope.getMeteo = function(ville)
  {
$state.go("infoMeteo",{
  city : ville
})
  };
}]);
app.controller('infoMeteoController', function($scope,$stateParams,$http,$ionicLoading){

  var url = "http://api.openweathermap.org/data/2.5/forecast?q="+$stateParams.city+"&APPID=2895fd3378eeecf9da273edec134212e";
$ionicLoading.show({
  template : "chargement en cours ..."
});
var res = $http.get(url);
res.success(function(data){
$scope.meteo=data;
$ionicLoading.hide();
});
res.error(function(data){
$ionicLoading.hide();
})
});