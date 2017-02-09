if ( WEBVR.isAvailable() === false ) {

	document.body.appendChild( WEBVR.getMessage() );

}

var floor;
var grass;
var camera, scene, renderer;
var geometry, material, mesh;
var controls, effect;
var cubes = [];
var fireworks = [];
var raycaster;
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
var fireworkChildren = [];
var fireworkChildren1 = [];
var fireworkChildren2 = [];
var fireworkChildren3 = [];
var fireworkChildren4 = [];
var fireworkChildren5 = [];
var counter = 0;


// // http://www.html5rocks.com/en/tutorials/pointerlock/intro/
// var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
// if ( havePointerLock ) {
// 	var element = document.body;
// 	var pointerlockchange = function ( event ) {
// 		if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
// 			controls.enabled = true;
// 			blocker.style.display = 'none';
// 		} else {
// 			controls.enabled = false;
// 			blocker.style.display = '-webkit-box';
// 			blocker.style.display = '-moz-box';
// 			blocker.style.display = 'box';
// 			instructions.style.display = '';
// 		}
// 	};
// 	var pointerlockerror = function ( event ) {
// 		instructions.style.display = '';
// 	};

// 	// Hook pointer lock state change events
// 	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
// 	document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
// 	document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
// 	document.addEventListener( 'pointerlockerror', pointerlockerror, false );
// 	document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
// 	document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

// 	instructions.style.display = 'none';
	
// 	// Ask the browser to lock the pointer
// 	element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
// 	element.requestPointerLock();

// 	instructions.addEventListener( 'click', function ( event ) {
// 		instructions.style.display = 'none';
// 		// Ask the browser to lock the pointer
// 		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
// 		element.requestPointerLock();
// 	}, false );
// } else {
// 	instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
// }

init();
animate();

function init() {

	// === Setup renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0x7ec0ee );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	selecting = false;

	// === LOOK: Setup camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	scene = new THREE.Scene();

	// === LOOK: Setup light
	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	var light2 = new THREE.DirectionalLight(0xeeeeff, 0.8);
	light2.position.set(10,80,10);
	scene.add( light2 );
	//scene.add( light2 );
	
	// === LOOK: Get pointer lock controls
	controls = new THREE.PointerLockControls( camera );
	scene.add( controls.getObject() );

	// === TODO: Create ray caster
	
	// === LOOK: Setup floor
	geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
	geometry.rotateX( - Math.PI / 2 );

	//noise.seed(Math.random());
	// geometry.vertices.forEach(function (v) { 
	// 	v.y = noise.simplex2(v.x / 2, v.z / 2) * 30;
	// });

	var n = new Myperlin();
	geometry.vertices.forEach(function (v){
		v.y = (n.perlin(v.x /100, v.y/100, v.z/100)) * 100 - 100;
	});

	var texture = new THREE.TextureLoader().load( "js/images/grass.jpg" );
  	var material3 = new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture } );

	material = new THREE.MeshLambertMaterial( { color: 0x228B22 } );
	var material2 = new THREE.MeshPhongMaterial();
	floor = new THREE.Mesh( geometry, material3 );
	scene.add( floor );

	// === LOOK: Setup spheres
	geometry = new THREE.BoxGeometry( 20, 20, 20 );
	
	for ( var i = 0; i < 10; i ++ ) {
			
		var geometry = new THREE.SphereGeometry( 1, 32, 32 );
		var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
		var sphere = new THREE.Mesh( geometry, material );
		
		
		
		sphere.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
		sphere.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;


		
		scene.add( sphere );
		fireworks.push( sphere );
	}

	light.position.set( 0.5, 1, 0.75 );


	controls = new THREE.VRControls( camera );
	effect = new THREE.VREffect( renderer );

	if ( WEBVR.isAvailable() === true ) {

		document.body.appendChild( WEBVR.getButton( effect ) );

	}

	if (navigator.getVRDisplays) {
    navigator.getVRDisplays()
        .then(function(displays) {
            effect.setVRDisplay( displays[ 0 ] );
            controls.setVRDisplay( displays[ 0 ] );
        })
        .catch(function() {
            // no displays
        });
    document.body.appendChild(WEBVR.getButton(effect));
  }

	//

	// window.addEventListener( 'resize', function () {

	// 	camera.aspect = window.innerWidth / window.innerHeight;
	// 	camera.updateProjectionMatrix();

	// 	renderer.setSize( window.innerWidth, window.innerHeight );

	// }, false );



//emissive material for phong

}

function animate() {
	effect.requestAnimationFrame( animate );
	counter++;

		if (counter === 200) {
			for ( var i = 0; i < 5; i ++ ) {
					
				var geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
				var material = new THREE.MeshLambertMaterial( {color: 0xf5f5f5} );
				var sphere = new THREE.Mesh( geometry, material );
				
				
				
				sphere.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
				sphere.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;


				
				scene.add( sphere );
				fireworks.push( sphere );
			}
			counter = 0;
		}

	fireworks.forEach(function (v){
		v.position.y += 0.5;
		if (v.position.y >= 100){
			var exploded = fireworks.splice(fireworks.indexOf(v), 1);
			scene.remove(v);

			var geometry = new THREE.SphereGeometry( 0.5, 25, 25 );
			var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );

			//firework children
			
			var sphere = new THREE.Mesh( geometry, material );
			sphere.position.x = v.position.x;
			sphere.position.y = v.position.y + 5;
			sphere.position.z = v.position.z;
			scene.add(sphere);
			fireworkChildren.push(sphere);

			var sphere1 = new THREE.Mesh( geometry, material );
			sphere1.position.x = v.position.x - 5;
			sphere1.position.y = v.position.y + 3;
			sphere1.position.z = v.position.z;
			scene.add(sphere1);
			fireworkChildren1.push(sphere1);

			var sphere2 = new THREE.Mesh( geometry, material );
			sphere2.position.x = v.position.x - 5;
			sphere2.position.y = v.position.y + 3;
			sphere2.position.z = v.position.z;
			scene.add(sphere2);
			fireworkChildren2.push(sphere2);

			var sphere3 = new THREE.Mesh( geometry, material );
			sphere3.position.x = v.position.x;
			sphere3.position.y = v.position.y - 5;
			sphere3.position.z = v.position.z;
			scene.add(sphere3);
			fireworkChildren3.push(sphere3);

			var sphere4 = new THREE.Mesh( geometry, material );
			sphere4.position.x = v.position.x + 5;
			sphere4.position.y = v.position.y - 3;
			sphere4.position.z = v.position.z;
			scene.add(sphere4);
			fireworkChildren4.push(sphere4);

			var sphere5 = new THREE.Mesh( geometry, material );
			sphere5.position.x = v.position.x + 5;
			sphere5.position.y = v.position.y + 3;
			sphere5.position.z = v.position.z;
			scene.add(sphere5);
			fireworkChildren5.push(sphere5);
		}
	});

	//modifying children

	if (fireworkChildren.length > 0){
		fireworkChildren.forEach(function (v){
			if (v.position.y >= 50){
				v.position.y -= 0.5;
			}
			else {
				scene.remove(v);
				fireworkChildren.splice(fireworkChildren.indexOf(v), 1);
			}
		})
	}

	if (fireworkChildren1.length > 0){
		fireworkChildren1.forEach(function (v){
			if (v.position.y >= 50){
				v.position.y -= 0.5;
				v.position.x -= 0.5;
			}
			else {
				scene.remove(v);
				fireworkChildren1.splice(fireworkChildren1.indexOf(v), 1);
			}
		})
	}

	if (fireworkChildren2.length > 0){
		fireworkChildren2.forEach(function (v){
			if (v.position.y >= 50){
				v.position.y -= 0.5;
				v.position.x -= 0.5;
			}
			else {
				scene.remove(v);
				fireworkChildren2.splice(fireworkChildren2.indexOf(v), 1);
			}
		})
	}

	if (fireworkChildren3.length > 0){
		fireworkChildren3.forEach(function (v){
			if (v.position.y >= 50){
				v.position.y -= 0.5;
			}
			else {
				scene.remove(v);
				fireworkChildren3.splice(fireworkChildren3.indexOf(v), 1);
			}
		})
	}

	if (fireworkChildren4.length > 0){
		fireworkChildren4.forEach(function (v){
			if (v.position.y >= 50){
				v.position.y -= 0.5;
				v.position.x += 0.5;
			}
			else {
				scene.remove(v);
				fireworkChildren4.splice(fireworkChildren4.indexOf(v), 1);
			}
		})
	}

	if (fireworkChildren5.length > 0){
		fireworkChildren5.forEach(function (v){
			if (v.position.y >= 50){
				v.position.y -= 0.5;
				v.position.x -= 0.5;
			}
			else {
				scene.remove(v);
				fireworkChildren5.splice(fireworkChildren5.indexOf(v), 1);
			}
		})
	}



	// fireworks.forEach(function (v){
	// 	v.position.y += 10;
	// })


	// TODO: Ray caster

	controls.update();

	effect.render( scene, camera );
}