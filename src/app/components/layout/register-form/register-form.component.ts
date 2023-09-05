import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAuth } from 'src/app/interfaces/iauth';
import { CustomValidators } from 'src/app/validators/CustomValidators';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  @Output() onSubmit: EventEmitter<IAuth> = new EventEmitter();

  authForm!: FormGroup;
  formValues: IAuth = {
    name: '',
    email: '',
    password: '',
    cpf: '',
  };

  constructor(private forBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.authForm = this.forBuilder.group({
      id: [''],
      name: ['', [Validators.required, CustomValidators.minLengthName]],
      email: [
        '',
        [
          Validators.required,
          CustomValidators.minLengthEmail,
          Validators.email,
        ],
      ],
      password: ['', [Validators.required, CustomValidators.minLengthPass]],
      cpf: [
        '',
        [
          Validators.required,
          CustomValidators.minLengthcpf,
          CustomValidators.maxLengthcpf,
        ],
      ],
    });
  }

  get name() {
    return this.authForm.get('name');
  }
  get email() {
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password');
  }
  get cpf() {
    return this.authForm.get('cpf');
  }

  submit() {
    if (this.authForm.invalid) {
      return;
    } else {
      this.onSubmit.emit(this.authForm.value);
    }
  }
}
