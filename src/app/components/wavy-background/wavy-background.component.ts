import { Component, AfterViewInit, OnDestroy, Input, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-wavy-background',
  standalone: true,
  template: '<div class="space-container"></div>',
  styles: [`
    .space-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
    }
  `]
})
export class WavyBackgroundComponent implements AfterViewInit, OnDestroy {
  @Input() starColor = 0xffffff;
  @Input() nebulaColor = 0x4d00fc;
  
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private starsMaterial!: THREE.PointsMaterial;
  private galaxy!: THREE.Points;
  private nebulaMaterial!: THREE.PointsMaterial;
  private stars!: THREE.Points;
  private nebula!: THREE.Points;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSpaceScene();
    }
  }

  private initSpaceScene() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000011); // Dark blue-black space
    this.scene.fog = new THREE.FogExp2(0x000022, 0.001); // Depth haze
    
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: false, // Solid background
      antialias: true 
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.space-container')?.appendChild(this.renderer.domElement);
    this.camera.position.z = 15; // Pull back for wider view

    this.createStars();
    this.createGalaxy();
    this.createNebula();
    this.createDistantPlanets();
    this.animate();

    window.addEventListener('resize', () => this.onWindowResize());
  }

  private createStars() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const sizes = [];

    for (let i = 0; i < 15000; i++) {
      vertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );

      // Color variations (white/yellow/blue stars)
      const rand = Math.random();
      colors.push(
        rand > 0.8 ? 1 : 0.9,    // R (some reddish)
        rand > 0.7 ? 0.9 : 1,     // G (some yellowish)
        1                         // B (all have blue/white)
      );
      
      sizes.push(0.05 + Math.random() * 0.3); // Varied sizes
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    this.starsMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    this.stars = new THREE.Points(geometry, this.starsMaterial);
    this.scene.add(this.stars);
  }

  private createDistantPlanets() {
    // Blue gas giant
    const planet1 = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshBasicMaterial({ 
        color: 0x4466aa, 
        transparent: true, 
        opacity: 0.2 
      })
    );
    planet1.position.set(-20, 10, -100);
    this.scene.add(planet1);

    // Red dwarf star
    const star = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshBasicMaterial({ 
        color: 0xff8888, 
        transparent: true, 
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      })
    );
    star.position.set(30, -5, -150);
    this.scene.add(star);
  }

  private createGalaxy() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let i = 0; i < 10000; i++) {
      const radius = Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      const spiralFactor = radius * 0.3;
      
      vertices.push(
        Math.cos(angle + spiralFactor) * radius,
        (Math.random() - 0.5) * 0.5, // Slight vertical spread
        Math.sin(angle + spiralFactor) * radius
      );

      // Blue core, purple arms
      const isCore = radius < 3;
      colors.push(
        isCore ? 0.4 : 0.6,   // R
        isCore ? 0.5 : 0.4,   // G
        isCore ? 1.0 : 0.8     // B (brighter core)
      );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.2,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    this.galaxy = new THREE.Points(geometry, material);
    this.scene.add(this.galaxy);
  }

  private createNebula() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let i = 0; i < 8000; i++) {
      vertices.push(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );

      // Purple/blue nebula colors
      colors.push(
        0.5 + Math.random() * 0.2,  // R (purple)
        0.1 + Math.random() * 0.1,  // G (dark)
        0.7 + Math.random() * 0.3   // B (blue)
      );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    this.nebulaMaterial = new THREE.PointsMaterial({
      size: 0.5,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    this.nebula = new THREE.Points(geometry, this.nebulaMaterial);
    this.scene.add(this.nebula);
  }

  private animate() {
    const animateLoop = () => {
      requestAnimationFrame(animateLoop);
      
      // Stars: Gentle twinkle
      this.starsMaterial.opacity = 0.8 + Math.sin(Date.now() * 0.002) * 0.2;
      
      // Galaxy: Slow spiral rotation
      this.galaxy.rotation.y += 0.0003;
      this.galaxy.rotation.x += 0.0001;
      
      // Nebula: Subtle pulse
      this.nebulaMaterial.opacity = 0.2 + Math.sin(Date.now() * 0.0005) * 0.1;
      
      this.renderer.render(this.scene, this.camera);
    };
    animateLoop();
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onWindowResize);
      if (this.renderer) {
        this.renderer.dispose();
      }
    }
  }
}