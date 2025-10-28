// main 3d script 
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
export const scene = new THREE.Scene();

// Sizes
export const size = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Camera
export const camera = new THREE.PerspectiveCamera(35, size.width / size.height);
camera.position.z = 5;
scene.add(camera);

// Renderer
export const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias:true });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

// Controls
export const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;

// HDR environment loader
const hdrLoader = new HDRLoader();
hdrLoader.load('./environmentMaps/Cyclorama Hard Light 2K.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = environmentMap;
});

// Handle resize
window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.sortObjects = true; 
});

// Animation loop (shared render tick)
const clock = new THREE.Clock();
function tick() {
  const deltaTime = clock.getDelta();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();
