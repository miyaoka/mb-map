'use strict';

angular.module('mbMapApp')
  .factory('Map', function ($http) {
    function lineToItems(line){
      return line.replace(/^\s+|\s+$/g, '').split(/\s+/);
    }
    var Map = {
      import: function (data) {
        var lines = data.split('\n');
        var line;
        var vertices = [];
        var faces = [];
        var items = [];

        var limit, i;
        i = 0;

        //vertices
        limit = parseInt(lines[i]);
        i++;
        for(i; i <= limit; i++){
          vertices.push(lineToItems(lines[i]));
        }
        //faces
        limit = parseInt(lines[i]) + i;
        i++;
        for(i; i <= limit; i++){
          faces.push(lineToItems(lines[i]));
        }
        Map.vertices = vertices;
        Map.faces = faces;

      },
      vertices: [],
      faces: []
    };
    return Map;
  });
