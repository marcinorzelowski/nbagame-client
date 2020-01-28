import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, pipe, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Injectable} from '@angular/core';


export interface AuthRegisterData {
  success: string;
  message: string;
}

export interface AuthLoginData {
  accessToken: string;
  tokenType: string;

}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(name: string, username: string, email: string, password: string) {
    return this.http.post<AuthRegisterData>(
      'http://localhost:8080/api/auth/signup',
      {
        name: name,
        username: username,
        email: email,
        password: password
      }
    )
  .pipe(
      catchError(this.handleError),
    tap(resData => {
      console.log(
        resData.success + " " + resData.message
      );
    })
    );
  }

  signin(username: string, password: string) {
    return this.http.post<AuthLoginData>(
      'http://localhost:8080/api/auth/signin',
      {
        username: username,
        password: password
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          username,
          resData.accessToken);
      })
    );
  }


  private handleAuthentication(
    username: string,
    token: string,
  ) {
    const user = new User(username, token);
    this.user.next(user);

  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
