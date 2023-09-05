import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'src/app/validators/CustomValidators';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent implements OnInit {
  verificationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public route: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.verificationForm = this.formBuilder.group({
      id: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          CustomValidators.minLengthEmail,
        ],
      ],
    });
  }

  get email() {
    return this.verificationForm.get('email');
  }

  async submit() {
    if (this.verificationForm.invalid) {
      return;
    }
    const email: { email: string } = {
      email: this.verificationForm.get('email')?.value,
    };

    await this.authService.sendEmail(email).subscribe();

    this.route.navigate(['/']);
  }
}
