import { Injectable } from '@angular/core';
import { IAuth } from 'src/app/interfaces/iauth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApiUrl = 'https://auth-api-gbl5.onrender.com';

  constructor(private http: HttpClient) {}

  register(data: IAuth): Observable<IAuth> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<IAuth>(`${this.baseApiUrl}/cadastro`, data, {
      headers: httpHeaders,
    });
  }

  sendEmail(email: { email: string }): Observable<{ email: string }> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<{ email: string }>(
      `${this.baseApiUrl}/send-email`,
      email,
      {
        headers: httpHeaders,
      }
    );
  }

  updatePass(
    password: { password: string },
    id: number
  ): Observable<{ password: string }> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<{ password: string }>(
      `${this.baseApiUrl}/forgot-pass/${id}`,
      password,
      {
        headers: httpHeaders,
      }
    );
  }

  login(data: IAuth): Observable<IAuth> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<IAuth>(`${this.baseApiUrl}/Login`, data, {
      headers: httpHeaders,
    });
  }

  getUsers(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/Usuarios`, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
  }

  updateUser(user: any, id: string, token: string): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/attUsers/${id}`, user, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
  }
}
