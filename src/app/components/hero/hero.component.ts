// hero.component.ts
import { Component } from '@angular/core';
import { ParticleBackgroundComponent } from '../../shared/particle-background/particle-background.component'; // Verify correct path

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParticleBackgroundComponent], // Add this
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {}