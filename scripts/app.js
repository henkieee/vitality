angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
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

angular.module('myApp').controller("myRegionCtrl", ['Regions', function(Regions) {
    var vm = this;
    Regions.getAll()
      .then(function(data) {
          vm.regions = data;
      });

    vm.showRegion = function(regionNet)
    {
      vm.currentRegion = null;

      angular.forEach(vm.regions, function(region) {
        console.log(region.net);
        if(regionNet == region.net)
        {
          vm.currentRegion = region;
          console.log(region);
        }
      });
    }
}]);

angular.module('myApp').service('Regions', ['$http', '$q', function($http, $q) {
    this.getAll = function()
    {
          var deferred = $q.defer();

          $http.get('regions.json').success(function(data) { 
              deferred.resolve(data);
          });

          return deferred.promise;
    };
}]);


