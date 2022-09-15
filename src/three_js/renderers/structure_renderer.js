/**
 * Structure Renderer
 *
 * ThreeJS code originally based on
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_pdb.html
 */

import * as THREE from 'three';
import { TrackballControls } from '../controls/TrackballControls.js';
import { CSS2DRenderer, CSS2DObject } from './css_2d_renderer.js';
import { InteractionManager } from 'three.interactive';
import PubSub from 'pubsub-js';

class StructureRenderer {
  pdbData;
  targetElement;

  camera;
  scene;
  renderer;
  interactionManager;

  labelRenderer;
  controls;
  root = new THREE.Group();
  offset = new THREE.Vector3();
  isAutoRotating = false;
  ticker = 0;

  selectedAtom = null;

  constructor(pdbData, targetElement, isAutoRotating) {
    this.pdbData = pdbData;
    this.targetElement = targetElement;
    this.isAutoRotating = isAutoRotating;

    this.init();
    this.parseData();
    this.animate();
  }

  /**
   * Destroys this instance (required by React when re-rendering the page)
   */
  destroy() {
    if (this.targetElement) {
      this.scene = null;
      this.projector = null;
      this.camera = null;
      this.controls = null;
      this.targetElement.innerHTML = '';
    }
  }

  /**
   * Initialises the scene, cameras, labels, and event handling.
   */
  init() {
    this.scene = new THREE.Scene();

    this.setUpCamera();
    this.setUpLights();

    this.setUpRenderContext();

    this.interactionManager = new InteractionManager(
      this.renderer,
      this.camera,
      this.targetElement
    );

    this.setUpCssRendering();
    this.bindEvents();

    this.scene.add(this.root);
  }

  bindEvents() {
    this.setUpInteractionHandler();
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  /**
   * Parses the raw PDB data and translates into visual geometry.
   * TODO: Add support for protein chains.
   */
  parseData() {
    while (this.root.children.length > 0) {
      const object = this.root.children[0];
      object.parent.remove(object);
    }

    const geometryAtoms = this.pdbData.geometryAtoms;
    const geometryBonds = this.pdbData.geometryBonds;
    const json = this.pdbData.json;

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 3);

    geometryAtoms.computeBoundingBox();
    geometryAtoms.boundingBox.getCenter(this.offset).negate();

    geometryAtoms.translate(this.offset.x, this.offset.y, this.offset.z);
    geometryBonds.translate(this.offset.x, this.offset.y, this.offset.z);

    let positions = geometryAtoms.getAttribute('position');
    const colors = geometryAtoms.getAttribute('color');

    const position = new THREE.Vector3();
    const color = new THREE.Color();

    for (let index = 0; index < positions.count; index++) {
      const atom = json.atoms[index];
      position.x = positions.getX(index);
      position.y = positions.getY(index);
      position.z = positions.getZ(index);

      color.r = colors.getX(index);
      color.g = colors.getY(index);
      color.b = colors.getZ(index);
      const hexColor = `#${color.getHexString()}`;

      const material = new THREE.MeshPhongMaterial({ color: color });
      const object = new THREE.Mesh(sphereGeometry, material);
      object.position.copy(position);
      object.position.multiplyScalar(75);
      object.scale.multiplyScalar(25);

      object.addEventListener('mouseover', _ => {
        object.material.color.set(0x000000);
      });
      object.addEventListener('mouseout', _ => {
        object.material.color.set(hexColor);
      });
      object.addEventListener('click', _ => {

        if (this.selectedAtom !== null) {
          document.getElementById(`atom_${this.selectedAtom.serialNumber}`).classList.remove('selected-atom');
        }
        this.selectedAtom = atom;
        document.getElementById(`atom_${this.selectedAtom.serialNumber}`).classList.add('selected-atom');

        PubSub.publish('ATOM_SELECT', atom);
      });
      this.interactionManager.add(object);

      this.root.add(object);

      const text = document.createElement('div');
      text.id = `atom_${atom.serialNumber}`;
      text.className = 'label';
      text.style.color = `rgb(${atom.getCPKColor()})`;
      text.textContent = atom.getCapitalizedName();

      const label = new CSS2DObject(text);
      label.position.copy(object.position);
      this.root.add(label);
    }

    positions = geometryBonds.getAttribute('position');

    const start = new THREE.Vector3();
    const end = new THREE.Vector3();

    for (let index = 0; index < positions.count; index += 2) {
      start.x = positions.getX(index);
      start.y = positions.getY(index);
      start.z = positions.getZ(index);

      end.x = positions.getX(index + 1);
      end.y = positions.getY(index + 1);
      end.z = positions.getZ(index + 1);

      start.multiplyScalar(75);
      end.multiplyScalar(75);

      const object = new THREE.Mesh(
        boxGeometry,
        new THREE.MeshPhongMaterial(0xffffff)
      );
      object.position.copy(start);
      object.position.lerp(end, 0.5);
      object.scale.set(5, 5, start.distanceTo(end));
      object.lookAt(end);
      object.addEventListener('mouseover', (event) => {
        object.material.color.set(0x000000);
      });
      object.addEventListener('mouseout', (event) => {
        object.material.color.set(0xffffff);
      });
      this.interactionManager.add(object);

      this.root.add(object);
    }

    this.render();
  }

  /**
   * Ensures position, canvas, and camera pan is correct on resize.
   */
  onWindowResize() {
    this.camera.aspect =
      this.targetElement.offsetWidth / this.targetElement.offsetHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      this.targetElement.offsetWidth,
      this.targetElement.offsetHeight
    );
    this.labelRenderer.setSize(
      this.targetElement.offsetWidth,
      this.targetElement.offsetHeight
    );

    this.render();
  }

  /**
   * Runs the animation (with optional rotating.)
   */
  animate() {
    if (!this.scene) {
      return;
    }
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();

    if (this.isAutoRotating) {
      const time = this.ticker++ * 0.01;
      this.root.rotation.x = time * 0.6;
      this.root.rotation.y = time * 0.3;
    }

    this.interactionManager.update();
    this.render();
  }

  /**
   * Renders the scene and CSS labels.
   */
  render() {
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  /**
   * Sets up the scene camera.
   */
  setUpCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.targetElement.offsetWidth / this.targetElement.offsetHeight,
      1,
      5000
    );
    this.camera.position.z = 1000;
    this.scene.add(this.camera);
  }

  /**
   * Initialises the CSS label rendering.
   */
  setUpCssRendering() {
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(
      this.targetElement.offsetWidth,
      this.targetElement.offsetHeight
    );
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    this.targetElement.appendChild(this.labelRenderer.domElement);
  }

  /**
   * Set the mouse/track/touch response.
   */
  setUpInteractionHandler() {
    this.controls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.minDistance = 500;
    this.controls.maxDistance = 2000;
  }

  /**
   * Sets up the scene lighting.
   */
  setUpLights() {
    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(1, 1, 1);
    this.scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(-1, -1, 1);
    this.scene.add(light2);
  }

  /**
   * Starts the autorotation
   */
  startAutoRotation() {
    this.isAutoRotating = true;
  }

  /**
   * Stops the autorotation
   */
  stopAutoRotation() {
    this.isAutoRotating = false;
  }

  /**
   * Sets up the render context.
   */
  setUpRenderContext() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.targetElement.offsetWidth,
      this.targetElement.offsetHeight
    );
    this.targetElement.appendChild(this.renderer.domElement);
  }
}

export default StructureRenderer;
