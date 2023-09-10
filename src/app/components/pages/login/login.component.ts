import { Component, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token!: string;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async createHandler(datas: IAuth) {
    const user: IAuth = datas;

    await this.authService.login(user).subscribe((data) => {
      if (data.acessToken && data.roleId && data.id) {
        if (!this.cookieService.get('token')) {
          this.cookieService.set('token', data.acessToken, 1, '/');
          this.cookieService.set('roleId', data.roleId, 1, '/');
          this.cookieService.set('id', data.id, 1, '/');
        }
        if (data.acessToken != this.cookieService.get('token')) {
          this.cookieService.set('token', data.acessToken, 1, '/');
          this.cookieService.set('roleId', data.roleId, 1, '/');
          this.cookieService.set('id', data.id, 1, '/');
        }
        this.router.navigate(['dashboard']);
      }
    });
  }
}
