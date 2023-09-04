import { Injectable } from '@angular/core';
import { IAuth } from 'src/app/interfaces/iauth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApiUrl = 'http://localhost:3333';

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
}
