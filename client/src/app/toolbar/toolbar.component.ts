import { Component, Output } from '@angular/core';
import { ModalMenager } from '../utils/modalsMenager';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  options: boolean = false;
  constructor() { }

  viewOptions() {
    this.options = !this.options;
  }

  onClickLogin(page: string) {
    ModalMenager.openLogin(page);
    this.viewOptions();
  }
}

