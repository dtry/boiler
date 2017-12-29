import * as THREE from 'three';

export class Lathe {
  private object3d: any;
  private segments = 12;
  private length = 500;
  private minRadius = 10;
  private widthStep = 4;

  /**
   *
   * @returns {THREE.Mesh} object for a scene.
   */
  draw() {
    const material = new THREE.MeshBasicMaterial({color: 0xff4500, wireframe: true}),
      points = [];

    for (let i = 0; i < this.length; i++) {
      points.push(new THREE.Vector2(this.minRadius, i * this.widthStep));
    }

    this.object3d = new THREE.Mesh(new THREE.LatheGeometry(points, this.segments), material);
    this.object3d.position.set(0, 0, 150);
    this.object3d.rotateX(-Math.PI / 2);

    return this.object3d;
  }

  /**
   * Modify object 3d.
   *
   * @param {Uint8Array} bands is input data of audio
   */
  redraw(bands: Uint8Array) {
    const me = this,
      geometry = this.object3d.geometry;

    let lengthIndex = 0;
    let segmentIndex = 0;

    geometry.vertices.forEach(function (item) {
      if (lengthIndex === me.length - 1) {
        lengthIndex = 0;
        segmentIndex++;
      }

      const phi = segmentIndex * (1 / me.segments) * Math.PI * 2;
      const sin = Math.sin(phi);
      const cos = Math.cos(phi);

      item.x = (me.minRadius + bands[lengthIndex] / 2) * sin;
      item.z = (me.minRadius + bands[lengthIndex] / 2) * cos;

      lengthIndex++;
    });

    // for (let i = 0; i < this.segments; i++) {
    //   const phi = i * (1 / this.segments);
    //
    //   const sin = Math.sin(phi);
    //   const cos = Math.cos(phi);
    //
    //   for (let j = 0; j < this.length; j++) {
    //     geometry.vertices[j].x = (this.minRadius + bands[j]) * sin;
    //     geometry.vertices[j].z = (this.minRadius + bands[j]) * cos;
    //   }
    // }
    geometry.verticesNeedUpdate = true;
  }
}
