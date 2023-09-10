import { Component, OnInit } from '@angular/core';
import { IAuth } from 'src/app/interfaces/iauth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  async createHandler(datas: IAuth) {
    const user: IAuth = datas;
    await this.authService.register(user).subscribe(
      () => {
        this.route.navigate(['/']);
      },
      (erro) => {
        console.log(erro);
      }
    );
  }
}
