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

  constructor(private FormBuider: FormBuilder) {}

  ngOnInit(): void {
    this.authForm = this.FormBuider.group({
      id: [''],
      name: ['', [Validators.required, CustomValidators.minLengthName]],
      password: ['', [Validators.required, CustomValidators.minLengthPass]],
    });
  }

  get name() {
    return this.authForm.get('name');
  }

  get password() {
    return this.authForm.get('password');
  }

  submit() {
    if (!this.authForm.valid) {
      return;
    }

    this.onSubmit.emit(this.authForm.value);
  }
}
