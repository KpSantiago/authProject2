import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'src/app/validators/CustomValidators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('form') form!: ElementRef<HTMLDivElement>;
  @ViewChild('table') table!: ElementRef<HTMLTableElement>;
  @ViewChild('emailInp') emailInp!: ElementRef<HTMLInputElement>;

  constructor(
    private route: Router,
    private cookieService: CookieService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  editForm!: FormGroup;
  emailUser: any = '';

  usersArr!: IAuth[];
  userEdit!: IAuth[];
  roleId = this.cookieService.get('daskde');

  ngOnInit(): void {
    // verification
    if (!this.cookieService.get('ashlesd')) {
      this.cookieService.delete('daskde');
      this.route.navigate(['/']);
    }

    // request of users
    this.authService
      .getUsers(this.cookieService.get('ashlesd'))
      .subscribe((data) => {
        if (data) {
          this.usersArr = data;
        } else {
          this.cookieService.delete('ashlesd');
          this.cookieService.delete('daskde');
          this.cookieService.delete('fdsgescr');
          this.route.navigate(['/']);
        }
      });

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
    if (this.cookieService.get('daskde') != '4') {
      this.form.nativeElement.style.display = 'none';
    }
  }

  editAction(id: string) {
    this.userEdit = this.usersArr
      .filter((user: IAuth) => user.id! == id)
      .map((user) => user);
    this.emailUser = this.emailInp.nativeElement.value;
    this.editForm?.patchValue({ roles: this.userEdit[0].roleId! });
    this.setEmail();
  }

  setEmail() {
    this.editForm.patchValue({ email: this.userEdit[0].email });
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
}
