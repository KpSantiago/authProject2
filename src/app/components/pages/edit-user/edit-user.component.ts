import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'src/app/validators/CustomValidators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, AfterViewInit {
  @ViewChild('editContainer') editC!: ElementRef<HTMLElement>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private acRoute: ActivatedRoute,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  theme = sessionStorage.getItem('theme');
  editForm!: FormGroup;
  user!: IAuth[];

  ngOnInit(): void {
    const id = this.acRoute.snapshot.paramMap.get('id');
    // edit form validation
    this.editForm = this.formBuilder.group({
      roles: ['', [CustomValidators.requiredValidator]],
      email: ['', [Validators.required]],
    });

    this.authService
      .getUsers(this.cookieService.get('ashlesd'))
      .subscribe((data) => {
        this.user = data
          .filter((user: IAuth) => user.id! == id)
          .map((user: IAuth) => user);

        this.editForm?.patchValue({ roles: this.user[0].roleId! });
        this.editForm?.patchValue({ email: this.user[0].email! });
      });
  }

  ngAfterViewInit(): void {
    if (this.theme == 'night') {
      this.editC.nativeElement.classList.toggle('night');
    }
  }

  get roles() {
    return this.editForm.get('role');
  }

  get email() {
    return this.editForm.get('email');
  }

  async edit() {
    if (this.editForm.invalid) {
      return;
    }

    const user = {
      name: this.user[0]!.name,
      email: this.user[0]!.email,
      roleId: Number(this.editForm.get('roles')!.value),
    };

    await this.authService
      .updateUser(user, this.user[0].id!, this.cookieService.get('ashlesd'))
      .subscribe();

    this.router.navigate(['dashboard']);
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }
}
