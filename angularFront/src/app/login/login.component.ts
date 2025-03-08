import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [UserService]
})
export class LoginComponent {

  login: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.login = {
      username: '',
      password: ''
    }
  }

  loginUser() {
    this.userService.loginUser(this.login).subscribe(
      response => {
        alert('User ' + this.login.username + ' logged successfully');
      },
      error => {
        console.log(error);
      }
    )
  }

}
