if ( WEBVR.isAvailable() === false ) {

	document.body.appendChild( WEBVR.getMessage() );

}

var floor;
var grass;
var camera, scene, renderer;
var geometry, material, mesh;
var controls;
var cubes = [];
var fireworks = [];
var raycaster;
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
var fireworkChildren = [];

// http://www.html5rocks.com/en/tutorials/pointerlock/intro/
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if ( havePointerLock ) {
	var element = document.body;
	var pointerlockchange = function ( event ) {
		if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
			controls.enabled = true;
			blocker.style.display = 'none';
		} else {
			controls.enabled = false;
			blocker.style.display = '-webkit-box';
			blocker.style.display = '-moz-box';
			blocker.style.display = 'box';
			instructions.style.display = '';
		}
	};
	var pointerlockerror = function ( event ) {
		instructions.style.display = '';
	};

	// Hook pointer lock state change events
	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'pointerlockerror', pointerlockerror, false );
	document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
	document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

	instructions.style.display = 'none';
	
	// Ask the browser to lock the pointer
	element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
	element.requestPointerLock();

	instructions.addEventListener( 'click', function ( event ) {
		instructions.style.display = 'none';
		// Ask the browser to lock the pointer
		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
		element.requestPointerLock();
	}, false );
} else {
	instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}

init();
animate();

function init() {

	// === Setup renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xffffff );
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
	
	for ( var i = 0; i < 5; i ++ ) {
			
		var geometry = new THREE.SphereGeometry( 5, 32, 32 );
		var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
		var sphere = new THREE.Mesh( geometry, material );
		
		
		
		sphere.position.x = Math.floor( Math.random() * 20 - 100 ) * 20;
		sphere.position.z = Math.floor( Math.random() * 20 - 100 ) * 20;


		
		scene.add( sphere );
		fireworks.push( sphere );
	}

	light.position.set( 0.5, 1, 0.75 );


//emissive material for phong

}

function animate() {
	requestAnimationFrame( animate );

	fireworks.forEach(function (v){
		v.position.y += 0.5;
		if (v.position === 50){
			var exploded = fireworks.splice(fireworks.indexOf(v), 1);

			var geometry = new THREE.SphereGeometry( 5, 32, 32 );
			var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
			var sphere = new THREE.Mesh( geometry, material );

			fireworkChildren
		}
	});

	if (fireworkChildren.length > 0){
		fireworkChildren.forEach(function (v){
			v.position.y -= 0.5;
			v.position.x -= 0.1;
			v.position.z += 0.1;
		})
	}


	// fireworks.forEach(function (v){
	// 	v.position.y += 10;
	// })


	// TODO: Ray caster

	renderer.render( scene, camera );
}