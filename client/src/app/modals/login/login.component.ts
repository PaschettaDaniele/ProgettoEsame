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

  // for login
  usernameOrEmail: string = "Admin";
  password: string = "admin";

  // for registration
  username: string = "";
  name: string = "";
  email: string = "";
  password2: string = "";

  constructor(private http: HttpClient) {
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
    console.log("isLogged: ", LoginService.logged);
  }

  login() {
    LoginService.login(this.http, this.usernameOrEmail, this.password);
  }

  register() {
    if (this.password == this.password2) {
      LoginService.register(this.http, this.username, this.email, this.password, this.name);
    } else {
      console.log("passwords don't match");
    }
  }
}
