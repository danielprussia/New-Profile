// particle-background.component.ts
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-particle-background',
  standalone: true,
  template: '<div id="tsparticles" class="fixed inset-0 -z-10"></div>',
  styles: [`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
  `]
})
export class ParticleBackgroundComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    // Only load particles on the client side
    if (isPlatformBrowser(this.platformId)) {
      await this.initializeParticles();
    }
  }

  private async initializeParticles() {
    try {
      // Dynamic imports for better performance
      const { tsParticles } = await import('@tsparticles/engine');
      const { loadSlim } = await import('@tsparticles/slim');
      
      await loadSlim(tsParticles);
      
      await tsParticles.load({
        id: "tsparticles",
        options: {
          background: { color: "#0f172a" },
          particles: {
            number: { value: 80 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" }
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse"
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error loading particles:', error);
    }
  }
}