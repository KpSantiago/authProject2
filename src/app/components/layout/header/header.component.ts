import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName!: string;

  constructor(
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService
      .getUsers(this.cookieService.get('ashlesd'))
      .subscribe((data) => {
        const users = data;
        this.userName = users
          .filter(
            (user: IAuth) => user.id == this.cookieService.get('fdsgescr')
          )
          .map((user: IAuth) => user.name);
      });
  }

  logout(): void {
    this.cookieService.delete('ashlesd');
    this.cookieService.delete('daskde');
    this.cookieService.delete('fdsgescr');
    setTimeout(() => {
      location.reload();
    }, 100);
  }
}
