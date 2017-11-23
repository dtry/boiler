import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import * as THREE from 'three';

import {PlayerService} from "../services/player.service";

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VisualizationComponent implements OnInit {

  private container;
  private camera;
  private controls;
  private renderer;
  private scene;
  private light;
  private area;

  constructor(public element: ElementRef, public player: PlayerService) {
  }

  ngOnInit() {

    this.container = this.element.nativeElement.querySelector('div');

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
    this.camera.position.set(1000, 400, -700);
    this.camera.lookAt(new THREE.Vector3());

    //this.controls = new THREE.EditorControls(this.camera, this.container);

    // this.controls.addEventListener('change', function () {
    //   this.render();
    // });

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0x444444));

    this.light = new THREE.SpotLight(0xffffff, 1);
    this.light.castShadow = true;
    this.light.position.set(new THREE.Vector3(500, -500, 500));
    this.scene.add(this.light);

    this.area = this.renderStairs(10);

    this.scene.add(this.area);

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setClearColor(0x333333);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.render();

    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    this.player.getBounds().subscribe(bounds => this.update(bounds));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / (window.innerHeight);
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.render();
  }

  animate() {
    requestAnimationFrame(this.animate);
  }

  render() {
    this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    this.renderer.render(this.scene, this.camera);
  }

  renderStairs(size) {
    var geometry,
      length = 140,
      mesh,
      i, j,
      object3d = new THREE.Object3D();

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

        object3d.add(mesh);
      }
    }

    return object3d;
  }

  update(bands) {
    let i = 0;

    this.area.children.forEach(function (coube) {
      const delta = bands[i++] || 1;
      const s = 0.5 - delta * 0.2 * 0.01;

      coube.material.color.setHSL(s, 0.6, 0.4);
      coube.scale.set(8, delta, 8);

      coube.position.setY(delta === 1 ? 0 : delta / 2);
    });

    this.render();
  }

}
