// Import necessary Three.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 2;


// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

var book = null;
loader.load( 'model/scene.gltf', function ( gltf ) {
    book = gltf.scene;
    book.scale.set(0.1, 0.1, 0.1);
	scene.add( book );

}, undefined, function ( error ) {

	console.error( error );

} );


// Create a light source
const light = new THREE.PointLight(0xffffff, 60, 40);
light.position.set(0, 3, 2);
scene.add(light);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
