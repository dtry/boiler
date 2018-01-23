import {Component, ElementRef, OnInit, ViewEncapsulation, OnDestroy, Renderer2} from '@angular/core';
import * as THREE from 'three';
import * as EditorControls from 'three-editor-controls';

import {PlayerService} from '../services/player.service';
import {ActivatedRoute, Router} from '@angular/router';

import {IList} from '../models/list';
import {Cube} from './render/cube';

//import {Lathe} from './render/lathe';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class VisualizationComponent implements OnInit, OnDestroy {

  private container;
  private camera;
  private controls;
  private renderer;
  private scene;
  private light;
  private area;
  private size;

  private windowResizeHelper: Function;
  //private subscription;

  private animationList = <IList[]>[
    //{id: 'Lathe', name: 'Lathe', type: Lathe},
    {id: 'Cube', name: 'Cube', type: Cube}
  ];

  animationType: IList;
  private animationTypeIndex: number;
  private animationClass: any;

  constructor(private element: ElementRef,
              private player: PlayerService,
              private router: Router,
              private route: ActivatedRoute,
              private componentRenderer: Renderer2) {
  }

  ngOnInit() {

    this.initScene();

    // TODO move to routing;
    this.animationTypeIndex = 0;
    this.animationType = this.animationList[0];
    this.onChange();
  }

  ngOnDestroy() {
    this.windowResizeHelper();
    //this.subscription.unsubscribe();
    this.controls.removeEventListener('change', this.render.bind(this));
  }

  /**
   * Apply next animation type from animation list(this.animationList).
   */
  onNext() {
    if (this.animationTypeIndex + 1 === this.animationList.length) {
      return;
    }

    this.animationType = this.animationList[++this.animationTypeIndex];
    this.onChange();
  }

  /**
   * Apply preview animation type from animation list(this.animationList)).
   */
  onPreview() {
    if (this.animationTypeIndex - 1 < 0) {
      return;
    }

    this.animationType = this.animationList[--this.animationTypeIndex];
    this.onChange();
  }

  /**
   * Helper for change animation type.
   */
  onChange() {
    if (this.area) {
      this.scene.remove(this.area);
    }

    this.animationClass = new this.animationType.type();

    this.area = this.animationClass.draw();
    this.scene.add(this.area);
    this.render();
  }

  initScene() {
    EditorControls(THREE); // hack for three
    this.container = this.element.nativeElement.querySelector('div');
    const boundingClientRect = this.container.getBoundingClientRect();

    this.size = {
      width: boundingClientRect.width,
      height: boundingClientRect.height
    };

    this.camera = new THREE.PerspectiveCamera(45, this.size.width / this.size.height, 1, 1500);
    this.camera.position.set(900, 400, -400);
    this.camera.lookAt(new THREE.Vector3());

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0x444444));

    this.light = new THREE.SpotLight(0xffffff, 1);
    this.light.castShadow = true;
    this.light.position.set(new THREE.Vector3(500, -500, 500));
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setClearColor(0x333333);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.width, this.size.height);
    this.container.appendChild(this.renderer.domElement);

    // Events
    this.controls = new THREE.EditorControls(this.camera, this.container);
    this.controls.addEventListener('change', this.render.bind(this));
    this.windowResizeHelper = this.componentRenderer.listen('window', 'resize', this.onWindowResize.bind(this));

    const player = this.player.getContext();
    const bands = new Uint8Array(player.analyser.frequencyBinCount);

    player.node.onaudioprocess = () => {
      player.analyser.getByteFrequencyData(bands);
      if (!player.audio.paused) {
        this.animationClass.redraw(bands);
        this.render();
      }
    };
    //
    // this.subscription = this.player.getBounds().subscribe(bounds => {
    //   if (this.animationClass) {
    //     this.animationClass.redraw(bounds);
    //     this.render();
    //   }
    // });
  }

  onWindowResize() {
    const boundingClientRect = this.container.getBoundingClientRect();
    this.size = {
      width: boundingClientRect.width,
      height: boundingClientRect.height
    };

    this.camera.aspect = this.size.width / this.size.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.size.width, this.size.height);
    this.render();
  }

  animate() {
    requestAnimationFrame(this.animate);
  }

  render() {
    this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    this.renderer.render(this.scene, this.camera);
  }
}
