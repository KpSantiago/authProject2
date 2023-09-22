import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'src/app/validators/CustomValidators';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent {
  newPassForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public route: Router,
    private authService: AuthService,
    public acRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newPassForm = this.formBuilder.group({
      id: [''],
      password: ['', [Validators.required, CustomValidators.minLengthPass]],
      confirmPass: ['', [Validators.required]],
    });
  }

  get password() {
    return this.newPassForm.get('password');
  }

  get confirmPass() {
    return this.newPassForm.get('confirmPass');
  }

  async submit() {
    let id: number = Number(this.acRoute.snapshot.paramMap.get('id'));

    if (this.newPassForm.invalid) {
      return;
    }
    const senha: { password: string } = {
      password: this.newPassForm.get('password')?.value,
    };

    await this.authService.updatePass(senha, id).subscribe((msg) => {
      console.log(msg);
    });

    this.route.navigate(['/']);
  }
}
