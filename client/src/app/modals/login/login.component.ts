import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/utils/loginService.service';
import { ModalMenager } from 'src/app/utils/modalsMenager';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isVisible: boolean = false;
  isRegistration: boolean = false;

  constructor(private http : HttpClient) {
    ModalMenager.login = this;
  }

  manage(type: string) {
    if (this.isVisible) this.close();
    else this.open(type);
  }

  open(type: string) {
    this.isVisible = true;
    this.isRegistration = false;
    if (type == "registration") {
      this.isRegistration = true;
    }
  }

  close() {
    this.isVisible = false;
  }

  login() {
    let usernameOrEmail;
    let password;
    LoginService.login(this.http, "usernameOrEmail", "password");
  }

  register() {
    let username;
    let email;
    let password;
    let password2;
    LoginService.register(this.http, "username.value", "email.value", "password.value", "password2.value");
  }
}
