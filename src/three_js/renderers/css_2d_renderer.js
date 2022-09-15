/**
 * CSS Overlay Renderer
 * This renders the CSS lettering over the atoms and keeps them in alignment with the
 * associated 3D model.
 *
 * CSS Code original based on
 * https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/CSS2DRenderer.js
 */

import { Matrix4, Object3D, Vector3 } from 'three';

class CSS2DObject extends Object3D {
  element;
  isCSS2DObject = true;

  constructor(element = document.createElement('div')) {
    super();
    this.element = element;
    this.element.style.position = 'absolute';
    this.element.style.userSelect = 'none';
    this.element.setAttribute('draggable', false);
    this.bindEvents();
  }

  bindEvents() {
    this.addEventListener('removed', () => {
      this.traverse(function (object) {
        if (
          object.element instanceof Element &&
          object.element.parentNode !== null
        ) {
          object.element.parentNode.removeChild(object.element);
        }
      });
    });
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    this.element = source.element.cloneNode(true);

    return this;
  }
}

class CSS2DRenderer {
  domElement;
  cache;
  #a = new Vector3();
  #b = new Vector3();
  #height;
  #heightHalf;
  #vector = new Vector3();
  #viewMatrix = new Matrix4();
  #viewProjectionMatrix = new Matrix4();
  #width;
  #widthHalf;

  constructor(parameters = {}) {
    this.cache = {
      objects: new WeakMap(),
    };

    const domElement =
      parameters.element !== undefined
        ? parameters.element
        : document.createElement('div');

    domElement.style.overflow = 'hidden';

    this.domElement = domElement;
  }

  setSize(width, height) {
    this.#width = width;
    this.#height = height;

    this.#widthHalf = this.#width / 2;
    this.#heightHalf = this.#height / 2;

    this.domElement.style.width = width + 'px';
    this.domElement.style.height = height + 'px';
  }

  filterAndFlatten(scene) {
    const result = [];

    scene.traverse(function (object) {
      if (object.isCSS2DObject) result.push(object);
    });

    return result;
  }

  getDistanceToSquared(object1, object2) {
    this.#a.setFromMatrixPosition(object1.matrixWorld);
    this.#b.setFromMatrixPosition(object2.matrixWorld);

    return this.#a.distanceToSquared(this.#b);
  }

  getSize() {
    return {
      width: this.#width,
      height: this.#height,
    };
  }

  render(scene, camera) {
    if (scene.autoUpdate === true) scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();

    this.#viewMatrix.copy(camera.matrixWorldInverse);
    this.#viewProjectionMatrix.multiplyMatrices(
      camera.projectionMatrix,
      this.#viewMatrix
    );

    this.renderObject(scene, scene, camera);
    this.zOrder(scene);
  }

  renderObject(object, scene, camera) {
    if (object.isCSS2DObject) {
      this.#vector.setFromMatrixPosition(object.matrixWorld);
      this.#vector.applyMatrix4(this.#viewProjectionMatrix);

      const visible =
        object.visible === true &&
        this.#vector.z >= -1 &&
        this.#vector.z <= 1 &&
        object.layers.test(camera.layers) === true;
      object.element.style.display = visible === true ? '' : 'none';

      if (visible === true) {
        object.onBeforeRender(this, scene, camera);

        const element = object.element;
        const xTranslation = this.#vector.x * this.#widthHalf + this.#widthHalf;
        const yTranslation =
          -this.#vector.y * this.#heightHalf + this.#heightHalf;

        element.style.transform = `
          translate(-50%,-50%) 
          translate(${xTranslation}px, ${yTranslation}px)
          `;

        if (element.parentNode !== this.domElement) {
          this.domElement.appendChild(element);
        }

        object.onAfterRender(this, scene, camera);
      }

      const objectData = {
        distanceToCameraSquared: this.getDistanceToSquared(camera, object),
      };

      this.cache.objects.set(object, objectData);
    }

    for (let i = 0, l = object.children.length; i < l; i++) {
      this.renderObject(object.children[i], scene, camera);
    }
  }

  zOrder(scene) {
    const sorted = this.filterAndFlatten(scene).sort((a, b) => {
      if (a.renderOrder !== b.renderOrder) {
        return b.renderOrder - a.renderOrder;
      }
      const distanceA = this.cache.objects.get(a).distanceToCameraSquared;
      const distanceB = this.cache.objects.get(b).distanceToCameraSquared;

      return distanceA - distanceB;
    });

    const zMax = sorted.length;

    for (let i = 0, l = sorted.length; i < l; i++) {
      sorted[i].element.style.zIndex = zMax - i;
    }
  }
}

export { CSS2DObject, CSS2DRenderer };
