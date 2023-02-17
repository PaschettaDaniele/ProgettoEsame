import { Component, Output } from '@angular/core';
import { ModalMenager } from '../utils/modalsMenager';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output()
  options : boolean = false;
  constructor(private modalsMenager : ModalMenager) { }

  viewOptions(){
    this.options = !this.options;
  }

  onClickLogin(page: string){
    this.modalsMenager.openLogin();
  }
}

