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
          vertices.push(lines[i].split(' '));
        }

        //faces
        limit = parseInt(lines[i]) + i;
        i++;
        for(i; i <= limit; i++){
          faces.push(lines[i].split(' '));
        }

        Map.vertices = vertices;
        Map.faces = faces;

      },
      vertices: [],
      faces: []
    };
    return Map;
  });
