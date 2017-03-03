class Ground {
	constructor (scene, floor) {

		// === LOOK: Setup floor
		var geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
		geometry.rotateX( - Math.PI / 2 );


		var n = new Myperlin();
		geometry.vertices.forEach(function (v){
			v.y = (n.perlin(v.x /100, v.y/100, v.z/100)) * 100 - 100;
		})

		var texture = new THREE.TextureLoader().load( "images/grass.jpg" );
	  	var material3 = new THREE.MeshBasicMaterial( { map: texture } );

		material = new THREE.MeshBasicMaterial( { color: 0x228B22 } );
		var material2 = new THREE.MeshPhongMaterial();
		floor = new THREE.Mesh( geometry, material3 );
		scene.add( floor );
	}

}