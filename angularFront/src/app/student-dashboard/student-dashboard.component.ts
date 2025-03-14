  import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface User {
  id: number;
  username: string;
  email: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  project: number;
  assigned_to: number;
  created_at?: string;
  updated_at?: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  owner: number;
  tasks: Task[];
}

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
  providers: [ApiService, FormBuilder]
})
export class StudentDashboardComponent implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  projects: Project[] = [];
  selectedProject: Project | null = null;
  username: string = '';
  userId: number = 0;
  
  // Modals
  showNewProjectModal: boolean = false;
  showNewTaskModal: boolean = false;
  showEditTaskModal: boolean = false;
  
  // Forms
  projectForm: FormGroup;
  taskForm: FormGroup;
  
  // Editing
  editingTask: Task | null = null;
  
  // Statuses
  taskStatuses = [
    { value: 'to_do', label: 'À faire' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'completed', label: 'Terminé' }
  ];

  constructor() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required]
    });
    
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      due_date: ['', Validators.required],
      status: ['to_do', Validators.required],
      assigned_to: [null]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.username = localStorage.getItem('user_username') || 'Étudiant';
    const userId = localStorage.getItem('user_id');
    this.userId = userId ? parseInt(userId) : 0;
    
    const projectsData = localStorage.getItem('user_projects');
    if (projectsData) {
      this.projects = JSON.parse(projectsData);

      if (this.projects.length > 0) {
        this.selectedProject = this.projects[0];
      }
    }
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
  }

  openNewProjectModal(): void {
    this.projectForm.reset();
    this.showNewProjectModal = true;
  }
  
  closeNewProjectModal(): void {
    this.showNewProjectModal = false;
  }
  
  openNewTaskModal(): void {
    this.taskForm.reset({ status: 'todo', assigned_to: this.userId });
    this.showNewTaskModal = true;
  }
  
  closeNewTaskModal(): void {
    this.showNewTaskModal = false;
  }
  
  openEditTaskModal(task: Task): void {
    if (task.assigned_to === this.userId || this.isProjectOwner(this.selectedProject)) {
      this.editingTask = task;
      this.taskForm.setValue({
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        status: task.status,
        assigned_to: task.assigned_to
      });
      this.showEditTaskModal = true;
    } else {
      alert("Vous n'avez pas la permission de modifier cette tâche.");
    }
  }
  
  closeEditTaskModal(): void {
    this.showEditTaskModal = false;
    this.editingTask = null;
  }
  
  isProjectOwner(project: Project | null): boolean {
    return project ? project.owner === this.userId : false;
  }
  
  canEditTask(task: Task): boolean {
    return task.assigned_to === this.userId || this.isProjectOwner(this.selectedProject);
  }
  
  createProject(): void {
    if (this.projectForm.valid) {
      const newProject: Project = {
        id: this.getNextProjectId(),
        name: this.projectForm.value.name,
        description: this.projectForm.value.description,
        owner: this.userId,
        tasks: []
      };
      
      this.apiService.createProject(newProject).subscribe(
      (savedProject) => {
        this.projects.push(savedProject);
        this.selectedProject = savedProject;
        this.closeNewProjectModal();
      },
      (error) => {
        console.error('Erreur lors de la création du projet :', error);
      }
    );
  }
    }
  
  createTask(): void {
    if (this.taskForm.valid && this.selectedProject) {
      const newTask: Task = {
        id: this.getNextTaskId(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status,
        due_date: this.taskForm.value.due_date,
        project: this.selectedProject.id,
        assigned_to: this.taskForm.value.assigned_to || this.userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      if (!this.selectedProject.tasks) {
        this.selectedProject.tasks = [];
      }
      
      this.selectedProject.tasks.push(newTask);
      this.saveProjects();
      this.closeNewTaskModal();
    }
  }
  
  updateTask(): void {
    if (this.taskForm.valid && this.editingTask && this.selectedProject) {
      const updatedTask: Task = {
        ...this.editingTask,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status,
        due_date: this.taskForm.value.due_date,
        assigned_to: this.taskForm.value.assigned_to,
        updated_at: new Date().toISOString()
      };
      
      const taskIndex = this.selectedProject.tasks.findIndex(t => t.id === this.editingTask?.id);
      if (taskIndex !== -1) {
        this.selectedProject.tasks[taskIndex] = updatedTask;
        this.saveProjects();
      }
      
      this.closeEditTaskModal();
    }
  }
  
  deleteTask(task: Task): void {
    if (!this.isProjectOwner(this.selectedProject)) {
      alert("Seul le propriétaire du projet peut supprimer des tâches.");
      return;
    }
    
    if (this.selectedProject && confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      const taskIndex = this.selectedProject.tasks.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        this.selectedProject.tasks.splice(taskIndex, 1);
        this.saveProjects();
      }
    }
  }
  
  updateTaskStatus(task: Task, newStatus: string): void {
    if (this.canEditTask(task)) {
      task.status = newStatus;
      task.updated_at = new Date().toISOString();
      this.saveProjects();
    } else {
      alert("Vous n'avez pas la permission de modifier cette tâche.");
    }
  }
  
  private getNextProjectId(): number {
    return this.projects.length > 0
      ? Math.max(...this.projects.map(p => p.id)) + 1
      : 1;
  }
  
  private getNextTaskId(): number {
    let maxId = 0;
    this.projects.forEach(project => {
      if (project.tasks && project.tasks.length > 0) {
        const projectMaxId = Math.max(...project.tasks.map(t => t.id));
        maxId = Math.max(maxId, projectMaxId);
      }
    });
    return maxId + 1;
  }
  
  private saveProjects(): void {
    localStorage.setItem('user_projects', JSON.stringify(this.projects));
    
    const allTasks = this.projects.reduce((tasks, project) => {
      if (project.tasks && project.tasks.length > 0) {
        return [...tasks, ...project.tasks];
      }
      return tasks;
    }, [] as Task[]);
    
    localStorage.setItem('user_tasks', JSON.stringify(allTasks));
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in_progress':
        return 'status-progress';
      default:
        return 'status-pending';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in_progress':
        return 'En cours';
      default:
        return 'À faire';
    }
  }

  getTasksCount(project: Project): number {
    return project.tasks ? project.tasks.length : 0;
  }

  getCompletedTasksCount(project: Project): number {
    if (!project.tasks) return 0;
    return project.tasks.filter(task => task.status === 'completed').length;
  }
}