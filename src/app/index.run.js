(function() {
  'use strict';

  angular
    .module('scotiaCommander')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
