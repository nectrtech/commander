(function() {
  'use strict';

  angular
    .module('scotiaCommander')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }

})();
