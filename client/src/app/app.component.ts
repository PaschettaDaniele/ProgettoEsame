import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './modals/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild(ToolbarComponent, {static : false}) login: any;




  title = 'client';
  token: string | null = null;
  constructor() {
    this.token = localStorage.getItem('token')
  }
  checkToken() : boolean {
    this.token = localStorage.getItem('token')
    if(this.token) return true
    return false
  }
}

