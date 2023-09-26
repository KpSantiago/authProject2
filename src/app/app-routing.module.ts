import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { EmailVerificationComponent } from './components/pages/email-verification/email-verification.component';
import { NewPasswordComponent } from './components/pages/new-password/new-password.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { EditUserComponent } from './components/pages/edit-user/edit-user.component';
import { BriefingComponent } from './components/pages/briefing/briefing.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verification', component: EmailVerificationComponent },
  { path: 'new/:id', component: NewPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'edit/:id', component: EditUserComponent },
  { path: 'briefing', component: BriefingComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingComponent {}
