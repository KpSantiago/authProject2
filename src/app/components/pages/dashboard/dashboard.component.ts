import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'src/app/validators/CustomValidators';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('form') form!: ElementRef<HTMLDivElement>;
  @ViewChild('table') table!: ElementRef<HTMLTableElement>;
  @ViewChild('emailInp') emailInp!: ElementRef<HTMLInputElement>;
  @ViewChild('dashboard') dashboard!: ElementRef<HTMLInputElement>;

  constructor(
    private route: Router,
    private acRoute: ActivatedRoute,
    private cookieService: CookieService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  moon = faMoon;
  sun = faSun;

  editForm!: FormGroup;
  emailUser: any = '';
  usersId!: any;

  search?: string;

  allUsersArr!: IAuth[];
  usersArr!: IAuth[];

  userEdit!: IAuth[];
  isLoged!: boolean;
  roleId = this.cookieService.get('daskde');

  ngOnInit(): void {
    // verification
    if (!this.cookieService.get('ashlesd')) {
      this.cookieService.delete('daskde');
      this.route.navigate(['/']);
    }

    // request of users
    this.requestUsers();

    // edit form validation
    this.editForm = this.formBuilder.group({
      roles: ['', [CustomValidators.requiredValidator]],
      email: ['', [Validators.required]],
    });
  }

  get roles() {
    return this.editForm.get('role');
  }

  get email() {
    return this.editForm.get('email');
  }

  ngAfterViewInit(): void {
    const theme = this.acRoute.snapshot.queryParamMap.get('theme');
    const themeSession = sessionStorage.getItem('theme');
    if (this.cookieService.get('daskde') != '4') {
      this.form.nativeElement.style.display = 'none';
    }

    if (theme == 'night') {
      this.dashboard.nativeElement.classList.toggle('night');
    } else if (themeSession == 'night') {
      this.dashboard.nativeElement.classList.toggle('night');
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
    this.route.navigate([`edit/${id}`]);
  }

  async edit() {
    if (this.editForm.invalid) {
      return;
    }

    const user = {
      name: this.userEdit[0]!.name,
      email: this.userEdit[0]!.email,
      roleId: Number(this.editForm.get('roles')!.value),
    };

    await this.authService
      .updateUser(user, this.userEdit[0].id!, this.cookieService.get('ashlesd'))
      .subscribe();

    setTimeout(() => {
      location.reload();
    }, 100);
  }

  async searchUsers(event: any) {
    const value = event.target.value;

    this.usersArr = this.usersArr = this.allUsersArr.filter((users) => {
      return users.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  theme() {
    this.route.navigate(['/dashboard?theme=night']);
  }

  lightTheme() {
    if (sessionStorage.getItem('theme')) {
      sessionStorage.removeItem('theme');
    }
    return;
  }
}
