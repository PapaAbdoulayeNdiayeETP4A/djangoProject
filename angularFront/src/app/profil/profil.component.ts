import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [UserService]
})

export class ProfilComponent implements OnInit {
  userProfile: any;
  showEditProfileModal: boolean = false;
  editProfileForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.editProfileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
    });
  }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userService.getUserInfo().subscribe(
      (profile) => {
        this.userProfile = profile;
        this.editProfileForm.patchValue(profile);
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil:', error);
      }
    );
  }

  openEditProfileModal() {
    this.showEditProfileModal = true;
  }

  closeEditProfileModal() {
    this.showEditProfileModal = false;
  }

  saveProfileChanges() {
    if (this.editProfileForm.valid) {
      this.userService.updateUserProfile(this.editProfileForm.value, this.userProfile.id).subscribe(() => {
        this.getUserProfile();
        this.closeEditProfileModal();
      });
    }
  }

  logout(): void {
    this.userService.logoutUser().subscribe(
      () => {
        window.location.href = '/';
      },
      (error) => {
        console.error('Erreur lors de la déconnexion :', error);
      }
    )
  }
}