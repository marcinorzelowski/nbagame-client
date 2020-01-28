import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthRegisterData, AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(registerForm: NgForm) {
    const name = registerForm.value.name;
    const username = registerForm.value.username;
    const email = registerForm.value.email;
    const password = registerForm.value.password;

    let regObs: Observable<AuthRegisterData>;

    regObs = this.authService.signup(name, username, email, password);
    regObs.subscribe(
      resData => {
        console.log(resData);
      }
    );
  }



}
