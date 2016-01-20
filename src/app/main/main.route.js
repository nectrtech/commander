(function () {
  'use strict';

  angular
    .module('scotiaCommander')
    .config(routeConfig);

  /** @ngInject **/
  function routeConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  }
})();
