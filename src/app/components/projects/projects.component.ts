// projects.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule], // Add this line
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [ // Sample data
    { title: 'Project 1', description: 'Description 1' },
    { title: 'Project 2', description: 'Description 2' }
  ];
}