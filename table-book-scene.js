
// Import necessary Three.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
camera.position.y = 1;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create room
const roomGeometry = new THREE.BoxGeometry(10, 5, 10);
const wallTexture = new THREE.TextureLoader().load('texture/wall-texture.jpg');
const floorTexture = new THREE.TextureLoader().load('texture/floor-texture.avif');

const roomMaterials = [
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // Right face - red color
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // Left face - green color
    new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }), // Top face - blue color
    new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.BackSide }), // Bottom face - yellow color
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // Front face - magenta color
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide })  // Back face - cyan color
];
const room = new THREE.Mesh(roomGeometry, roomMaterials);
room.position.set(0, 1, 0);
scene.add(room);


// Create table top
const tableTopGeometry = new THREE.BoxGeometry(4, 0.2, 2);
const tableTopTexture = new THREE.TextureLoader().load('texture/table-texture.jpg');
const tableTopMaterial = new THREE.MeshBasicMaterial({ map: tableTopTexture });
const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);


// Create table legs
const legGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
const legMaterial = new THREE.MeshBasicMaterial({ map: tableTopTexture });
const leg1 = new THREE.Mesh(legGeometry, legMaterial);
leg1.position.set(-1.8, -1, -0.8);


const leg2 = leg1.clone();
leg2.position.set(1.8, -1, -0.8);
scene.add(leg2);

const leg3 = leg1.clone();
leg3.position.set(-1.8, -1, 0.8);
scene.add(leg3);

const leg4 = leg1.clone();
leg4.position.set(1.8, -1, 0.8);
scene.add(leg4);

const group = new THREE.Group();
group.add( tableTop, leg1, leg2, leg3, leg4 );

//adding the book model
const loader = new GLTFLoader();

var book = null;
loader.load( 'model/scene.gltf', function ( gltf ) {
    book = gltf.scene;
    var scale = 0.02;
    book.scale.set(scale, scale, scale);
    book.position.set(0.9, 0.1, 0);
	scene.add( book );

}, undefined, function ( error ) {

	console.error( error );

} );



// Create a light source
const light = new THREE.PointLight(0xffffff, 60, 40);
light.position.set(0, 2, 2);
scene.add(light);

scene.add( group );




// Animation loop
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();
