import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', component: RegistrationComponent },
    { path: 'dashboard/etudiant', component: StudentDashboardComponent },
    { path: 'dashboard/professor', component: ProfessorDashboardComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegistrationComponent },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];
