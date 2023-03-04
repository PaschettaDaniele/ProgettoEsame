import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/utils/loginService.service';
import { ModalMenager } from 'src/app/utils/modalsMenager';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private httpClient: HttpClient) {}
  dashboard(){
    LoginService.checkLogin(this.httpClient)
    if(LoginService.isLogged) {
      window.location.href = '/dashboard';
    }
    else {
      ModalMenager.openLogin('login');
    }
  }
}
