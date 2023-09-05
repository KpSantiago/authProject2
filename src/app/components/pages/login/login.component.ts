import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: Router,
    private acRoute: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  async createHandler(data: IAuth) {
    const user: IAuth = data;

    function setCookie(token: string): void {
      const date = new Date();
      date.setTime(date.getTime() * (3 * 24 * 60 * 60 * 1000));
      let expires = `${date}`;

      document.cookie = `token=${token};Expires=${expires};path="/dashboard"`;
    }

    await this.authService.login(user).subscribe((data) => {
      if (data.acessToken) {
        setCookie(data.acessToken);
        console.log(data.roleId);
        this.route.navigate([`dashboard/${data.acessToken}`]);
      } else {
        this.route.navigate([`/`]);
      }
    });
  }
}
