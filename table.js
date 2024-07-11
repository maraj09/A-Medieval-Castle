// Import necessary Three.js modules
import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 0.5;


// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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

// Create a light source
const light = new THREE.PointLight(0xffffff, 1);
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
