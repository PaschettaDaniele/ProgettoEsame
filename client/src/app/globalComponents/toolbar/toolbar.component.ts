import { Component, Output } from '@angular/core';
import { ModalMenager } from '../../utils/modalsMenager';
import { LoginService } from '../../utils/loginService.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  options: boolean = false;
  logged: boolean = false;
  loggedObserved: any;

  constructor(private http: HttpClient, private router: Router) {
    this.loggedObserved = LoginService.logged$.subscribe((value) => {
      this.logged = value;
    });
    this.logged = LoginService.isLogged;
  }

  viewOptions() {
    this.options = !this.options;
  }

  onClickLogin(page: string) {
    ModalMenager.openLogin(page);
    this.viewOptions();
  }

  logout() {
    LoginService.isLogged = false;
    this.logged = false;
    LoginService.logout(this.http);
    this.viewOptions();
    this.router.navigate(['/']);
  }
}

