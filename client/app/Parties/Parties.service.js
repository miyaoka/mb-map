'use strict';

angular.module('mbMapApp')
  .factory('Parties', function () {
    var Parties = {
      import: function (data) {
        var lines = data.split('\n');
      }

    };
    return Parties;
  });