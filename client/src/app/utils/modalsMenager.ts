import { Injectable } from '@angular/core';
import { LoginComponent } from '../modals/login/login.component';

@Injectable({ providedIn: 'root' })
export class ModalMenager {
  constructor(private login: LoginComponent) { }

  openLogin(){
    this.login.open();
  }

  closeLogin(){
    this.login.close();
  }
}
