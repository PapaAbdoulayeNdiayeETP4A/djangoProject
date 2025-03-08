import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  providers: [ApiService]
})
export class ProjectComponent {

  projects = [{name: 'Project 1'}, {name: 'Project 2'}];

  constructor(private api: ApiService) {
    this.getProjects();
  }

  getProjects = () => {
    this.api.getAllProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
