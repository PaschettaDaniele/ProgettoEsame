import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/utils/loading.service';
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
  isLoading: boolean = false;
  loadingSubscription: any = false;
  loggingSubscription: any = false;

  // for login
  usernameOrEmail: string = "";
  password: string = "";

  // for registration
  username: string = "";
  name: string = "";
  email: string = "";
  password2: string = "";

  constructor(private http: HttpClient) {
    ModalMenager.login = this;
    this.loadingSubscription = LoadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.loggingSubscription = LoginService.logged$.subscribe((isLogged: Boolean) => {
      this.close();
    });
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
    console.log("isLogged: ", LoginService.isLogged);
  }

  login() {
    LoginService.login(this.http, this.usernameOrEmail, this.password);
    LoadingService.show();
  }

  register() {
    if (this.password == this.password2) {
      LoginService.register(this.http, this.username, this.email, this.password, this.name);
      LoadingService.show();
    } else {
      console.log("passwords don't match");
      LoadingService.hide();
    }
  }
}
