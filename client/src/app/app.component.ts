import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './modals/login/login.component';
import { LoginService } from './utils/loginService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild(ToolbarComponent, {static : false}) login: any;

  title = 'client';
  constructor() {
    LoginService.checkLogin();
  }
}

