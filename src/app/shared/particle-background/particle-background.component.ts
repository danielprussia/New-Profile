// particle-background.component.ts
import { Component, OnInit } from '@angular/core';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

@Component({
  selector: 'app-particle-background',
  standalone: true,
  templateUrl: './particle-background.component.html',
  styleUrls: ['./particle-background.component.css']
})
export class ParticleBackgroundComponent implements OnInit {
  async ngOnInit() {
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
          }
        }
      }
    });
  }
}