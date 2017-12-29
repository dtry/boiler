import * as THREE from 'three';

export class Cube {
  object3d: any;

  /**
   *
   * @returns {THREE.Object3D} object for a scene.
   */
  draw(): void {
    let geometry,
      mesh, i, j;

    const length = 140,
      size = 10;

    this.object3d = new THREE.Object3D();

    for (i = -length; i < length; i += size) {
      for (j = -length; j < length; j += size) {

        geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
          color: 0x444444,
          specular: 0x888888,
          shininess: 50,
          shading: THREE.SmoothShading,
          side: THREE.DoubleSide
        }));

        mesh.material.color.setHSL(0.498, 0.6, 0.4);
        mesh.scale.set(8, 1, 8);
        mesh.position.set(i, 0, j);

        this.object3d.add(mesh);
      }
    }

    return this.object3d;
  }

  /**
   * Modify object 3d.
   *
   * @param {Uint8Array} bands is input data of audio
   */
  redraw(bands: Uint8Array) {
    let i = 0;

    this.object3d.children.forEach(function (coube) {
      const delta = bands[i++] || 1;
      const s = 0.5 - delta * 0.2 * 0.01;

      coube.material.color.setHSL(s, 0.6, 0.4);
      coube.scale.set(8, delta, 8);
      coube.position.setY(delta === 1 ? 0 : delta / 2);
    });
  }
}
