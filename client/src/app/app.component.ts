import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from './globalComponents/toolbar/toolbar.component';
import { LoginComponent } from './modals/login/login.component';
import { LoginService } from './utils/loginService.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild(ToolbarComponent, { static: false }) login: any;

  title = 'client';
  constructor(private http: HttpClient) {
    LoginService.checkLogin(http);
  }
}

