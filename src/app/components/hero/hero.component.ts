// hero.component.ts
import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ParticleBackgroundComponent } from '../../shared/particle-background/particle-background.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParticleBackgroundComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  private readonly viewportScroller = inject(ViewportScroller);

  scrollToProjects(): void {
    try {
      this.viewportScroller.scrollToAnchor('projects');
    } catch (error) {
      console.error('Failed to scroll to projects:', error);
      // Fallback to native smooth scrolling
      const projectsElement = document.getElementById('projects');
      if (projectsElement) {
        projectsElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
}