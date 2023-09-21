import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  @Input() search!: string;

  @ViewChild('table') table!: ElementRef<HTMLTableElement>;
  @ViewChild('usersContainer') usersC!: ElementRef<HTMLElement>;
  @ViewChild('emailInp') emailInp!: ElementRef<any>;
  editForm!: FormGroup;

  constructor(
    private route: Router,
    private acRoute: ActivatedRoute,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  emailUser: any = '';
  usersId!: any;

  allUsersArr!: IAuth[];
  usersArr!: IAuth[];

  userEdit!: IAuth[];
  isLoged!: boolean;
  roleId = this.cookieService.get('daskde');

  ngOnInit(): void {
    // request of users
    this.requestUsers();
  }

  ngAfterViewInit(): void {
    const theme = this.acRoute.snapshot.queryParamMap.get('theme');
    const themeSession = sessionStorage.getItem('theme');

    if (theme == 'night') {
      this.usersC.nativeElement.classList.toggle('night');
    } else if (themeSession == 'night') {
      this.usersC.nativeElement.classList.toggle('night');
    } else {
      return;
    }
  }

  requestUsers(): void {
    this.authService
      .getUsers(this.cookieService.get('ashlesd'))
      .subscribe((data) => {
        if (data) {
          this.usersArr = data;
          this.allUsersArr = data;
          // não usar ainda:
          // .sort((o1: IAuth, o2: IAuth) => {
          //   if (o1.id! > o2.id!) {
          //     return 1;
          //   }
          //   if (o1.id! < o2.id!) {
          //     return -1;
          //   }
          //   return 0;
          // });

          // online verification
          this.usersId = this.usersArr
            .filter((user) => user.id == this.cookieService.get('fdsgescr'))
            .map((user) => user.id);

          if (
            navigator.onLine &&
            this.cookieService.get('fdsgescr') == this.usersId[0]
          ) {
            this.isLoged = true;
          } else {
            this.isLoged = false;
          }
        } else {
          this.cookieService.delete('ashlesd');
          this.cookieService.delete('daskde');
          this.cookieService.delete('fdsgescr');
          this.route.navigate(['/']);
        }
      });
  }

  // actions
  cancel(): void {
    location.reload();
  }

  editAction(id: string) {
    const theme = this.acRoute.snapshot.queryParamMap.get('theme');

    if (theme == 'night') {
      sessionStorage.setItem('theme', theme);
    }
    this.route.navigate([`edit/${id}`]);
  }
}
