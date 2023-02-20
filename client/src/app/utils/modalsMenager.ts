import { Injectable } from '@angular/core';
import { LoginComponent } from '../modals/login/login.component';

@Injectable({ providedIn: 'root' })
export class ModalMenager {
  static login: LoginComponent;
  constructor() { }

  //#region Login modal
  static openLogin(type: string) {
    this.login.open(type);
  }

  static closeLogin() {
    this.login.close();
  }
  //#endregion
}
