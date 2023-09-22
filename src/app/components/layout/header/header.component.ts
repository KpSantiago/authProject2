import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
    '../../pages/dashboard/dashboard.component.css',
  ],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('header') header!: ElementRef<HTMLElement>;
  userName!: string;

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private route: Router,
    private acRoute: ActivatedRoute
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

  ngAfterViewInit(): void {
    const theme = this.acRoute.snapshot.queryParamMap.get('theme');
    const themeL = localStorage.getItem('theme');
    if (theme == 'night') {
      this.header.nativeElement.classList.toggle('night');
    } else if (themeL == 'night') {
      this.header.nativeElement.classList.toggle('night');
    } else {
      return;
    }
  }

  redirect(): void {
    this.route.navigate([`profile/${this.cookieService.get('fdsgescr')}`]);
  }

  logout(): void {
    this.cookieService.delete('ashlesd');
    this.cookieService.delete('daskde');
    this.cookieService.delete('fdsgescr');
    this.route.navigate(['/']);
  }
}
