import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface SignupResponse {
  email: string;
}

interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'http://localhost:3000';
  signedin$ = new BehaviorSubject(null);
  email = '';

  constructor(private http: HttpClient) {}

  signup(credentials: Credentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/users/signup`, credentials)
      .pipe(
        tap(({ email }) => {
          this.signedin$.next(true);
          this.email = email;
        })
      );
  }

  signin(credentials: Credentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/users/login`, credentials)
      .pipe(
        tap(({ email }) => {
          this.signedin$.next(true);
          this.email = email;
        })
      );
  }

}
