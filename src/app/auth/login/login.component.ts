import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthLoginData, AuthRegisterData, AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    const name = loginForm.value.name;
    const username = loginForm.value.username;
    const email = loginForm.value.email;
    const password = loginForm.value.password;

    let logObs: Observable<AuthLoginData>;

    logObs = this.authService.signin(username, password);
    logObs.subscribe(
      resData => {

      }
    );
  }
}
