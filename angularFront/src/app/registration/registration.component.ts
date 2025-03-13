import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {
  
  register: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.register = {
      username: '',
      password: '',
      email: ''
    }
  }

  registerUser() {
    this.userService.registerUser(this.register).subscribe(
      response => {
        alert('User ' + this.register.username + ' registered successfully');
      },
      error => {
        console.log(error);
      }
    )
  }

  logOut() {
    this.userService.logoutUser();
  }

}
