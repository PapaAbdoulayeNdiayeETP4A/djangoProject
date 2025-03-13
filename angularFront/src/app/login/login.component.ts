import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [UserService]
})
export class LoginComponent {

  login: any = { username: '', password: '' };

  constructor(private userService: UserService, private router: Router) { }

  loginUser() {
    this.userService.loginUser(this.login).subscribe({
      next: () => {
        const isStudent = localStorage.getItem('is_student') === 'true';
        const isTeacher = localStorage.getItem('is_teacher') === 'true';
  
        if (isStudent) {
          this.router.navigate(['/dashboard/etudiant']);
        } else if (isTeacher) {
          this.router.navigate(['/dashboard/professor']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: err => console.error("Erreur de connexion", err),
    });
  }

}
