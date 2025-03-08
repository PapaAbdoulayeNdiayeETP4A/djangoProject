import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HttpClientModule, ProjectComponent, TaskComponent, RegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ApiService]
})
export class AppComponent {
  title = 'angularFront';
}
