'use strict';

angular.module('mbMapApp')
  .controller('MainCtrl', function ($scope, Map) {
    $scope.canvasWidth = 400;
    $scope.canvasHeight = 400;
    $scope.dofillcontainer = true;
    $scope.scale = 1;
    $scope.materialType = 'lambert';
    $scope.map = Map;

  });
