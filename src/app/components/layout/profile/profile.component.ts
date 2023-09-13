import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private acRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  user!: IAuth[];

  ngOnInit(): void {
    const userId = Number(this.acRoute.snapshot.paramMap.get('id'));

    this.authService
      .getUsers(this.cookieService.get('ashlesd'))
      .subscribe((data) => {
        this.user = data
          .filter((users: any) => users.id == userId)
          .map((users: any) => users);
      });
  }

  redirect() {
    this.route.navigate(['dashboard']);
  }
}
