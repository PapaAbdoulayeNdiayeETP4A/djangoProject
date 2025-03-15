import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/profil', component: ProfilComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegistrationComponent },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];
