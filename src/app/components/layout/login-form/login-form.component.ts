import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAuth } from 'src/app/interfaces/iauth';
import { CustomValidators } from 'src/app/validators/CustomValidators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Output() onSubmit: EventEmitter<IAuth> = new EventEmitter();

  authForm!: FormGroup;

  constructor(private formBuider: FormBuilder) {}

  ngOnInit(): void {
    this.authForm = this.formBuider.group({
      id: [''],
      email: [
        '',
        [Validators.email, Validators.required, CustomValidators.minLengthPass],
      ],
      password: ['', [Validators.required, CustomValidators.minLengthPass]],
    });
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }
  submit() {
    if (this.authForm.invalid) {
      return;
    } else {
      this.onSubmit.emit(this.authForm.value);
    }
  }
}
