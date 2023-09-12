import { Component, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs';
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

    this.authService.login(user).subscribe((data) => {
      if (data.acessToken && data.roleId && data.id) {
        if (!this.cookieService.get('ashlesd')) {
          this.cookieService.set('ashlesd', data.acessToken, 1, '/');
          this.cookieService.set('daskde', data.roleId, 1, '/');
          this.cookieService.set('fdsgescr', data.id, 1, '/');
        }
        if (data.acessToken != this.cookieService.get('token')) {
          this.cookieService.set('ashlesd', data.acessToken, 1, '/');
          this.cookieService.set('daskde', data.roleId, 1, '/');
          this.cookieService.set('fdsgescr', data.id, 1, '/');
        }
        this.router.navigate(['dashboard']);
      }
    });
  }
}
