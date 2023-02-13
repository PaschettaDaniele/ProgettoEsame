import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
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

