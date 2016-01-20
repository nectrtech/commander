(function () {
  'use strict';

  angular
    .module('scotiaCommander')
    .value('mainShoesCommandConfig', {
      delimiter: ' ',
      minLength: 1,
      prompt: 'shop for shoes',
      commands: {
        'buy': {
          level: 0,
          commands: ['shoes', 'socks', 'sandals', 'boots', 'slippers', 'clogs']
        },
        'sell': {
          level: 0,
          commands: ['shoes', 'socks', 'sandals', 'boots', 'slippers', 'clogs']
        },
        'rent': {
          level: 0,
          commands: ['shoes', 'socks', 'sandals', 'boots', 'slippers', 'clogs']
        },
        'shoes': {
          commands: ['size', 'shape', 'color', 'price', 'style']
        },
        'socks': {
          commands: ['size', 'shape', 'color', 'price', 'style']
        },
        'sandals': {
          commands: ['size', 'shape', 'color', 'price', 'style']
        },
        'boots': {
          commands: ['size', 'shape', 'color', 'price', 'style']
        },
        'slippers': {
          commands: ['size', 'shape', 'color', 'price', 'style']
        },
        'clogs': {
          commands: ['size', 'shape', 'color', 'price', 'style']
        },
        'size': {
          description: 'size - e.g. size:11, or size:12W.'
        },
        'shape': {
          description: 'shape - e.g. shape regular, or shape clown.'
        },
        'color': {
          description: 'color - e.g. color purple, or color blue.'
        },
        'price': {
          description: 'price - e.g. price <25, or price 100+.'
        },
        'style': {
          description: 'style - e.g. style saddle, or style loafer'
        }
      }
    })
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, mainShoesCommandConfig) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1452859575745;
    vm.showToastr = showToastr;
    vm.commandConfig = mainShoesCommandConfig;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function () {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function (awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
