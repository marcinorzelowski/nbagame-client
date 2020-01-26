import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, pipe, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Injectable} from '@angular/core';


export interface AuthRegisterData {
  success: string;
  message: string;
  name: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(name: string, username: string, email: string, password: string) {
    console.log(name + email + password);
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
      tap( resData => {
        this.handleAuthentication(
          resData.name,
          resData.username,
          resData.email,
          resData.password
        );
      })
    );
  }

  private handleAuthentication(
    name: string,
    username: string,
    email: string,
    token: string,
  ) {

    const user = new User(name, username, email, token);
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
