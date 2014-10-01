'use strict';

angular.module('mbMapApp')
  .factory('File', function ($q, $http) {
    var File = {
      load: function (path) {
        var deferred = $q.defer();

        $http.get(path).
        success(function(data){
          deferred.resolve(data);
        }).
        error(function(){
          deferred.reject();
        });

        return deferred.promise;
      }
    };
    return File;
  });
