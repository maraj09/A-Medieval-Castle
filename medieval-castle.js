import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
renderer.shadowMap.enabled = true; // Enable shadow mapping
document.body.appendChild(renderer.domElement);

// OrbitControls for camera interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Soft white light
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true; // Enable shadows for the light
scene.add(directionalLight);

// Texture loader
const textureLoader = new THREE.TextureLoader();

// Load textures
const wallTexture = textureLoader.load("textures/Bricks089_1K-JPG_Color.jpg");
const wallBumpMap = textureLoader.load(
  "textures/Bricks089_1K-JPG_Displacement.jpg"
);
const wallNormalMap = textureLoader.load(
  "textures/Bricks089_1K-JPG_NormalDX.jpg"
);
const drawbridgeTexture = textureLoader.load(
  "textures/Planks037A_1K-JPG_Color.jpg"
);
const roofTexture = textureLoader.load(
  "textures/RoofingTiles012B_1K-JPG_Color.jpg"
);
const doorTexture = textureLoader.load("textures/door.png");
const groundTexture = textureLoader.load("textures/Grass001_1K-JPG_Color.jpg");
const roadTexture = textureLoader.load("textures/PavingStones069_1K-JPG_Color.jpg");
const waterTexture = textureLoader.load("textures/Ice001_1K-JPG_Color.jpg");

// Castle wall material
const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallTexture,
  bumpMap: wallBumpMap,
  bumpScale: 0.2,
  normalMap: wallNormalMap,
});

// Castle wall geometry
const wallGeometry = new THREE.BoxGeometry(80, 20, 2);

// Create castle walls
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(0, 10, -40);
wall1.castShadow = true;
wall1.receiveShadow = true;
scene.add(wall1);

const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.position.set(0, 10, 40);
wall2.castShadow = true;
wall2.receiveShadow = true;
scene.add(wall2);

const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
wall3.rotation.y = Math.PI / 2;
wall3.position.set(-40, 10, 0);
wall3.castShadow = true;
wall3.receiveShadow = true;
scene.add(wall3);

const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
wall4.rotation.y = Math.PI / 2;
wall4.position.set(40, 10, 0);
wall4.castShadow = true;
wall4.receiveShadow = true;
scene.add(wall4);

// Drawbridge material
const drawbridgeMaterial = new THREE.MeshStandardMaterial({
  map: drawbridgeTexture,
});

// Drawbridge geometry
const drawbridgeGeometry = new THREE.BoxGeometry(20, 1, 40);

// Create drawbridge
const drawbridge = new THREE.Mesh(drawbridgeGeometry, drawbridgeMaterial);
drawbridge.position.set(0, 0.5, -90);
drawbridge.castShadow = true;
drawbridge.receiveShadow = true;
scene.add(drawbridge);

drawbridge.rotation.x = -Math.PI / 6; // Initial position of the drawbridge

// Tower geometry
const towerGeometry = new THREE.CylinderGeometry(5, 5, 30, 32);
const towerMaterial = new THREE.MeshStandardMaterial({
  map: wallTexture,
  bumpMap: wallBumpMap,
  bumpScale: 0.2,
  normalMap: wallNormalMap,
});

// Create towers
const tower1 = new THREE.Mesh(towerGeometry, towerMaterial);
tower1.position.set(-45, 15, -45);
tower1.castShadow = true;
tower1.receiveShadow = true;
scene.add(tower1);

const tower2 = new THREE.Mesh(towerGeometry, towerMaterial);
tower2.position.set(45, 15, -45);
tower2.castShadow = true;
tower2.receiveShadow = true;
scene.add(tower2);

const tower3 = new THREE.Mesh(towerGeometry, towerMaterial);
tower3.position.set(-45, 15, 45);
tower3.castShadow = true;
tower3.receiveShadow = true;
scene.add(tower3);

const tower4 = new THREE.Mesh(towerGeometry, towerMaterial);
tower4.position.set(45, 15, 45);
tower4.castShadow = true;
tower4.receiveShadow = true;
scene.add(tower4);

// Roof material
const roofMaterial = new THREE.MeshStandardMaterial({ map: roofTexture });

// Roof geometry
const roofGeometry = new THREE.ConeGeometry(10, 8, 4);

// Create roofs for towers
const roof1 = new THREE.Mesh(roofGeometry, roofMaterial);
roof1.position.set(-45, 30, -45);
roof1.rotation.y = Math.PI / 4;
roof1.castShadow = true;
roof1.receiveShadow = true;
scene.add(roof1);

const roof2 = new THREE.Mesh(roofGeometry, roofMaterial);
roof2.position.set(45, 30, -45);
roof2.rotation.y = Math.PI / 4;
roof2.castShadow = true;
roof2.receiveShadow = true;
scene.add(roof2);

const roof3 = new THREE.Mesh(roofGeometry, roofMaterial);
roof3.position.set(-45, 30, 45);
roof3.rotation.y = Math.PI / 4;
roof3.castShadow = true;
roof3.receiveShadow = true;
scene.add(roof3);

const roof4 = new THREE.Mesh(roofGeometry, roofMaterial);
roof4.position.set(45, 30, 45);
roof4.rotation.y = Math.PI / 4;
roof4.castShadow = true;
roof4.receiveShadow = true;
scene.add(roof4);

// Door material
const doorMaterial = new THREE.MeshStandardMaterial({ map: doorTexture });

// Door geometry
const doorGeometry = new THREE.BoxGeometry(10, 15, 2); // Made door larger

// Create door
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, 7.5, -40.5); // Adjusted position for larger door
door.castShadow = true;
door.receiveShadow = true;
scene.add(door);

// House inside the castle
const houseGeometry = new THREE.BoxGeometry(30, 20, 30);
const houseMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
const house = new THREE.Mesh(houseGeometry, houseMaterial);
house.position.set(0, 10, 0);
house.castShadow = true;
house.receiveShadow = true;
scene.add(house);

// House roof
const houseRoofGeometry = new THREE.ConeGeometry(30, 15, 4); // Made roof larger
const houseRoof = new THREE.Mesh(houseRoofGeometry, roofMaterial);
houseRoof.position.set(0, 25, 0);
houseRoof.rotation.y = Math.PI / 4;
houseRoof.castShadow = true;
houseRoof.receiveShadow = true;
scene.add(houseRoof);

// Water material
const waterMaterial = new THREE.MeshStandardMaterial({
  map: waterTexture,
  transparent: true,
  opacity: 0.8,
});

// Water geometry
const outerWaterGeometry = new THREE.RingGeometry(80, 100, 64); // Outer ring
const innerWaterGeometry = new THREE.CircleGeometry(100, 64); // Inner circle

// Create water moat
const outerWater = new THREE.Mesh(outerWaterGeometry, waterMaterial);
outerWater.rotation.x = -Math.PI / 2;
outerWater.position.y = .5;
outerWater.receiveShadow = true;
scene.add(outerWater);

// Ground material (used for ground)
const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });

// Ground geometry and material
const groundGeometry = new THREE.PlaneGeometry(400, 400); // Made ground larger

// Create ground
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
ground.receiveShadow = true;
scene.add(ground);

// Road material
const roadMaterial = new THREE.MeshStandardMaterial({ map: roadTexture });

// Road geometry
const roadGeometry = new THREE.PlaneGeometry(10, 80);

// Create road leading to the drawbridge
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2;
road.position.set(0, 0.01, -80);
road.receiveShadow = true;
scene.add(road);

// Keyboard interaction for camera movement
document.addEventListener("keydown", (event) => {
  const moveDistance = 10;
  switch (event.key) {
    case "ArrowUp":
      camera.position.z -= moveDistance;
      break;
    case "ArrowDown":
      camera.position.z += moveDistance;
      break;
    case "ArrowLeft":
      camera.position.x -= moveDistance;
      break;
    case "ArrowRight":
      camera.position.x += moveDistance;
      break;
  }
});

// Drawbridge interaction
let drawbridgeMovingUp = false;
document.addEventListener("mousedown", () => {
  drawbridgeMovingUp = true;
});

document.addEventListener("mouseup", () => {
  drawbridgeMovingUp = false;
});

function animateDrawbridge() {
  if (drawbridgeMovingUp && drawbridge.rotation.x < 0) {
    drawbridge.rotation.x += 0.02;
  } else if (!drawbridgeMovingUp && drawbridge.rotation.x > -Math.PI / 6) {
    drawbridge.rotation.x -= 0.02;
  }
}

// Sky color change for different times of the day
let skyColor = new THREE.Color(0x87ceeb); // Initial sky color
scene.background = skyColor;

let timeOfDay = 0; // 0: morning, 1: afternoon, 2: evening, 3: night

function updateSkyColor() {
  switch (timeOfDay) {
    case 0:
      skyColor.set(0x87ceeb);
      break; // Morning sky
    case 1:
      skyColor.set(0xadd8e6);
      break; // Afternoon sky
    case 2:
      skyColor.set(0xff8c00);
      break; // Evening sky
    case 3:
      skyColor.set(0x191970);
      break; // Night sky
  }
  scene.background = skyColor;
  timeOfDay = (timeOfDay + 1) % 4; // Cycle through times of the day
}

setInterval(updateSkyColor, 5000); // Change sky color every 5 seconds

// Render loop
function animate() {
  requestAnimationFrame(animate);
  animateDrawbridge();
  controls.update();
  renderer.render(scene, camera);
}

animate();
