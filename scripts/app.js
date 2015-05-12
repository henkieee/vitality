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

angular.module('myApp').service('Regions', ['$http', function($http) {
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


