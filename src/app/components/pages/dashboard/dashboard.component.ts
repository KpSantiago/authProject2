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
import { faSearch, faCloud, faFilter } from '@fortawesome/free-solid-svg-icons';

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

  // icons
  moon = faMoon;
  sun = faSun;
  searchI = faSearch;
  themeI = faCloud;
  filterI = faFilter;

  // forms
  editForm!: FormGroup;
  filterForm!: FormGroup;

  // adicionals vars
  emailUser: any = '';
  usersId!: any;

  // users arrays
  allUsersArr!: IAuth[];
  usersArr!: IAuth[];

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

    // filter form
    this.filterForm = this.formBuilder.group({
      filter: [''],
    });
  }

  get roles() {
    return this.editForm.get('role');
  }

  get email() {
    return this.editForm.get('email');
  }

  get filter() {
    return this.filterForm.get('filter');
  }

  ngAfterViewInit(): void {
    const theme = this.acRoute.snapshot.queryParamMap.get('theme');
    const themeL = localStorage.getItem('theme');

    if (theme == 'night') {
      this.dashboard.nativeElement.classList.toggle('night');
      localStorage.setItem('theme', 'night');
    } else if (themeL == 'night') {
      this.dashboard.nativeElement.classList.toggle('night');
    } else {
      return;
    }
  }

  requestUsers() {
    this.authService
      .getUsers(this.cookieService.get('ashlesd'))
      .subscribe((data) => {
        if (data) {
          this.usersArr = data;
          this.allUsersArr = data;

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

  filters(users: any) {
    if (this.filterForm.value.filter == 'id') {
      this.usersArr = users.sort((o1: IAuth, o2: IAuth) => {
        if (o1.id! > o2.id!) {
          return 1;
        }
        if (o1.id! < o2.id!) {
          return -1;
        }
        return 0;
      });
    } else if (this.filterForm.value.filter == 'alphabeticalOrder') {
      this.usersArr = users.sort((o1: IAuth, o2: IAuth) => {
        let p1 = o1.name.split('')[0].toLowerCase();
        let p2 = o2.name.split('')[0].toLowerCase();
        if (p1 > p2) {
          return 1;
        }
        if (p1 < p2) {
          return -1;
        }
        return 0;
      });
    } else if (this.filterForm.value.filter == 'roleId') {
      this.usersArr = users.sort((o1: IAuth, o2: IAuth) => {
        if (o1.roleId! < o2.roleId!) {
          return 1;
        }
        if (o1.roleId! > o2.roleId!) {
          return -1;
        }
        return 0;
      });
    } else {
      this.usersArr = this.allUsersArr;
    }
  }

  async searchUsers(event: any) {
    const value = event.target.value;
    console.log(value);
    console.log(this.allUsersArr);
    this.usersArr = this.allUsersArr
      .filter((users) => {
        return users.name.toLowerCase().includes(value.toLowerCase());
      })
      .map((data) => data);
  }

  theme() {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'night');
    }
  }

  lightTheme() {
    if (localStorage.getItem('theme')) {
      localStorage.removeItem('theme');
    }
    return;
  }
}
