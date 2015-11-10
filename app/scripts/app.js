require('angular');
require('angular-route');
require('angular-resource');

var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.

    when('/region', {
      templateUrl: 'views/regio.html',
      controller: 'myRegionCtrl',
      controllerAs: 'regionCtrl'
    }).
    when('/vitality', {
        templateUrl: 'views/vitality.html'
    }).
    when('/healthy', {
        templateUrl: 'views/vitality.html'
    }).
    when('/contact', {
        templateUrl: 'views/vitality.html'
    }).
    when('/news', {
        templateUrl: 'views/vitality.html'
    }).
    otherwise({
        redirectTo: '/vitality'
    });
}]);

app.controller("myRegionCtrl", ['Regions', function(Regions) {
    var vm = this;

    Regions.getAll()
      .then(function(result) {
          vm.regions = result.data;
      });

    vm.showRegion = function(regionNet)
    {
      vm.currentRegion = null;

      angular.forEach(vm.regions, function(region) {
        if(regionNet == region.net)
        {
          vm.currentRegion = region;
        }
      });
    }
}]);

app.service('Regions', ['$http', function($http) {
    return {
      /**
       * Fetch all dutch regions
       * @returns {HttpPromise}
       */
      getAll: function()
      {
        return $http.get('regions.json').
          success(function(data) {
            console.log('data', data);
            return data;
          }).
          error(function(data) {
            console.log('Error by fetching all the regions ', data);
          });
      }
    };
}]);



