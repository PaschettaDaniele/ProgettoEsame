import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isVisible: boolean = false;

  open(){
    this.isVisible = true;
  }

  close(){
    this.isVisible = false;
  }
}
