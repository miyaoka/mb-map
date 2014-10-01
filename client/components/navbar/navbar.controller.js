'use strict';

angular.module('mbMapApp')
  .controller('NavbarCtrl', function ($scope, File, Map, Parties) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;


    $scope.loadModule = function(){
      console.log($scope.selectedModule);

      File.load([
        'assets',
        'data',
        $scope.selectedModule,
        'map.txt'
      ].join('/')).
      then(function(data){
        Map.import(data);
      });

      File.load([
        'assets',
        'data',
        $scope.selectedModule,
        'parties.txt'
      ].join('/')).
      then(function(data){
        Parties.import(data);
      });

    };

    $scope.modules = [
      {
        id: 'Native-wb',
        label: 'Native（WB）'
      },
      {
        id: 'Native',
        label: 'Native（無印）'
      },
      {
        id: 'Ogniem i Mieczem',
        label: 'WF&S'
      },
      {
        id: '1257AD',
        label: '1257AD'
      },
      {
        id: 'Brytenwalda',
        label: 'Brytenwalda'
      },
      {
        id: 'Prophesy of Pendor 3.611',
        label: 'PoP'
      }
    ];
    $scope.selectedModule = $scope.modules[0].id;
    $scope.loadModule();


  });