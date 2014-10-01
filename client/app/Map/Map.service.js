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
          vertices.push([ items[0], items[2], items[1] ]);
        }

        //faces
        limit = parseInt(lines[i]) + i;
        i++;
        for(i; i <= limit; i++){
          items = lines[i].split(' ');
          faces.push([ items[4], items[5], items[6] ]);
        }

        Map.vertices = vertices;
        Map.faces = faces;

      },
      vertices: [],
      faces: []
    };
    return Map;
  });
