(function () {
  'use strict';

  angular
    .module('scotiaCommander')
    .config(routeConfig);

  /** @ngInject **/
  function routeConfig($stateProvider) {
    $stateProvider
      .state('pants', {
        url: '/pants',
        templateUrl: 'app/pants/pants.html',
        controller: 'PantsController',
        controllerAs: 'pants'
      })
  }
})();
