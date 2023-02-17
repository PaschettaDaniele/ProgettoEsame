import { Component, OnInit } from '@angular/core';
import { ModalMenager } from 'src/app/utils/modalsMenager';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isVisible: boolean = false;
  isRegistration: boolean = false;

  constructor() {
    ModalMenager.login = this;
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
  }
}
