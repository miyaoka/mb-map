'use strict';

angular.module('mbMapApp')
  .directive('tjsMap', function () {
    return {
      restrict: 'A',
      scope: {
        'width': '=',
        'height': '=',
        'fillcontainer': '=',
        'scale': '=',
        'materialType': '=',
        'map': '='
      },
      link: function (scope, element, attrs) {

        var camera, scene, renderer,
          shadowMesh, icosahedron, light,
          mapMesh,
          mouseX = 0, mouseY = 0,
          contW = (scope.fillcontainer) ?
            element[0].clientWidth : scope.width,
          contH = scope.height,
          windowHalfX = contW / 2,
          windowHalfY = contH / 2,
          materials = {},
          controls;

        scope.init = function () {

          // Camera
          camera = new THREE.PerspectiveCamera( 20, contW / contH, 1, 10000 );
          camera.position.z = 500;
          camera.position.y = 500;



          // Scene
          scene = new THREE.Scene();

          // Ligthing
          light = new THREE.DirectionalLight( 0xffffff );
          light.position.set( 0, 0, 1 );
          scene.add( light );


          materials.lambert = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading,
            vertexColors: THREE.VertexColors
          });

          materials.phong = new THREE.MeshPhongMaterial({
            ambient: 0x030303,
            color: 0xdddddd,
            specular: 0x009900,
            shininess: 30,
            shading: THREE.FlatShading,
            vertexColors: THREE.VertexColors
          });

          materials.wireframe = new THREE.MeshBasicMaterial({
            color: 0x000000,
            shading: THREE.FlatShading,
            wireframe: true,
            transparent: true });

          //add AXIS Helper
          var axis = new THREE.AxisHelper(1000);
          scene.add(axis);


          // Build and add the icosahedron to the scene

//          mapMesh = new THREE.Mesh( geometry, materials.wireframe); //materials[scope.materialType] );
          mapMesh = new THREE.Mesh(); //materials[scope.materialType] );
          mapMesh.position.x = 150;
//          mapMesh.rotation.x = 0;
          scene.add( mapMesh );




          renderer = new THREE.WebGLRenderer( { antialias: true } );
          renderer.setClearColor( 0xffffff );
          renderer.setSize( contW, contH );

          // element is provided by the angular directive
          element[0].appendChild( renderer.domElement );


          controls = new THREE.TrackballControls(camera, element[0]);

//          document.addEventListener( 'mousemove', scope.onDocumentMouseMove, false );

          window.addEventListener( 'resize', scope.onWindowResize, false );

        };

        // -----------------------------------
        // Event listeners
        // -----------------------------------
        scope.onWindowResize = function () {

          scope.resizeCanvas();

        };

        scope.onDocumentMouseMove = function ( event ) {

          mouseX = ( event.clientX - windowHalfX );
          mouseY = ( event.clientY - windowHalfY );

        };

        // -----------------------------------
        // Updates
        // -----------------------------------
        scope.resizeCanvas = function () {

          contW = (scope.fillcontainer) ?
            element[0].clientWidth : scope.width;
          contH = scope.height;

          windowHalfX = contW / 2;
          windowHalfY = contH / 2;

          camera.aspect = contW / contH;
          camera.updateProjectionMatrix();

          renderer.setSize( contW, contH );

        };

        scope.resizeObject = function () {

//          icosahedron.scale.set(scope.scale, scope.scale, scope.scale);
//          shadowMesh.scale.set(scope.scale, scope.scale, scope.scale);

        };

        scope.changeMaterial = function () {

//          icosahedron.material = materials[scope.materialType];

        };


        // -----------------------------------
        // Draw and Animate
        // -----------------------------------
        scope.animate = function () {

          requestAnimationFrame( scope.animate );

          controls.update();

          scope.render();

        };

        scope.render = function () {

//          camera.position.x += ( mouseX - camera.position.x ) * 0.05;
          // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

//          camera.lookAt( scene.position );

          renderer.render( scene, camera );

        };

        // -----------------------------------
        // Watches
        // -----------------------------------
        scope.$watch('fillcontainer + width + height', function () {
          scope.resizeCanvas();
        });

        scope.$watch('scale', function () {
          scope.resizeObject();
        });

        scope.$watch('materialType', function () {
          scope.changeMaterial();
        });

        scope.$watch('map.vertices', function () {

          scene.remove( mapMesh );
          var geometry = new THREE.Geometry();

          geometry.vertices = [];
          geometry.faces = [];

          scope.map.vertices.forEach(function(v){
            geometry.vertices.push(new THREE.Vector3(v[0], v[2], -v[1]));
          });
          scope.map.faces.forEach(function(f){
            var face = new THREE.Face3(f[3], f[4], f[5]);
            face.normal = new THREE.Vector3(0,0,1);
            geometry.faces.push(face);
          });
//          geometry.computeFaceNormals();
//          geometry.computeVertexNormals();

          mapMesh = new THREE.Mesh( geometry, materials.wireframe);

          scene.add( mapMesh );


          console.log(mapMesh);

        });



        // Begin
        scope.init();
        scope.animate();

      }
    };
  });
