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
          materials = {};


        scope.init = function () {

          // Camera
          camera = new THREE.PerspectiveCamera( 45, contW / contH, .1, 1000 );
          camera.position.x = 1;
          camera.position.y = 300;
          camera.position.z = 10;
          camera.lookAt(new THREE.Vector3(0,0,0))

          // Scene
          scene = new THREE.Scene();

          // Ligthing
          light = new THREE.DirectionalLight( 0xffffff );
          light.position.set( 0, 0, 1 );
//          scene.add( light );

          // Shadow
          var canvas = document.createElement( 'canvas' );
          canvas.width = 128;
          canvas.height = 128;

          // Render a 2d gradient to use as shadow
          var context = canvas.getContext( '2d' );
          var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );

          gradient.addColorStop( 0.1, 'rgba(200,200,200,1)' );
          gradient.addColorStop( 1, 'rgba(255,255,255,1)' );

          context.fillStyle = gradient;
          context.fillRect( 0, 0, canvas.width, canvas.height );

          var shadowTexture = new THREE.Texture( canvas );
          shadowTexture.needsUpdate = true;

          var shadowMaterial = new THREE.MeshBasicMaterial( {
            map: shadowTexture
          } );
          var shadowGeo = new THREE.PlaneGeometry( 300, 300, 1, 1 );

          // Apply the shadow texture to a plane
          shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
          shadowMesh.position.y = - 250;
          shadowMesh.rotation.x = - Math.PI / 2;
//          scene.add( shadowMesh );

          var faceIndices = [ 'a', 'b', 'c', 'd' ];

          var color, f, p, n, vertexIndex,
            radius = 200,
            geometry  = new THREE.Geometry();

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
            color: 'blue',
//            shading: THREE.FlatShading,
            wireframe: true
//            transparent: true
          });

          // Build and add the icosahedron to the scene
          mapMesh = new THREE.Mesh( geometry, materials.wireframe); //materials[scope.materialType] );
//          mapMesh.position.x = 0;
//          mapMesh.rotation.x = 0;
          scene.add( mapMesh );

          //add AXIS Helper
          var axis = new THREE.AxisHelper(1000);
          scene.add(axis);


          renderer = new THREE.WebGLRenderer( { antialias: true } );
          renderer.setClearColor( 0xeeeeee );
          renderer.setSize( contW, contH );
          renderer.shadowMapEnabled = true;

          // element is provided by the angular directive
          element[0].appendChild( renderer.domElement );

          document.addEventListener( 'mousemove', scope.onDocumentMouseMove, false );

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
          shadowMesh.scale.set(scope.scale, scope.scale, scope.scale);
//          mapMesh.scale.set(scope.scale, scope.scale, scope.scale);

        };

        scope.changeMaterial = function () {

//          icosahedron.material = materials[scope.materialType];

        };


        // -----------------------------------
        // Draw and Animate
        // -----------------------------------
        scope.animate = function () {

//          requestAnimationFrame( scope.animate );

//          scope.render();

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

          mapMesh.geometry.vertices = [];
          mapMesh.geometry.faces = [];

          scope.map.vertices.forEach(function(v){
            mapMesh.geometry.vertices.push(new THREE.Vector3(v[0], v[1], v[2]));
          });
          scope.map.faces.forEach(function(f){
            var face = new THREE.Face3(f[0], f[1], f[2]);
            face.normal = new THREE.Vector3(0,0,1);
            mapMesh.geometry.faces.push(face);
          });

          mapMesh.geometry.computeFaceNormals();
          mapMesh.geometry.computeVertexNormals();


          console.log(mapMesh);
scope.render();

        });



        // Begin
        scope.init();
        scope.animate();

      }
    };
  });
