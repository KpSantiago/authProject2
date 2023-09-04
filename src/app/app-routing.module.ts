import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { EmailVerificationComponent } from './components/pages/email-verification/email-verification.component';
import { NewPasswordComponent } from './components/pages/new-password/new-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verification', component: EmailVerificationComponent },
  { path: 'new/:id', component: NewPasswordComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingComponent {}
