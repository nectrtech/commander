(function () {
  'use strict';

  angular
    .module('scotiaCommander')
    .value('pantsCommandConfig', {
      delimiter: ' ',
      minLength: 1,
      prompt: 'buy some pants!',
      commands: {
        'buy': {
          level: 0,
          commands: ['jeans', 'dockers']
        },
        'borrow': {
          level: 0,
          commands: ['jeans', 'dockers']
        },
        steal: {
          level: 0,
          commands: ['jeans', 'dockers']
        },
        jeans: {
          commands: ['size', 'color']
        },
        dockers: {
          commands: ['size', 'color', 'style']
        },
        size: {
          description: 'size - e.g. size 32".'
        },
        color: {
          description: 'color - e.g. color blue.'
        },
        style: {
          description: 'style - e.g. style creased, or style pleated.'
        }
      }
    })
    .controller('PantsController', PantsController);

  /** @ngInject **/
  function PantsController(pantsCommandConfig) {
    var vm = this;

    vm.commandConfig = pantsCommandConfig;
    vm.buyPants = function (pantsCommand) {
      console.log('pantsCommand: ' + pantsCommand);
    };
  }
})();
