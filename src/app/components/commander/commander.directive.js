/**
 * @ngdoc directive
 * @name dbCommander
 * @description a directive that treats an input field as a command entry portal. What this means is that it treats
 * the entry of the input field as a set of distinct commands/search terms and, through configuration, can be used
 * in different contexts. This example application shows various uses
 *
 * Currently, the typeahead template is not yet functional, but the intent is to use this as a basis for a multi-search
 * search or command typeahead entry field that can then be used to call back controllers when an event is triggered from,
 * say a button, for example.
 *
 * @example this directive is intended to be used with a command structure (see the example structure below - exampleCommanderConfig).
 * You can specify each of the following:
 * delimiter: This is the delimiter you wish to use to separate commands in the input field. The default is a ' ', space.
 * minLength: This is to represent the default number of characters that need to be typed before the search/filter mechanism is engaged.
 * prompt: The prompt for the empty input field
 * commands:
 *  commands represent individual entry tokens withing the input field. Each is named at the top level of the commands
 *  property/structure. They can have the following properties:
 *
 *  level: Optional. This is the level of the command. Generally, only the first command is considered and to identify a command
 *  as a top-level command, use a level of 0. All child commands are parsed recursively based on the top level commands.
 *  commands: Optional. This lists the available child command names, which map to commands structure entries.
 *  description: Optional. This is useful for specifying a hint or description which can be displayed to the user
 *  while actively inputing commands when the typeahead feature is live.
 */
(function () {
  'use strict';
  angular
    .module('scotiaCommander')
    .value('dbCommanderConfig', {
      delimiter: ' '
    })
    .value('exampleCommanderConfig', {
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
    .constant('controlKeys', {
      8: 'BACKSPACE',
      13: 'ENTER',
      38: 'UPARROW',
      40: 'DOWNARROW',
      47: 'DELETE'
    })
    .directive('dbCommander', dbCommander);

  /** @ngInject **/
  function dbCommander(dbCommanderConfig, controlKeys) {
    var activeConfig = angular.extend({
      delimiterKeyCode: dbCommanderConfig.delimiter.charCodeAt(0)
    }, dbCommanderConfig);

    // todo - finish the template
    // todo - do the function to get the list of actual commands from the target group
    // todo - add key support bindings
    // todo - do the documentation
    return {
      restrict: 'AE',
      require: 'ngModel',
      scope: {
        dbCommandConfig: '=',
        dbCommandTrigger: '&'
      },
      templateUrl: 'app/components/commander/db-commander.html',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs, model) {
      // the order of the extend is important here - the incoming (if any config overrides the default config)
      activeConfig = angular.extend(activeConfig, scope.dbCommandConfig);
      var commandMap = buildCommandMap(activeConfig);

      // this is a show-stopper - can't have the specified delimiter as part of the controlKeys group!
      if (controlKeys[activeConfig.delimiterKeyCode]) {
        throw 'you\'ve specified the delimiterKeyCode to be one of the disallowed controlKeys';
      }

      scope.currentCommandSearchIndex = null;
      scope.currentSearchTerms = null;
      scope.searchTerm = '';
      scope.keyPressed = keyPressed;

      // todo - add a scope variable function to get the description, if it exists

      var inputField = elem.find('input');
      inputField.on('keyup', scope.keyPressed);

      function keyPressed(event) {
        if (!(controlKeys[event.which])) {
          var commandDescriptor = getCommandDescriptor(inputField);
          scope.currentSearchTerms = getCurrentSearchTerms(commandDescriptor, commandMap);
        } else {
          event.preventDefault();
        }
      }
    }

    /**
     * Returns the details for the commands, including the current ordinal of the command group.
     * @param elem
     * @returns {{commands: *, count: *, current: number}}
     */
    function getCommandDescriptor(elem) {
      // todo - make sure that 'double spaces' is eventually taken care of within the command string
      // todo - need some kind of verification/validation and removal of extra delimiters, but this needs to be done cleanly
      var commands = elem.val().split(activeConfig.delimiter);
      var cumulative = 0;
      var currentCommand = commands.length - 1;

      angular.forEach(commands, function (command, index, arr) {
        if (elem[0].selectionStart <= (command.length + cumulative)) {
          // we've found our command group
          currentCommand = index;
        } else {
          // add the current command's length property to the cumulative and add one for the delimiter if this isn't the last command group
          cumulative += command.length + (((index + 1) < arr.length) ? 1 : 0);
        }
      });

      /**
       * commands: the array of split commands/groups from the input field
       * count: the count of the groups resulting from the split
       * current: the current index/command group, i.e. where the cursor is - what command group part is it actually on?
       */
      return {
        text: elem.val(),
        commands: commands,
        count: commands.length,
        current: currentCommand
      };
    }

    function getCurrentSearchTerms(descriptor, commandMap) {
      if (descriptor.current === 0) {
        return commandMap[0];
      }

      // return the correct, next level command list of the current parent command
      return commandMap[descriptor.current] ? commandMap[descriptor.current][descriptor.commands[(descriptor.current - 1)]] : null;
    }

    /**
     * Builds the command structure from the main command map so that drill-down lists can be determined for searches.
     *
     * This, along with the buildChildCommandMaps, breaks the map into a structure where search lists for each
     * command group can be found easily as commands are typed into the input field.
     */
    function buildCommandMap(config) {
      var map = {
        0: []
      };

      angular.forEach(config.commands, function (cmd, name) {
        // looking for level 0 (top-level) commands first and then we'll use recursion to drill down
        if (cmd.level === 0 && cmd.commands) {
          map[0].push(name);
          //map[0][name] = cmd.commands;
          buildChildCommandMaps(config, map, 1, cmd.commands, name);
        }
      });

      return map;
    }

    function buildChildCommandMaps(config, map, index, commands, parent) {
      if (!(map[index])) {
        map[index] = {};
      }

      if (!(map[index][parent])) {
        map[index][parent] = [];
      }

      angular.forEach(commands, function (cmd) {
        if (config.commands[cmd]) {
          map[index][parent].push(cmd);// = config.commands[cmd].commands;
          if (config.commands[cmd].commands) {
            buildChildCommandMaps(config, map, index + 1, config.commands[cmd].commands, cmd);
          }
        }
      });
    }
  }
})();
