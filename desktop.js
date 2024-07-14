import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Initialize the scene
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 50, 150);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// OrbitControls for camera interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x606060, 3); // Increased intensity
scene.add(ambientLight);

// Directional light for better illumination
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(100, 100, 100);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Spotlights for dynamic lighting
const spotlight1 = new THREE.SpotLight(0xffffff, 2);
spotlight1.position.set(100, 100, 100);
spotlight1.castShadow = true;
spotlight1.angle = Math.PI / 4;
spotlight1.penumbra = 0.5;
scene.add(spotlight1);

// Add a target for the spotlight to focus on
const spotlightTarget = new THREE.Object3D();
spotlightTarget.position.set(0, 20, 0);
scene.add(spotlightTarget);
spotlight1.target = spotlightTarget;

// Texture loader
const textureLoader = new THREE.TextureLoader();

// Load textures
const monitorTexture1 = textureLoader.load('./images/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai.jpg');
const monitorTexture2 = textureLoader.load('./images/misurina-sunset.jpg');
const cpuTexture = textureLoader.load('./images/Chip005_1K-JPG_Color.jpg');
const floorTexture = textureLoader.load('./images/table-texture.jpg');

// Monitor parts materials and geometry
const monitorBodyMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const monitorScreenMaterial = new THREE.MeshStandardMaterial({ map: monitorTexture1 });
const monitorStandMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

const monitorBodyGeometry = new THREE.BoxGeometry(40, 25, 5);
const monitorScreenGeometry = new THREE.PlaneGeometry(38, 23);
const monitorStandGeometry = new THREE.CylinderGeometry(1, 2, 10, 32);

// Create monitor
const monitorBody = new THREE.Mesh(monitorBodyGeometry, monitorBodyMaterial);
monitorBody.position.set(0, 20, 0);
monitorBody.castShadow = true;
monitorBody.receiveShadow = true;
scene.add(monitorBody);

const monitorScreen = new THREE.Mesh(monitorScreenGeometry, monitorScreenMaterial);
monitorScreen.position.set(0, 20, 2.55);
monitorScreen.castShadow = true;
monitorScreen.receiveShadow = true;
scene.add(monitorScreen);

const monitorStand = new THREE.Mesh(monitorStandGeometry, monitorStandMaterial);
monitorStand.position.set(0, 10, 0);
monitorStand.castShadow = true;
monitorStand.receiveShadow = true;
scene.add(monitorStand);

// CPU material and geometry
const cpuMaterial = new THREE.MeshStandardMaterial({ map: cpuTexture });
const cpuGeometry = new THREE.BoxGeometry(15, 30, 30);

// Create CPU
const cpu = new THREE.Mesh(cpuGeometry, cpuMaterial);
cpu.position.set(50, 15, 0);
cpu.castShadow = true;
cpu.receiveShadow = true;
scene.add(cpu);

// Floor material and geometry
const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
const floorGeometry = new THREE.PlaneGeometry(400, 400);

// Create floor
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
floor.receiveShadow = true;
scene.add(floor);

// Mouse geometry and material
const mouseBodyMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const mouseGeometry = new THREE.BoxGeometry(5, 2, 10);

// Create mouse
const mouse = new THREE.Mesh(mouseGeometry, mouseBodyMaterial);
mouse.position.set(23, 1, 20);
mouse.castShadow = true;
mouse.receiveShadow = true;
scene.add(mouse);

// Keyboard geometry and material
const keyboardBodyMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const keyboardGeometry = new THREE.BoxGeometry(30, 2, 10);

// Create keyboard
const keyboard = new THREE.Mesh(keyboardGeometry, keyboardBodyMaterial);
keyboard.position.set(0, 1, 20);
keyboard.castShadow = true;
keyboard.receiveShadow = true;
scene.add(keyboard);

// Rotate the spotlight around the scene
let spotlightAngle = 0;
function rotateSpotlight() {
  spotlightAngle += 0.01;
  spotlight1.position.set(
    100 * Math.cos(spotlightAngle),
    100,
    100 * Math.sin(spotlightAngle)
  );
  spotlight1.lookAt(spotlightTarget.position);
}

// Handle keyboard interaction for camera movement
document.addEventListener('keydown', (event) => {
  const moveDistance = 10;
  switch (event.key) {
    case 'ArrowUp':
      camera.position.z -= moveDistance;
      break;
    case 'ArrowDown':
      camera.position.z += moveDistance;
      break;
    case 'ArrowLeft':
      camera.position.x -= moveDistance;
      break;
    case 'ArrowRight':
      camera.position.x += moveDistance;
      break;
  }
});

// Handle mouse interaction to change the monitor screen texture
let isTexture1 = true;
document.addEventListener('mousedown', () => {
  monitorScreenMaterial.map = isTexture1 ? monitorTexture2 : monitorTexture1;
  monitorScreenMaterial.needsUpdate = true;
  isTexture1 = !isTexture1;
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  rotateSpotlight();
  controls.update();
  renderer.render(scene, camera);
}

animate();
