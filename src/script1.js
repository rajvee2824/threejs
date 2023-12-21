//OrbitControls demo


import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5, 0.5, 0.5);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("app").appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
// pointLight.position.set(10, 0, 3);
scene.add(pointLight);

const geometry = new THREE.BoxGeometry(10, 10, 10);

//This will react with ambientLight
const material = new THREE.MeshStandardMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

//light object
const lightGeometry = new THREE.SphereGeometry(1, 32, 16);
const lightmaterial = new THREE.MeshBasicMaterial({ color: "white" });
const lightSphere = new THREE.Mesh(lightGeometry, lightmaterial);
// lightSphere.position.set(10, 0, 3);
scene.add(lightSphere);

const controls = new OrbitControls(camera, renderer.domElement);

let q = 0;
animate();

function animate() {
  controls.update();
  q += 0.01;

  let qSin = Math.sin(q);
  let qCos = Math.cos(q);

  cube.position.x = 5 * qSin;

  let scaledCos = 30 * qCos;
  let scaledSin = 30 * qSin;

  pointLight.position.set(scaledCos, 0, scaledSin);
  lightSphere.position.set(scaledCos, 0, scaledSin);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
