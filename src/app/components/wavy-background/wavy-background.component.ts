// wavy-background.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-wavy-background',
  standalone: true,
  template: `
    <div class="wavy-background"></div>
  `,
  styles: [`
    .wavy-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
    }

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `]
})
export class WavyBackgroundComponent {}