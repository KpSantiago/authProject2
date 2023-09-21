import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// routes file
import { AppRoutingComponent } from './app-routing.module';

// form dependecies
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// http dependence
import { HttpClientModule } from '@angular/common/http';

// Cookies dependece
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginFormComponent } from './components/layout/login-form/login-form.component';
import { RegisterFormComponent } from './components/layout/register-form/register-form.component';
import { ApresentationComponent } from './components/layout/apresentation/apresentation.component';
import { EmailVerificationComponent } from './components/pages/email-verification/email-verification.component';
import { NewPasswordComponent } from './components/pages/new-password/new-password.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditUserComponent } from './components/pages/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ApresentationComponent,
    EmailVerificationComponent,
    NewPasswordComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingComponent,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
