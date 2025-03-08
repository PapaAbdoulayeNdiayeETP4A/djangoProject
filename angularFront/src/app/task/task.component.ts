import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [ApiService]
})
export class TaskComponent {

  tasks = [{title: 'Task 1'}];

  constructor(private api: ApiService) {
    this.getTasks();
  }

  getTasks = () => {
    this.api.getAllTasks().subscribe(
      data => {
        this.tasks = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
