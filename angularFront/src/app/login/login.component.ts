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
    this.userService.loginUser(this.login).subscribe(
      response => {
        alert('User ' + this.login.username + ' logged successfully');
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log(error);
      }
    )
  }

}
