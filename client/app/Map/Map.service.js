'use strict';

angular.module('mbMapApp')
  .factory('Map', function ($http) {
    var Map = {
      import: function (data) {
        var lines = data.split('\n');
        var vertices = [];
        var faces = [];
        var items = [];

        var limit, i;
        i = 0;

        //vertices
        limit = parseInt(lines[i]);
        i++;
        for(i; i <= limit; i++){
          items = lines[i].split(' ');
          vertices.push([ Number(items[0]), Number(items[2]), Number(items[1]) ]);
        }

        //faces
        limit = parseInt(lines[i]) + i;
        i++;
        for(i; i <= limit; i++){
          items = lines[i].split(' ');
          faces.push([ parseInt(items[3]), parseInt(items[4]), parseInt(items[5]) ]);
        }

        Map.vertices = vertices;
        Map.faces = faces;

      },
      vertices: [],
      faces: []
    };
    return Map;
  });
